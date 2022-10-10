import {defineStore, mapActions} from "pinia";
import {useProfileStore} from "./profile";

export const useExerciseStore = defineStore("exercise",{
    state: () => ({
        Ownexercises:[],
        Otherexercises:[],
        userToken: '',
    }),
    getters:{
        getOwnExercises(){
            return this.exercises;
        }
    },
    actions: {
        ...mapActions(useProfileStore, ["getToken"]),
        async storeRefresh(){
            return await this.getOwnExercisesData();
        },
        setToken(){
            this.userToken=this.getToken();
        },
        async getOwnExercisesData(){
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
                    this.Ownexercises=result.content;
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
            for (let i = 0; i<this.Ownexercises.length ; i++) {
                try {
                    response = await fetch(`http://localhost:8080/api/exercises/${this.Ownexercises[i].id}/images`, {
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
                this.Ownexercises[i].images=images;
                try {
                    response = await fetch(`http://localhost:8080/api/exercises/${this.Ownexercises[i].id}/videos`, {
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
                this.Ownexercises[i].videos=videos;
            }
            return this.Ownexercises;
        },
        async getExerciseData(id){
            let text;
            let result;
            let response;
            let exercise=null;
            let images=null;
            let videos=null;
            try {
                response = await fetch(`http://localhost:8080/api/exercises/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${this.getToken()}`,
                    },
                });
                text = await response.text();
                result = text ? JSON.parse(text) : "";
                if(result !== ""){
                    exercise=result;
                }
            }catch (error) {
                console.log(`Oops! ${error}`);
                return null;
            }
            if(exercise!==null){
                try {
                    response = await fetch(`http://localhost:8080/api/exercises/${id}/images`, {
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
                exercise.images=images;
                try {
                    response = await fetch(`http://localhost:8080/api/exercises/${id}/videos`, {
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
                exercise.videos=videos;
                this.Otherexercises.push(exercise);
            }
            return exercise;

        },
        async getExerciseById(id) {
            let result= this.Ownexercises.find((exercise)=> exercise.id === id);
            if(result.isEmpty()){
                result= this.Otherexercises.find((exercise)=> exercise.id === id);
            }
            if(result.isEmpty()){
                return  await this.getExerciseData(id);
            }
        }
    },
  async created(){
        this.setToken();
      await this.getOwnExercises();
    },

});