import { defineStore } from "pinia";
import { authAxios } from "../services/authenticatedAxios";

export const useExerciseStore = defineStore("exercise", {
  state: () => ({
    Ownexercises: [],
    Otherexercises: [],
    page: 0,
    pagesize: 10,
    lastPage: false,
  }),
  actions: {
    async storeRefresh() {
      return this.getOwnExercisesData();
    },
    async getOwnExercises() {
      if (this.Ownexercises.length === 0) {
        return this.getOwnExercisesData();
      }
      return this.Ownexercises;
    },
    async getOwnExercisesData() {
      while (!this.lastPage) {
        try {
          const response = await authAxios.get(
            "/exercises?" +
              new URLSearchParams({ page: this.page, size: this.pagesize })
          );
          const data = response.data;
          this.Ownexercises.push(...data.content);
          this.page++;
          this.lastPage = data.isLastPage;
        } catch (error) {
          throw new Error(error);
        }
      }
      let response = "";
      let data = "";
      for (let i = 0; i < this.Ownexercises.length; i++) {
        try {
          response = await authAxios.get(
            `/exercises/${this.Ownexercises[i].id}/images`
          );
          data = response.data;
          this.Ownexercises[i].images = data.content;
        } catch (error) {
          throw new Error(error);
        }
        try {
          response = await authAxios.get(
            `/exercises/${this.Ownexercises[i].id}/videos`
          );
          data = response.data;
          this.Ownexercises[i].videos = data.content;
        } catch (error) {
          throw new Error(error);
        }
      }
      return this.Ownexercises;
    },
    async getExerciseData(id) {
      let exercise = null;
      let data = null;
      let response = null;
      try {
        response = await authAxios.get(`/exercises/${id}`);
        data = response.data;
        exercise = data;
      } catch (error) {
        throw new Error(error);
      }
      if (exercise !== null) {
        try {
          response = await authAxios.get(`/exercises/${id}/images`);
          data = response.data;
          exercise.images = data.content;
        } catch (error) {
          throw new Error(error);
        }
        try {
          response = await authAxios.get(`/exercises/${id}/videos`);
          data = response.data;
          exercise.videos = data.content;
        } catch (error) {
          throw new Error(error);
        }
        this.Otherexercises.push(exercise);
      }
      return exercise;
    },
    async getExerciseById(id) {
      if (this.Ownexercises.length === 0) {
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
        const prevExercise = this.Ownexercises.find((exercise, index) => {
          if (exercise.id === id) {
            prevIndex = index;
            return true;
          }
          return false;
        });
        if (!prevExercise) {
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
        const response = await authAxios.put(`/exercises/${id}`, exercise);
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
        throw new Error(err);
      }
    },
    async putExercise(exercise, images, videos) {
      let newExercise;
      try {
        const response = await authAxios.post(`/exercises`, exercise);
        newExercise = response.data;
      } catch (error) {
        throw new Error(error);
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
      return newExercise.id;
    },
    async putExerciseImage(exerciseId, image, num) {
      try {
        const response = await authAxios.post(
          `/exercises/${exerciseId}/images`,
          { number: num, url: image }
        );
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async putExerciseVideo(exerciseId, video, num) {
      try {
        const response = await authAxios.post(
          `/exercises/${exerciseId}/videos`,
          { number: num, url: video }
        );
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeExerciseImage(exerciseId, imageId) {
      try {
        await authAxios.delete(`/exercises/${exerciseId}/images/${imageId}`);
      } catch (err) {
        throw new Error(err);
      }
    },
    async removeExerciseVideos(exerciseId, videoId) {
      try {
        await authAxios.delete(`/exercises/${exerciseId}/videos/${videoId}`);
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteExercise(exerciseId) {
      try {
        await authAxios.delete(`/exercises/${exerciseId}`);
      } catch (err) {
        throw new Error(err);
      }
      this.Ownexercises = this.Ownexercises.filter((exercise) => {
        return exercise.id !== exerciseId;
      });
    },
    cleanExercises() {
      this.Ownexercises = [];
      this.Otherexercises = [];
      this.page = 0;
      this.lastPage = false;
    },
  },
});
