<template>
  <v-main class="px-16">
    <v-row class="ml-8 d-flex flex-row justify-space-between">
      <v-col class="mr-16">
        <h1>Todos los Ejercicios</h1>
        <search-bar title="Busca una rutina en particular..."></search-bar>
        <ExerciseDepiction
          variant="large"
          :picture="abdominales"
          exercise-name="Short Abs"
          category="Abdominales"
        />
      </v-col>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-col class="mr-16 alignmentToTheRight">
        <h2 class="align-self-start mb-2">Mis Ejercicios</h2>
        <ExerciseDepiction
          variant="small"
          :picture="abdominales"
          exercise-name="Short Abs"
          category="Abdominales"
        />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import ExerciseDepiction from "@/components/ExerciseDepiction.vue";
import abspic from "../assets/abdominales.jpg";
import SearchBar from "../components/SearchBar.vue";
export default {
  name: "ExercisePage.vue",
  components: { ExerciseDepiction, SearchBar },
  data() {
    return {
      abdominales: abspic,
    };
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
