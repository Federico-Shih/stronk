import { defineStore } from "pinia";
import {cycle1} from "@/models/routine.model";

export const CycleTypes = {
  WARMUP: "warmup",
  EXERCISE: "exercise",
  COOLDOWN: "cooldown"
};

export const useEditRoutine = defineStore("editroutine", {
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
    }
  }
});

export const useCycles = defineStore("cyclelist", {
  state: () => ({
    cycles: {
    },
  }),
  actions: {
    async callCycleById(id) {
      if (!this.cycles[id]) {
        this.cycles[id] = cycle1;
      }
    }
  },
  getters: {
    getCycleById: (state) => {
      return (id) => {
        return state.cycles[id];
      }
    }
  }
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