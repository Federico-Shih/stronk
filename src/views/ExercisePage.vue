<template>
  <v-container>
    <v-row>
      <v-col>
        <ExerciseDepiction variant="small" :picture="abdominales" exercise-name="Short Abs" category="Abdominales" />
        <h1>Todos los Ejercicios</h1>
      </v-col>
      <v-spacer>|</v-spacer>
      <v-col>
        asddsaasd
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExerciseDepiction from "@/components/ExerciseDepiction.vue";
import abspic from "../assets/abdominales.jpg";
export default {
  name: "ExercisePage.vue",
  components: { ExerciseDepiction },
  data() {
    return {
      abdominales: abspic,
    }
  },
};
</script>

<style scoped>

</style>