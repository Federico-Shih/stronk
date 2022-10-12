<template>
  <v-card outlined class="d-flex flex-row">
    <div
      style="border: 6px solid; width: 136px"
      :style="{ borderColor: this.$vuetify.theme.themes.light.primary }"
      class="text-h5 pa-3 ml-6 my-5 d-flex flex-column justify-end rounded-xl"
    >
      <div style="width: 80px">
        <v-text-field
          outlined
          class=""
          suffix="reps."
          v-model="cycleRepetitions"
        />
      </div>
    </div>
    <div style="padding-bottom: 40px; min-width: 600px" class="ml-5">
      <v-text-field
        v-if="cycleType === CycleTypes.EXERCISE"
        outlined
        class="mt-4"
        label="Nombre del ciclo"
        v-model="cycleName"
      />
      <h3 v-else class="mt-4">{{ cycleName }}</h3>
      <v-card-text>
        <div class="d-flex flex-row justify-center">
          <v-btn icon @click="addExercise(0)">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div
          v-for="(exercise, index) in exercises"
          :key="index"
          class="mt-3 d-flex flex-column"
        >
          <v-icon
            style="position: absolute; transform: translate(-54px)"
            color="primary"
            size="30"
          >mdi-circle
          </v-icon>
          <EditExercise
            :index="index"
            :last="index === exercises.length - 1"
            :type="exercise.type"
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
            v-on:duplicate="duplicate(index)"
          ></EditExercise>
          <v-divider class="mt-3"></v-divider>
          <div class="d-flex flex-row justify-center">
            <v-btn icon @click="addExercise(index + 1)">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-divider
            v-if="index !== exercises.length - 1"
            class="mt-3"
          ></v-divider>
        </div>
      </v-card-text>
    </div>
    <ExercisePopup v-if="showPopup" @ex-sumbit="sumbitEx" />
  </v-card>
</template>

<script>
import EditExercise from "@/components/editroutine/EditExercise.vue";
import { CycleTypes } from "@/stores/routine";
import ExercisePopup from "@/components/ExercisePopup.vue";
import { mapActions } from "pinia";
import { useExPopupStore } from "@/stores/expopup";
import { useCycles } from "../../stores/routine";

export default {
  name: "EditCycle",
  components: { ExercisePopup, EditExercise },
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
  async mounted() {
    if (this.cycleType === CycleTypes.WARMUP) {
      this.cycleName = "Ciclo de Entrada en Calor";
    } else if (this.cycleType === CycleTypes.COOLDOWN) {
      this.cycleName = "Ciclo de Enfriamiento";
    }
    if (this.cycleId !== undefined && this.cycleId !== null) {
      let cycle = await useCycles().getCycleWithExercises(this.routineId, this.cycleId);
      this.cycleName = cycle.name;
      cycle.exercises.sort((a,b) => a.order-b.order).forEach((ex) => {
        this.exercises.push({
          id: ex['exercise'].id,
          name: ex['exercise'].name,
          type: ex['exercise'].type,
          duration: ex.duration,
          img_url: ex.img_url,
          repetitions: ex.repetitions,
        });
      })
      this.cycleRepetitions = cycle.repetitions;
    }
  },
  created() {
    this.bus.$on('saveCycle', () => {
      this.saveCycle();
    })
  },
  data: () => ({
    cycleName: "Nuevo Ciclo",
    showPopup: false,
    exercises: [],
    cycleRepetitions: 1,
    CycleTypes
  }),
  methods: {
    ...mapActions(useExPopupStore, ["showExPopup"]),
    sumbitEx(ExerciseSelected, ExerciseType, index) {
      this.exercises.splice(index, 0, {
        id: ExerciseSelected.id,
        type: ExerciseType,
        name: ExerciseSelected.name,
        duration: 0,
        repetitions: 0
      });
      this.showPopup = false;
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
    },
    duplicate(index) {
      this.exercises.splice(index, 0, this.exercises[index]);
    },
    addExercise(index) {
      this.showPopup = true;
      this.showExPopup(index);
    },
    saveCycle() {
      let exercisesArray = [];
      for(let ex of this.exercises)
      {
        exercisesArray.push({
          id: ex.id,
          body: {
            order: this.exercises.indexOf(ex) + 1,
            duration: ex.duration,
            repetitions: ex.repetitions,
          }
        });
      }
      useCycles().postCycle(this.routineId,
          {
        name: this.cycleName,
        detail: '',
        type: this.cycleType,
        order: this.order,
        repetitions: this.cycleRepetitions,
        metadata: null
      },
          exercisesArray);
    }
  },
};
</script>

<style scoped></style>
