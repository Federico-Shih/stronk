import { defineStore } from "pinia";
import { useProfileStore } from "./profile";
import { mapState } from "pinia/dist/pinia";
import { authAxios /*baseAxios*/ } from "@/services/authenticatedAxios";
export const CycleTypes = {
  WARMUP: "warmup",
  EXERCISE: "exercise",
  COOLDOWN: "cooldown",
};

export const useRoutines = defineStore("useroutines", {
  state: () => ({
    page: 0,
    size: 20,
    routinesFiltered: [],
    isLastPage: false,
  }),
  actions: {
    resetPages() {
      this.page = 0;
    },
    async getAnotherPage(paramsObject) {
      try {
        paramsObject["page"] = this.page;
        paramsObject["size"] = this.size;
        const { data } = await authAxios.get(
          "/routines?" + new URLSearchParams(paramsObject)
        );
        const { isLastPage, content } = data;
        this.isLastPage = isLastPage;
        this.page += 1;
        this.routinesFiltered.push(...content);
        return content;
      } catch (err) {
        return err.response?.data;
      }
    },
  },
});

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
      const { data } = await authAxios.get(
        "/users/current/routines?" +
        new URLSearchParams({
          page: this.page,
          size: this.page === 0 ? pageSize - 1 : pageSize
        })
      );
      const { isLastPage, content } = data;
      this.isLastPage = isLastPage;
      this.page += 1;
      this.routines.push(...content);
      return this.routines;
    },
    resetPages() {
      this.page = 0;
      this.routines = [];
      this.isLastPage = false;
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
    },
  },
  actions: {
    async getNextPage(pageSize) {
      const { data } = await authAxios.get(
        "/favourites?" +
        new URLSearchParams({ page: this.page, size: pageSize })
      );
      const { isLastPage, content } = data;
      this.isLastFavorite = isLastPage;
      this.page += 1;
      this.favorites.push(...content);
      return content;
    },
    async favoriteRoutine(routineId) {
      try {
        const response = await authAxios.post(`/favourites/${routineId}`);
        if (response.status === 200) {
          return true;
        } else return null;
      } catch (err) {
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
    async getAllFavorite() {
      while (!this.isLastFavorite) {
        await this.getNextPage(4);
      }
      return this.favorites;
    },
    resetPages() {
      this.page = 0;
      this.favorites = [];
      this.isLastPage = false;
    },
  },
});

export const useSaveRoutine = defineStore("editroutine", {
  state: () => ({
    categoriesToPost: [
      "Full Body",
      "Pecho",
      "Espalda",
      "Piernas",
      "Abdominales",
      "Brazos",
    ],
    categories: [],
  }),
  getters: {
    ...mapState(useProfileStore, ["getToken"]),
  },
  actions: {
    async getCategories() {
      if (this.categories.length === 0) {
        let { data: ans } = await authAxios.get("/categories");
        if (ans.content.length === 0) {
          for (let category of this.categoriesToPost) {
            await authAxios.post("/categories", { name: category });
          }
          let { data } = await fetch("/categories");
          ans = data;
        }
        ans.content
          .sort((a, b) => a.id - b.id)
          .forEach((category) => {
            this.categories.push(category.name);
          });
      }
      return this.categories;
    },
    async getRoutine(routine_id) {
      try {
        const { data } = await authAxios.get(`/routines/${routine_id}`);
        return data;
      } catch (error) {
        return error.response.data;
      }
    },
    async deleteRoutine(routine_id) {
      try {
        await authAxios.delete(`/routines/${routine_id}`);
      } catch (error) {
        return error;
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
      const { data } = await authAxios.post("/routines", routineBody);
      return data.id;
    },
    async modifyRoutine(routineId, routineBody) {
      if (routineId) {
        return (await authAxios.put(`/routines/${routineId}`, routineBody))
          .data;
      }
    },
    async sumbitRoutineScore(routineId, score) {
      return (
        await authAxios.post(`/reviews/${routineId}`, {
          score: score,
          review: ""
        })
      ).data;
    },
  },
});

export const useCycles = defineStore("cycle", {
  actions: {
    async getCyclesFromRoutine(routine_id) {
      try {
        const { data } = await authAxios.get(`/routines/${routine_id}/cycles`);
        return data.content;
      } catch (error) {
        return error;
      }
    },
    async getCycleExercises(cycle_id) {
      try {
        const { data } = await authAxios.get(`/cycles/${cycle_id}/exercises`);
        let exercises = data;
        if (exercises === null) throw new Error("Error in getting exercises");
        let out = [];
        for (let ex of exercises.content) {
          const { data } = await authAxios.get(
            `/exercises/${ex["exercise"].id}/images`
          );
          const images = data;
          const url = images.content.length > 0 ? images.content[0].url : "";
          out.push({ ...ex, img_url: url });
        }
        return out;
      } catch (error) {
        return error;
      }
    },
    async getCycleWithExercises(routine_id, cycle_id) {
      try {
        const { data } = await authAxios.get(
          `/routines/${routine_id}/cycles/${cycle_id}`
        );
        let cycle = data;
        if (cycle === null) throw new Error("Error in getting cycle");
        const { data: exercises } = await authAxios.get(
          `/cycles/${cycle_id}/exercises`
        );
        if (exercises === null) throw new Error("Error in getting exercises");
        let out = { ...cycle, exercises: [] };
        for (let exercise of exercises.content) {
          const { data: images } = await authAxios.get(
            `/exercises/${exercise["exercise"].id}/images`
          );
          if (images === null)
            throw new Error("Error in getting exercises images");
          let url = images.content.length > 0 ? images.content[0].url : "";
          out.exercises.push({ ...exercise, img_url: url });
        }
        return out;
      } catch (error) {
        return error;
      }
    },
    async postCycle(routine_id, cycleBody, exercisesIdsAndBodies) {
      const { data: obj } = await authAxios.post(
        `/routines/${routine_id}/cycles`,
        cycleBody
      );

      let cycleId = obj !== null ? obj.id : null;
      if (cycleId === null) throw new Error("Error in posting cycle");
      for (let exercise of exercisesIdsAndBodies) {
        await authAxios.post(
          `/cycles/${cycleId}/exercises/${exercise.id}`,
          exercise.body
        );
      }
    },
    async cleanCyclesFromRoutine(routine_id) {
      try {
        const { data: cycles } = await authAxios.get(
          `/routines/${routine_id}/cycles`
        );
        if (cycles === null) throw new Error("Error in getting cycles");
        for (const cycle of cycles.content) {
          await authAxios.delete(`/routines/${routine_id}/cycles/${cycle.id}`);
        }
      } catch (error) {
        return error;
      }
    },
  },
  getters: {
    ...mapState(useProfileStore, ["getToken"]),
  },
});
