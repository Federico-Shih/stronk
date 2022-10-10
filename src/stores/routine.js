import { defineStore } from "pinia";
import { useProfileStore } from "./profile";
import { mapState } from "pinia/dist/pinia";

export const CycleTypes = {
  WARMUP: "warmup",
  EXERCISE: "exercise",
  COOLDOWN: "cooldown"
};

export const useMyRoutines = defineStore("myroutines", {
  state: () => ({
    page: 0,
    routines: [],
    isLastPage: false
  }),
  getters: {
    ...mapState(useProfileStore, ["getToken"])
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
              Authorization: `Bearer ${this.getToken}`
            }
          }
        );
        const { isLastPage, content } = await res.json();
        this.isLastPage = isLastPage;
        this.page += 1;
        this.routines.push(...content);
      } catch (err) {
        console.log(err);
      }
    }
  }
});

export const useFavoriteRoutines = defineStore("myfavorites", {
  state: () => ({
    page: 0,
    favorites: [],
    isLastFavorite: false
  }),
  actions: {
    async getNextPage(pageSize) {
      try {
        const res = await fetch(
          "http://localhost:8080/api/favourites?" +
          new URLSearchParams({ page: this.page, size: pageSize }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`
            }
          }
        );
        const { isLastPage, content } = await res.json();
        console.log(isLastPage);
        this.isLastFavorite = isLastPage;
        this.page += 1;
        this.favorites.push(...content);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const useSaveRoutine = defineStore("editroutine", {
  state: () => ({
    title: "",
    description: "",
    category: null,
    id: null
  }),
  getters: {
    hasRoutine: () => !!this.id
  },
  actions: {
    getRoutine(id) {
      console.log(id, "obtained routine");
    },
    async createRoutine(routineBody) {
      try {
        await fetch(`http://localhost:8080/api/routines`, {
          method: "POST",
          body: JSON.stringify(routineBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken}`
          }
        });
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
    async modifyRoutine(routineBody, routineId) {
      try {
        if (routineId) {
          await fetch(`http://localhost:8080/api/routines/${routineId}`, {
            method: "PUT",
            body: JSON.stringify(routineBody),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`
            }
          });
        }
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
              Authorization: `bearer ${this.getToken}`
            }
          }
        );
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      } catch (error) {
        console.log("Oops!" + error);
      }
    },
    async getCycleExercises(cycle_id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cycles/${cycle_id}/exercises`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.getToken}`
            }
          }
        );
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
    async createCycle(routine_id, cycleBody) {
      //devuelve el id del cycle creado
      try {
        const response = await fetch(
          `http://localhost:8080/api/routines/${routine_id}/cycles`,
          {
            method: "POST",
            body: JSON.stringify(cycleBody),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getToken}`
            }
          }
        );
        const text = await response.text();
        const obj = text ? JSON.parse(text) : null;
        if (obj != null) return obj.id;
        return null;
      } catch (errors) {
        console.log("Oops!" + errors);
      }
    },
    /*
     * TODO: es una paja porque hay que ver que cambió y hacer POST PUT o DELETE segun corresponda con cada
     *  cyclo y/o sus sub-ejercicios
     * */
  },
});

// export const routine = {
//   title: "Abdominales en 15 minutos",
//   description:
//     "Con esta rutinar abdominales en sólo 15 minutoara el fulbo, Con esta rutina podrás entrenar abdominales en sólo 15 minutos! Perfecto para el fulbo, Con esta rutina podrás entrenar abdominales en sólo 15 minutos! Perfecto para el fulbo, Con esta rutina podrás entales en sólo 15 minutos! Perfecto para el fulbo",
//   author: {
//     img: abdominales,
//     name: "Lionel Messi",
//     username: "lionel-messi",
//   },
//   categories: [
//     { name: "Core", id: "core" },
//     { name: "Principiante", id: "noob" },
//   ],
//   cycles: [cycle1, cycle2, cycle1],
//   rating: 4.3,
//   liked: true,
// };
