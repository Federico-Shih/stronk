import { defineStore, mapState } from "pinia";
import { useProfileStore } from "./profile";

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
        const response = await fetch("http://localhost:8080/api/exercises", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.getToken}`,
          },
        });
        const text = await response.text();
        const result = text ? JSON.parse(text) : "";
        if (result !== "") {
          this.Ownexercises = result.content;
        }
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
      let response = "";
      let text = "";
      let result = "";
      let images = null;
      let videos = null;
      for (let i = 0; i < this.Ownexercises.length; i++) {
        try {
          response = await fetch(
            `http://localhost:8080/api/exercises/${this.Ownexercises[i].id}/images`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
          );
          text = await response.text();
          result = text ? JSON.parse(text) : "";
          if (result !== "") {
            console.log(result.content);
            images = result.content;
          } else {
            images = [];
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        this.Ownexercises[i].images = images;
        try {
          response = await fetch(
            `http://localhost:8080/api/exercises/${this.Ownexercises[i].id}/videos`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
          );
          text = await response.text();
          result = text ? JSON.parse(text) : "";
          if (result !== "") {
            videos = result.content;
          } else {
            videos = [];
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        this.Ownexercises[i].videos = videos;
      }
      return this.Ownexercises;
    },
    async getExerciseData(id) {
      let text;
      let result;
      let response;
      let exercise = null;
      let images = null;
      let videos = null;
      try {
        response = await fetch(`http://localhost:8080/api/exercises/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.getToken}`,
          },
        });
        text = await response.text();
        result = text ? JSON.parse(text) : "";
        if (result !== "") {
          exercise = result;
        }
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
      if (exercise !== null) {
        try {
          response = await fetch(
            `http://localhost:8080/api/exercises/${id}/images`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
          );
          text = await response.text();
          result = text ? JSON.parse(text) : "";
          if (result !== "") {
            images = result.content;
          } else {
            images = [];
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        exercise.images = images;
        try {
          response = await fetch(
            `http://localhost:8080/api/exercises/${id}/videos`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
          );
          text = await response.text();
          result = text ? JSON.parse(text) : "";
          if (result !== "") {
            videos = result.content;
          } else {
            videos = [];
          }
        } catch (error) {
          console.log(`Oops! ${error}`);
          return null;
        }
        exercise.videos = videos;
        this.Otherexercises.push(exercise);
      }
      return exercise;
    },
    async getExerciseById(id) {
      const result = this.Ownexercises.find((exercise) => exercise.id === id);
      if (result) {
        return result;
      }
      return this.getExerciseData(id);
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

        const putExercise = await fetch(
          `http://localhost:8080/api/exercises/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
            body: JSON.stringify(exercise),
          }
        );
        if (putExercise.status !== 200) {
          console.log("Put exercise failed");
          return;
        }
        const putImageRequests = images.map((image, index) =>
          this.putExerciseImage(putExercise.id, image, index + 1)
        );
        const putVideoRequests = videos.map((video, index) =>
          this.putExerciseVideo(putExercise.id, video, index + 1)
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
        const response = await fetch(`http://localhost:8080/api/exercises`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.getToken}`,
          },
          body: JSON.stringify(exercise),
        });
        const text = await response.text();
        const result = text ? JSON.parse(text) : "";
        if (result !== "") {
          newExercise = result;
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
        const response = await fetch(
          `http://localhost:8080/api/exercises/${exerciseId}/images`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `bearer ${this.getToken}`,
            },
            body: JSON.stringify({ number: num, url: image }),
          }
        );
        const text = await response.text();
        return text ? JSON.parse(text) : "";
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
    },
    async putExerciseVideo(exerciseId, video, num) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/exercises/${exerciseId}/videos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
            body: JSON.stringify({ number: num, url: video }),
          }
        );
        const text = await response.text();
        return text ? JSON.parse(text) : "";
      } catch (error) {
        console.log(`Oops! ${error}`);
        return null;
      }
    },
    async removeExerciseImage(exerciseId, imageId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/exercises/${exerciseId}/images/${imageId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(`Oops~ ${err}`);
      }
    },
    async removeExerciseVideos(exerciseId, videoId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/exercises/${exerciseId}/videos/${videoId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(`Oops~ ${err}`);
      }
    },
    async deleteExercise(exerciseId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/exercises/${exerciseId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(`Oops~ ${err}`);
      }
    },
  },
});
