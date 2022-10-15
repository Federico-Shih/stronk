import { defineStore } from "pinia";
import { useProfileStore } from "./profile";
import { mapState } from "pinia/dist/pinia";
import { authAxios, baseAxios } from "../services/authenticatedAxios";
export const CycleTypes = {
  WARMUP: "warmup",
  EXERCISE: "exercise",
  COOLDOWN: "cooldown",
};

export const useMyRoutines = defineStore("myroutines", {
  state: () => ({
    page: 0,
    routines: [],
    isLastPage: false,
  }),
  getters: {
    ...mapState(useProfileStore, ["getToken"]),
  },
  actions: {
    async getNextPage(pageSize) {
      try {
        const res = await fetch(
          "http://localhost:8080/api/users/current/routines?" +
            new URLSearchParams({ page: this.page, size: pageSize }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`,
            },
          }
        );
        const { isLastPage, content } = await res.json();
        this.isLastPage = isLastPage;
        this.page += 1;
        this.routines.push(...content);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const useFavoriteRoutines = defineStore("myfavorites", {
  state: () => ({
    page: 0,
    favorites: [],
    isLastFavorite: false,
  }),
  getters: {
    ...mapState(useProfileStore, ["getToken"]),
    getFavorites() {
      return this.favorites;
    }
  },
  actions: {
    async getNextPage(pageSize) {
      try {
        const res = await fetch(
            "http://localhost:8080/api/favourites?" +
            new URLSearchParams({page: this.page, size: pageSize}),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.getToken}`,
              },
            }
        );
        const {isLastPage, content} = await res.json();
        console.log(`Lastfavorite=${isLastPage}`);
        this.isLastFavorite = isLastPage;
        this.page += 1;
        this.favorites.push(...content);
        return content;
      } catch (err) {
        console.log(err);
      }
    },
    async favoriteRoutine(routineId) {
      try {
        const response = await authAxios.post(`/favourites/${routineId}`);
        if (response.status === 200) {
          return true;
        } else return null;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    async unfavoriteRoutine(routineId) {
      try {
        const response = await authAxios.delete(`/favourites/${routineId}`);
        if (response.status === 200) {
          return true;
        } else return null;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    async isFavorite(routineId) {
      if (this.favorites.some((routine) => routine.id === routineId)) {
        return true;
      }
      if (this.isLastFavorite) {
        return false;
      }
      while (!this.isLastFavorite) {
        let res = await this.getNextPage(4);
        if (res.some((routine) => routine.id === routineId)) {
          return true;
        }
      }
      return false;
    },
    async getAllFavorite(){
      while (!this.isLastFavorite) {
        await this.getNextPage(4);
      }
      return this.favorites;
    }
  },
});

export const useSaveRoutine = defineStore("editroutine", {
  state: () => ({
    categoriesToPost: ["Full Body","Pecho", "Espalda", "Piernas", "Abdominales", "Brazos"],
    categories: [],
  }),
  getters: {
    ...mapState(useProfileStore, ["getToken"])
  },
  actions: {
    async getCategories() {
      if(this.categories.length === 0) {
        try {
          let res = await fetch("http://localhost:8080/api/categories", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`,
            },
          });
          let text = await res.text();
          let ans = text ? JSON.parse(text) : null;
          if (ans === null) throw new Error("Error in getting categories");
          if(ans.content.length === 0) {
            for(let category of this.categoriesToPost) {
              await fetch("http://localhost:8080/api/categories", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.getToken}`,
                },
                body: JSON.stringify({ name: category }),
              });
            }
            res = await fetch("http://localhost:8080/api/categories", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.getToken}`,
              },
            });
            text = await res.text();
            ans = text ? JSON.parse(text) : null;
            if (ans === null) throw new Error("Error in getting categories");
          }
          ans.content.sort((a, b) => a.id - b.id).forEach((category) => {
            this.categories.push(category.name);
          });
        } catch (err) {
          console.log(err);
        }
      }
      return this.categories;
    },
    async getRoutine(routine_id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/routines/${routine_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        const text = await response.text();
        let ans = text ? JSON.parse(text) : null;
        if (ans === null) throw new Error("Error in getting routine");
        return ans;
      } catch (error) {
        console.log("Oops!" + error);
      }
    },
    async deleteRoutine(routine_id) {
      try {
        await fetch(
            `http://localhost:8080/api/routines/${routine_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
        );
      } catch (error) {
        console.log("Oops!" + error);
      }
    },
    /*
     * routineBody = {
     *   "name": "7 x 4 Challenge",
     *   "detail": "Full Body 7 x 4 Challenge",
     *   "isPublic": true,
     *   "difficulty": "rookie",
     *   "category": {
     *     "id": 1
     *   },
     *   "metadata": null
     * }
     * */
    async createRoutine(routineBody) {
      try {
        const response = await fetch(`http://localhost:8080/api/routines`, {
          method: "POST",
          body: JSON.stringify(routineBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken}`,
          },
        });
        console.log("creating routine: " + routineBody);
        const text = await response.text();
        let ans = text ? JSON.parse(text) : null;
        if (ans === null) throw new Error("Error in creating routine");
        return ans.id;
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
    async modifyRoutine(routineId, routineBody) {
      try {
        if (routineId) {
          await fetch(`http://localhost:8080/api/routines/${routineId}`, {
            method: "PUT",
            body: JSON.stringify(routineBody),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`,
            },
          });
          console.log("modifying routine: " + routineId + " : " + routineBody);
        }
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
    async sumbitRoutineScore(routineId, score) {
      try {
          await fetch(`http://localhost:8080/api/reviews/${routineId}`, {
            method: "POST",
            body: JSON.stringify({ score: score , review: "" }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`,
            },
          });
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
  },
});

export const useCycles = defineStore("cycle", {
  actions: {
    async getCyclesFromRoutine(routine_id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/routines/${routine_id}/cycles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        const text = await response.text();
        let cycles = text ? JSON.parse(text) : null;
        if (cycles === null) throw new Error("Error in getting cycles");
        return cycles.content;
      } catch (error) {
        console.log("Oops!" + error);
      }
    },
    async getCycleExercises(cycle_id) {
      try {
        const response2 = await fetch(
            `http://localhost:8080/api/cycles/${cycle_id}/exercises`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
        );
        const text2 = await response2.text();
        let exercises = text2 ? JSON.parse(text2) : null;
        if (exercises === null) throw new Error("Error in getting exercises");
        let out = [];
        for (let ex of exercises.content) {
          const response3 = await fetch(
              `http://localhost:8080/api/exercises/${ex["exercise"].id}/images`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `bearer ${this.getToken}`,
                },
              }
          );
          const text3 = await response3.text();
          let images = text3 ? JSON.parse(text3) : null;
          if (images === null)
            throw new Error("Error in getting exercises images");
          console.log(`Getting cycle exercise ${ex['exercise'].id} image: ${text3}`);
          let url = images.content.length > 0 ? images.content[0].url : "";
          out.push({ ...ex, img_url: url });
        }
        return out;
      } catch (error) {
        console.log("Oops! " + error);
      }
    },
    async getCycleWithExercises(routine_id, cycle_id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/routines/${routine_id}/cycles/${cycle_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        const text = await response.text();
        let cycle = text ? JSON.parse(text) : null;
        if (cycle === null) throw new Error("Error in getting cycle");
        const response2 = await fetch(
          `http://localhost:8080/api/cycles/${cycle_id}/exercises`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        const text2 = await response2.text();
        let exercises = text2 ? JSON.parse(text2) : null;
        if (exercises === null) throw new Error("Error in getting exercises");
        let out = { ...cycle, exercises: [] };
        for (let ex of exercises.content) {
          const response3 = await fetch(
            `http://localhost:8080/api/exercises/${ex["exercise"].id}/images`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
          );
          const text3 = await response3.text();
          let images = text3 ? JSON.parse(text3) : null;
          if (images === null)
            throw new Error("Error in getting exercises images");
          console.log(`Getting cycle exercise ${ex['exercise'].id} image: ${text3}`);
          let url = images.content.length > 0 ? images.content[0].url : "";
          out.exercises.push({ ...ex, img_url: url });
        }
        return out;
      } catch (error) {
        console.log("Oops! " + error);
      }
    },
    /*
     * cycleBody = {
     *   "name": "Fast Warmup",
     *   "detail": "Fast Warmup",
     *   "type": "warmup",
     *   "order": 1,
     *   "repetitions": 1,
     *   "metadata": null
     *   }
     * exercisesIdsAndBodies = [
     *   {
     *       "id": 1,
     *       "body": {
     *           "order": 1,
     *           "duration": 30,
     *           "repetitions": 0
     *       }
     *   }, ...
     * ]
     * */
    async postCycle(routine_id, cycleBody, exercisesIdsAndBodies) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/routines/${routine_id}/cycles`,
          {
            method: "POST",
            body: JSON.stringify(cycleBody),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`,
            },
          }
        );
        const text = await response.text();
        const obj = text ? JSON.parse(text) : null;
        let cycleId = obj !== null ? obj.id : null;
        if (cycleId === null) throw new Error("Error in posting cycle");
        console.log("Posting cycle: " + cycleBody);
        for (let exercise of exercisesIdsAndBodies) {
          await fetch(
            `http://localhost:8080/api/cycles/${cycleId}/exercises/${exercise.id}`,
            {
              method: "POST",
              body: JSON.stringify(exercise.body),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.getToken}`,
              },
            }
          );
          console.log("Posting exercise: " + JSON.stringify(exercise));
        }
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
    async cleanCyclesFromRoutine(routine_id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/routines/${routine_id}/cycles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`,
            },
          }
        );
        const text = await response.text();
        let cycles = text ? JSON.parse(text) : null;
        if (cycles === null) throw new Error("Error in getting cycles");
        for (const cycle of cycles.content) {
          await fetch(
            `http://localhost:8080/api/routines/${routine_id}/cycles/${cycle.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${this.getToken}`,
              },
            }
          );
        }
      } catch (error) {
        console.log("Oops!" + error);
      }
    },
  },
  getters: {
    ...mapState(useProfileStore, ["getToken"]),
  },
});
