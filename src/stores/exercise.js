import {defineStore, mapActions} from "pinia";
import {useProfileStore} from "./profile";

export const useExerciseStore = defineStore("exercise",{
    state: () => ({
        exercises:[] ,
        userToken: '',
    }),
    getters:{
        getExerciseById(state) {
            return (exerciseID) => state.exercises.find((exercise)=> exercise.id === exerciseID);
        },
        getExercises(){
            return this.exercises;
        }
    },
    actions: {
        ...mapActions(useProfileStore, ["getToken"]),
        async storeRefresh(){
            return await this.getExercisesData();
        },
        setToken(){
            this.userToken=this.getToken();
        },
        async getExercisesData(){
            try {
                const response = await fetch("http://localhost:8080/api/exercises", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${this.getToken()}`,
                    },
                });
                const text = await response.text();
                const result = text ? JSON.parse(text) : "";
                if(result !== ""){
                    this.exercises=result.content;
                }
            }catch (error) {
                console.log(`Oops! ${error}`);
                return null;
            }
            let response=""
            let text="";
            let result=""
            let images=null;
            let videos=null;
            for (let i = 0; i<this.exercises.length ; i++) {
                try {
                    response = await fetch(`http://localhost:8080/api/exercises/${this.exercises[i].id}/images`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `bearer ${this.getToken()}`,
                        },
                    });
                    text = await response.text();
                    result = text ? JSON.parse(text) : "";
                    if(result !== ""){
                        images=result.content;
                    }else{
                        images=[];
                    }
                }catch (error) {
                    console.log(`Oops! ${error}`);
                    return null;
                }
                this.exercises[i].images=images;
                try {
                    response = await fetch(`http://localhost:8080/api/exercises/${this.exercises[i].id}/videos`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `bearer ${this.getToken()}`,
                        },
                    });
                    text = await response.text();
                    result = text ? JSON.parse(text) : "";
                    if(result !== ""){
                        videos=result.content;
                    }else{
                        videos=[];
                    }
                }catch (error) {
                    console.log(`Oops! ${error}`);
                    return null;
                }
                this.exercises[i].videos=videos;
            }
            return this.exercises;
        },
    },
  async created(){
        this.setToken();
      await this.getExercisesData();
    },

});