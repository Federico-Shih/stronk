<script>
import abs from "../assets/abdominales.jpg";
import abslat from "../assets/abdominallateral.jpg";
import fle from "../assets/flexiones.jpg";
import estirar from "../assets/estirar.jpg";
export default {
  data() {
    return {
      sources: [abs, abslat, fle, estirar],
    };
  },
};
</script>

<template>
  <v-container>
    <div class="text-center">
      <h1>¡Conviertete en tu mejor versión!</h1>
      <p class="align-center">
        Elige entre una Elige entre una gran variedad de rutinas y ejercicios<br />
        Hagamos rendir mas tu tiempo en el gimnasio.<br />
        ¡Diviertete haciendo cada dia un mejor esfuerzo!
      </p>
    </div>
    <div class="text-center mt-8 pa-4">
      <v-btn color="primary" class="v-size--x-large"
        >Explora Nuestras Rutinas</v-btn
      >
    </div>
    <div class="text-center mt-10">
      <h2>Rutinas Recomendadas</h2>
    </div>
    <v-carousel height="400">
      <v-carousel-item
        v-for="(mysource, i) in sources"
        :key="i"
        :src="mysource"
      >
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>
