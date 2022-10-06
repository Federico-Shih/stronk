import { defineStore } from "pinia";

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

export const useEditCycleList = defineStore("editcyclelist", {
  state: () => ({
    cycles: {},
    maxCycle: 0
  }),
  actions: {
    createCycle(position) {
      const newCycles = [...this.cycles];
      Object.entries(this.cycles).forEach(([key, value]) => {
        if (value.order >= position) {
          newCycles[key] = { ...value, order: value.order + 1 };
        }
      });

      newCycles[this.maxCycle] = {
        name: "",
        detail: "",
        type: CycleTypes.EXERCISE,
        order: position,
        repetitions: 0,
        id: this.maxCycle
      };
      this.maxCycle += 1;
    },
    swapPositions(cycleIdA, cycleIdB) {
      const aPosition = this.cycles[cycleIdA].order;
      this.cycles[cycleIdA].order = this.cycles[cycleIdB].order;
      this.cycles[cycleIdB].order = aPosition;
    },
    deleteCycle(cycleId) {
      delete this.cycles[cycleId];
      // TODO: actualizar las ordenes
    },
    setCycleName(cycle, name) {
      this.cycles[cycle].name = name;
    },
    setCycleType(cycle, type) {
      this.cycles[cycle].type = type;
    },
    setCycleRepetitions(cycle, reps) {
      this.cycles[cycle].repetitions = reps;
    },
  },
  getters: {
    getOrderedCycles() {
      return Object.values(this.cycles).sort(
        (cycleA, cycleB) => cycleA.order - cycleB.order
      );
    }
  }
});

export const useEditCycle = defineStore("editcycle", {
  state: () => ({
    cycleExercises: {}
  }),
  getters: {},
  actions: {
    addCycleList(cycleId) {
      this.cycleExercises[cycleId] = {};
    },
    createExercise(cycleId, exerciseId, reps, duration) {
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
