<template>
  <v-container fluid style="margin-left: 2em">
    <div class="d-flex flex-column justify-space-between">
      <div class="d-flex flex-row mb-4 align-center">
        <h1>Mis Ejercicios</h1>

        <v-btn icon class="ml-10" @click="$router.push('/exercises/create')">
          <v-icon x-large color="primary">mdi-plus-circle</v-icon>
        </v-btn>
      </div>
      <div class="d-flex justify-center">
        <v-progress-circular
          v-show="loading"
          indeterminate
          color="primary"
          :size="100"
        />
      </div>
      <div class="d-flex flex-row justify-space-between pr-16">
        <span v-if="exercises.length === 0">
          <router-link
            to="/exercises/create"
            v-show="!loading && !errorloading"
          >
            <h2 class="text--black">
              No tenés ejercicios, empezá creando tu primer ejercicio!
            </h2>
          </router-link>
        </span>
        <div class="d-flex flex-column">
          <div v-for="exer in exercises" :key="exer.id">
            <ExerciseDepiction
              @refreshevent="refreshOwnExercises"
              variant="large"
              :picture="
                exer.images.length > 0 ? exer.images[0].url : abdominales
              "
              :exercise-name="exer.name"
              :category="exer.detail"
              :id="exer.id"
              class="mt-0"
            />
          </div>
        </div>
        <div class="flex-grow-1 d-flex flex-row justify-center">
          <v-img
            contain
            :src="exercisePerson"
            max-height="600px"
            max-width="300px"
          ></v-img>
        </div>
      </div>
    </div>
    <v-snackbar v-model="errorSnackbar" color="red" :timeout="timeout">
      Ocurrio un error cargando los ejercicios.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="errorSnackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import ExerciseDepiction from "@/components/ExerciseDepiction.vue";
import abspic from "../assets/abdominales.jpg";
import SearchBar from "../components/SearchBar.vue";
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exercise";
import exercisePerson from "@/assets/stock_people/exercisesperson.png";

export default {
  name: "ExercisePage.vue",
  components: { ExerciseDepiction, SearchBar },
  data() {
    return {
      abdominales: abspic,
      exercises: [],
      loading: true,
      errorSnackbar: false,
      errorloading: false,
      timeout: 5000,
      exercisePerson: exercisePerson
    };
  },
  methods: {
    ...mapActions(useExerciseStore, [
      "getOwnExercisesData",
      "getExerciseData",
      "getOwnExercises",
    ]),
    async refreshOwnExercises() {
      let aux;
      try {
        aux = await this.getOwnExercises();
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.errorSnackbar = true;
        this.errorloading = true;
        return;
      } //Faltaria poner un timeout para que no se quede cargando en la animacion
      this.loading = false;
      this.exercises = aux;
    },
  },
  async mounted() {
    await this.refreshOwnExercises();
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
