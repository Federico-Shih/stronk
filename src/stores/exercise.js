import {defineStore, mapActions} from "pinia";
import {useProfileStore} from "./profile";

export const useExerciseStore = defineStore("exercise",{
    state: () => ({
        exercises: [],
        userToken: '',
    }),
    getters:{
        getExerciseById: (state) =>{
            return (exerciseID) => state.exercises.find((exercise)=> exercise.id === exerciseID);
        },
    },
    actions: {
        async getExercises(){
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
            } catch (error) {
                console.log("Oops!");
            }
            return this.exercises;
        }
    },
    mounted:{
        ...mapActions(useProfileStore, ["getToken"]),
        setToken(){
            this.userToken=this.getToken();
        }

    }


});