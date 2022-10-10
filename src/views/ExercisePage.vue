<template>
  <v-main class="px-16">
    <v-row class="ml-8 d-flex flex-row justify-space-between">
      <v-col class="mr-16">
        <h1>Todos los Ejercicios</h1>
        <div class="d-flex flex-row">
          <search-bar title="Busca una rutina en particular..."></search-bar>
          <v-icon class="ml-6 mb-8">mdi-filter</v-icon>
        </div>
        <div v-for="exer in allExercises" :key="exer.id">
          <ExerciseDepiction
            @refreshevent="refreshOwnExercises"
            variant="large"
            :picture="exer.images"
            :exercise-name="exer.name"
            :category="exer.detail"
            :id="exer.id"
            class="mt-0"
          />
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-col class="mr-16 alignmentToTheRight" :style="{ height: '10px' }">
        <h2 class="align-self-start mb-2 mt-2">Mis Ejercicios</h2>
        <div v-for="exer in exercises" :key="exer.id">
          <ExerciseDepiction
            @refreshevent="refreshOwnExercises"
            variant="small"
            :picture="exer.images"
            :exercise-name="exer.name"
            :category="exer.detail"
            :id="exer.id"
            class="mt-0"
          />
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import ExerciseDepiction from "@/components/ExerciseDepiction.vue";
import abspic from "../assets/abdominales.jpg";
import SearchBar from "../components/SearchBar.vue";
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exercise";
export default {
  name: "ExercisePage.vue",
  components: { ExerciseDepiction, SearchBar },
  data() {
    return {
      abdominales: abspic,
      exercises: [],
      allExercises: [],
    };
  },
  methods: {
    ...mapActions(useExerciseStore, [
      "getOwnExercisesData",
      "getExerciseData",
      "getOwnExercises",
    ]),
    async refreshOwnExercises() {
      this.exercises = await this.getOwnExercises();
      // habría que cambiarlo a getAllExercisese o algo así
      this.allExercises = await this.getOwnExercisesData();
    },
  },
  async mounted() {
    this.exercises = await this.getOwnExercisesData();
    // habría que cambiarlo a getAllExercisese o algo así
    this.allExercises = await this.getOwnExercisesData();
  },
};
</script>

<style scoped>
.alignmentToTheRight {
  align-items: end;
  display: flex;
  flex-direction: column;
}
</style>
