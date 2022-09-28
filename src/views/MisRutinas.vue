<template>
  <div class="mt-2">
    <h1 class="ml-10">Mis Rutinas</h1>
    <!-- cómo hago para que el div ocupe el espacio disponible?-->
    <v-container :style="{ backgroundColor: 'gray' }" class="mt-8">
      <v-row>
        <h2>Rutinas que has creado</h2>
      </v-row>

      <v-row>
        <!-- Cómo hacerlo con v-for y counter-->
        <v-col v-for="(atr, index) in this.buttonAtributesOwn" :key="index">
          <RoutineButton
            :variant="atr.variant"
            :title="atr.title"
            :image="atr.image"
          />
        </v-col>
      </v-row>

      <div class="text-center justify-center">
        <v-btn color="primary" @click="increseCounter()"> Ver más</v-btn>
      </div>
    </v-container>

    <v-container :style="{ backgroundColor: 'lightGray' }" class="mt-14">
      <v-row>
        <h2>Rutinas Favoritas</h2>
      </v-row>
      <v-row dense>
        <v-col v-for="(atr, index) in this.buttonAtributesFav" :key="index">
          <div class="text-center align-center">
            <RoutineButton
              :variant="atr.variant"
              :title="atr.title"
              :image="atr.image"
            />
          </div>
        </v-col>
      </v-row>
      <div class="text-center justify-center">
        <v-btn color="primary" @click="increseCounter()"> Ver más</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import abs from "../assets/abdominales.jpg";
import abslat from "../assets/abdominallateral.jpg";
import fle from "../assets/flexiones.jpg";
import RoutineButton from "@/components/RoutineButton.vue";
export default {
  name: "MisRutinas.vue",
  components: { RoutineButton },
  data() {
    return {
      counter: 1,
      buttonAtributesOwn: [
        { variant: "small", title: "Abs", image: abs },
        { variant: "small", title: "Abs2", image: abslat },
        { variant: "small", title: "flex", image: fle },
      ],
      buttonAtributesFav: [
        { variant: "small", title: "Abs para el veranito", image: abs },
        { variant: "small", title: "Abs como los de Messi", image: abslat },
        { variant: "small", title: "Flexiones en 15 min", image: fle },
      ],
    };
  },
  methods: {
    increseCounter() {
      this.counter = this.counter + 1;
    },
  },
  computed: {},
};
</script>

<style scoped></style>
