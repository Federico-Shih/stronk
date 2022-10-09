<template>
  <v-card outlined>
    <div style="padding-left: 180px; padding-bottom: 40px">
      <v-card-title class="font-weight-bold text-h5"
      >{{ cycleName }}
      </v-card-title>
      <v-card-text>
        <div v-for="(exercise, index) in exercises" :key="index" class="mt-3">
          <div>
            <v-icon
              style="position: absolute; transform: translate(-54px)"
              color="primary"
              size="30"
            >mdi-circle
            </v-icon>
            <EditExercise
              :index="index"
              :last="index === exercises.length - 1"
              :name="exercise.name"
              :img_url="exercise.img_url"
              :duration="exercise.duration"
              :repetitions="exercise.repetitions"
              @update:duration="
                (valor) => {
                  updateDuration(valor, index);
                }
              "
              @update:repetitions="
                (valor) => {
                  updateRepetitions(valor, index);
                }
              "
              v-on:moveup="moveUp(index)"
              v-on:movedown="moveDown(index)"
              v-on:remove="remove(index)"
            ></EditExercise>
          </div>
          <v-divider
            v-if="index !== exercises.length - 1"
            class="mt-3"
          ></v-divider>
        </div>
      </v-card-text>
    </div>
    <div
      style="
        position: absolute;
        left: 0;
        bottom: 0;
        height: 85%;
        border: 6px solid;
        width: 136px;
      "
      :style="{ borderColor: this.$vuetify.theme.themes.light.primary }"
      class="text-h5 pa-3 ml-6 mb-5 d-flex flex-column justify-end rounded-xl"
    >
      <div>
        <span class="font-weight-bold text-h4">{{
            this.cycleRepetitions
          }}</span>
        reps.
      </div>
    </div>
  </v-card>
</template>

<script>
import EditExercise from "@/components/editroutine/EditExercise.vue";
import abspic from "@/assets/abdominales.jpg";
import { CycleTypes } from "../../stores/routine";

export default {
  name: "EditCycle",
  components: { EditExercise },
  props: {
    routineId: {
      type: Number,
      required: false
    },
    order: {
      type: Number,
      required: true
    },
    bus: {
      type: Object,
      required: true
    },
    cycleType: {
      type: String,
      default: CycleTypes.EXERCISE
    },
    cycleId: {
      type: Number,
      default: null
    }
  },
  mounted() {
    if (this.cycleType === CycleTypes.WARMUP) {
      this.cycleName = "Ciclo de Entrada en Calor";
    } else if (this.cycleType === CycleTypes.COOLDOWN) {
      this.cycleName = "Ciclo de Enfriamiento";
    }
    if (this.cycleId !== null) {
      let cycle = undefined; //= store.getCycle(this.cycleId)
      this.cycleName = cycle.name;
      this.cycleDetails = cycle.details;
      this.exercises = cycle.exercises; //o como sea para agarrar los ejs
      this.cycleRepetitions = cycle.repetitions;
    }
  },
  data: () => ({
    cycleName: "Nuevo Ciclo",
    cycleDetails: "",
    exercises: [
      {
        name: "Jumping Jacks",
        duration: 0,
        repetitions: 30,
        img_url: abspic
      },
      {
        name: "Abdominales",
        duration: 60,
        repetitions: 15
      }
    ],
    cycleRepetitions: 1
  }),
  methods: {
    chooseNewExercise() {
      //store.showpopup()
    },
    getNewExercise(exerciseId, exerciseType) {
      let exercise = undefined; //= store.getExercise(exerciseId);
      this.exercises.push({
        id: exerciseId,
        type: exerciseType,
        name: exercise.name,
        order: this.exercises.length,
        duration: 0,
        repetitions: 0
      });
    },
    updateDuration(value, index) {
      this.exercises[index].duration = value;
    },
    updateRepetitions(value, index) {
      this.exercises[index].repetitions = value;
    },
    moveUp(index) {
      if (index !== 0) {
        const aux = this.exercises[index];
        this.exercises[index] = this.exercises[index - 1];
        this.exercises[index - 1] = aux;
        this.exercises = [...this.exercises];
      }
    },
    moveDown(index) {
      if (index !== this.exercises.length - 1) {
        const aux = this.exercises[index];
        this.exercises[index] = this.exercises[index + 1];
        this.exercises[index + 1] = aux;
        this.exercises = [...this.exercises];
      }
    },
    remove(index) {
      for (let i = index; i < this.exercises.length - 1; i++) {
        this.exercises[i] = this.exercises[i + 1];
      }
      this.exercises.splice(this.exercises.length - 1, 1);
    }
  },
};
</script>

<style scoped></style>
