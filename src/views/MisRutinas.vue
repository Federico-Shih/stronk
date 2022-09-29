<template>
  <div class="mt-2" :style="{ backgroundColor: 'lightGray', width: '100%', height: '100%' }">
    <h1 class="ml-10">Mis Rutinas</h1>
    <!-- cómo hago para que el div ocupe el espacio disponible?-->
    <v-container
      class="mt-8 ps-4 colorViewer"
    >
      <v-row>
        <h2>Rutinas que has creado</h2>
      </v-row>

      <v-row class="alignedToCenter" >
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
       <!-- <v-btn color="primary" @click="increseCounter()"> Ver más</v-btn> -->
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </v-container>

    <v-container
      class="mt-14 mb-8 ps-4 colorViewer"
    >
      <v-row>
        <h2>Rutinas Favoritas</h2>
      </v-row>
      <v-row dense class="alignedToCenter">
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
/* podemos hacer una método computed el cual haga un splice desde
* donde queramos de un array hasta counter*3 por ejemplo, el v-for haría
* items in métodoComputed*/

/* flex-grow y width: 33%*/
</script>

<style scoped>

.alignedToCenter {
  align-items: center;
  flex-direction: row;
  width: 100vw;
  display: flex;
  /*<!-- también se podía usar padding-->*/
}

.colorViewer {
  background-color: darkgray;
  width: 100%;
}
</style>
