import { defineStore, mapState } from "pinia";
import { useProfileStore } from "./profile";
import { authAxios, baseAxios } from "../services/authenticatedAxios";

export const useExerciseStore = defineStore("exercise", {
  state: () => ({
    Ownexercises: [],
    Otherexercises: [],
    userToken: "",
  }),
  getters: {
    ...mapState(useProfileStore, ["getToken"]),
  },
  actions: {
    async storeRefresh() {
      return await this.getOwnExercisesData();
    },
    async getOwnExercises() {
      if (this.Ownexercises.length === 0) {
        return await this.getOwnExercisesData();
      }
      return this.Ownexercises;
    },
    async getOwnExercisesData() {
      try {
        const response = await authAxios.get('/exercises');
        const data =  response.data;
        if (response.status=== 200) {
          this.Ownexercises = data.content;
        }else{
          throw new Error("Error buscar los ejercicios");
        }
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }

      let response = "";
      let data = "";
      for (let i = 0; i < this.Ownexercises.length; i++) {
        try {
          response = await authAxios.get(`/exercises/${this.Ownexercises[i].id}/images`);
          data = response.data;
          if (response.status === 200) {
            this.Ownexercises[i].images = data.content;
          } else {
            throw new Error("Error en buscar las imagenes");
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        try {
          response = await authAxios.get(`/exercises/${this.Ownexercises[i].id}/videos`)
          data = response.data;
          if (response.status === 200) {
            this.Ownexercises[i].videos = data.content;
          } else {
            throw new Error("Error en buscar los videos");
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
      }
      return this.Ownexercises;
    },
    async getExerciseData(id) {
      let exercise=null;
      let data=null;
      let response=null;
      try {
        response = await authAxios.get(`/exercises/${id}`);
        data = response.data;
        if(response.status===200){
          exercise=data;
        }else{
          throw new Error("Error en buscar el ejercicio con id: "+id);
        }
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
      if (exercise !== null) {
        try {
          response = await authAxios.get(`/exercises/${id}/images`)
          data = response.data;
          if(response.status===200){
            exercise.images=data;
          }else{
            throw new Error("Error en buscar imagenes del ejercicio con id:"+id);
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        try {
          response = await authAxios.get(`/exercises/${id}/videos`)
          data = response.data;
          if(response.status===200){
            exercise.videos=data;
          }else{
            throw new Error("Error en buscar videos del ejercicio con id:"+id);
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        this.Otherexercises.push(exercise);
      }
      return exercise;
    },
    async getExerciseById(id) {
      if(this.Ownexercises.length === 0){
        await this.getOwnExercisesData();
      }
      const result = this.Ownexercises.find((exercise) => exercise.id === id);
      if (result) {
        return result;
      }
      return await this.getExerciseData(id);
    },
    async saveExercise(exercise, images, videos, id) {
      try {
        let prevIndex;
        console.log(id);
        console.log(this.Ownexercises);
        const prevExercise = this.Ownexercises.find((exercise, index) => {
          if (exercise.id === id) {
            prevIndex = index;
            return true;
          }
          return false;
        });
        console.log(prevIndex);
        if (!prevExercise) {
          console.log("previous exercise not found");
          return;
        }
        // Va haciendo las llamadas de cada remove Image y remove Videos y despues espera a que terminen todas las promises
        const removeImagesRequests = prevExercise.images.map(({ id }) =>
          this.removeExerciseImage(prevExercise.id, id)
        );
        const removeVideosRequests = prevExercise.videos.map(({ id }) =>
          this.removeExerciseVideos(prevExercise.id, id)
        );
        await Promise.all([...removeImagesRequests, ...removeVideosRequests]);
        let putExercise;
        const response = await authAxios.put(`/exercises/${id}`,exercise);
        if (response.status !== 200) {
          console.log("Put exercise failed");
          return;
        }
        putExercise = response.data;
        const putImageRequests = images.map((image, index) =>
          this.putExerciseImage(id, image, index + 1)
        );
        const putVideoRequests = videos.map((video, index) =>
          this.putExerciseVideo(id, video, index + 1)
        );
        const imageAndVideoRequests = await Promise.all([
          ...putImageRequests,
          ...putVideoRequests,
        ]);
        putExercise.images = imageAndVideoRequests.slice(
          0,
          putImageRequests.length
        );
        putExercise.videos = imageAndVideoRequests.slice(
          putImageRequests.length
        );

        this.Ownexercises.splice(prevIndex, 1, putExercise);
      } catch (err) {
        console.log(err);
      }
    },
    async putExercise(exercise, images, videos) {
      let newExercise;
      try {
        const response = await authAxios.post(`/exercises`,exercise)
        if(response.status===201){
          newExercise=response.data;
        }else{
          throw new Error("Error en crear el ejercicio");
        }
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
      const putImageRequests = images.map((image, index) =>
        this.putExerciseImage(newExercise.id, image, index + 1)
      );
      const putVideoRequests = videos.map((video, index) =>
        this.putExerciseVideo(newExercise.id, video, index + 1)
      );
      const imageAndVideoRequests = await Promise.all([
        ...putImageRequests,
        ...putVideoRequests,
      ]);
      newExercise.images = imageAndVideoRequests.slice(
        0,
        putImageRequests.length
      );
      newExercise.videos = imageAndVideoRequests.slice(putImageRequests.length);
      this.Ownexercises.push(newExercise);
    },
    async putExerciseImage(exerciseId, image, num) {
      try {
        const response = await authAxios.post(`/exercises/${exerciseId}/images`,{number:num,url:image});
        return response.data;
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
    },
    async putExerciseVideo(exerciseId, video, num) {
      try {
        const response = await authAxios.post(`/exercises/${exerciseId}/videos`,{ number: num, url: video });
        return response.data
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
    },
    async removeExerciseImage(exerciseId, imageId) {
      try {
        const response = await authAxios.delete(`/exercises/${exerciseId}/images/${imageId}`);
        console.log(response);
      } catch (err) {
        console.log(`Oops~ ${err}`);
      }
    },
    async removeExerciseVideos(exerciseId, videoId) {
      try {
        const response = await authAxios.delete(`/exercises/${exerciseId}/videos/${videoId}`);
        console.log(response);
      } catch (err) {
        console.log(`Oops~ ${err}`);
      }
    },
    async deleteExercise(exerciseId) {
      try {
        const response = await authAxios.delete(`/exercises/${exerciseId}`);
        console.log(response);
      } catch (err) {
        console.log(`Oops~ ${err}`);
      }
      this.Ownexercises = this.Ownexercises.filter((exercise)=> {
        return exercise.id !== exerciseId;
      });
    },
  },
});
