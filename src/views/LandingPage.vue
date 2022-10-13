<script>
import abs from "../assets/abdominales.jpg";
import abslat from "../assets/abdominallateral.jpg";
import fle from "../assets/flexiones.jpg";
import estirar from "../assets/estirar.jpg";
import android from "../assets/android.png";

export default {
  data() {
    return {
      exerciseImages: [abslat, abs, fle, estirar],
      android,
    };
  },
};
</script>

<template>
  <div class="alignedToCenter">
    <div class="text-center mt-10">
      <h1>¡Conviertete en tu mejor versión!</h1>
      <p class="align-center">
        Elige entre una Elige entre una gran variedad de rutinas y ejercicios<br />
        Hagamos rendir mas tu tiempo en el gimnasio.<br />
        ¡Diviertete haciendo cada dia un mejor esfuerzo!
      </p>
    </div>
    <div class="text-center mt-8 pa-4">
      <router-link to="explore">
        <!-- qué raro que no lo tuve que importar -->
        <v-btn color="primary" class="v-size--x-large"
          >Explora Nuestras Rutinas</v-btn
        >
      </router-link>
    </div>
    <div class="text-center mt-10">
      <h2>Rutinas Recomendadas</h2>
    </div>
    <div class="justify-center flex" :style="{ width: '80%' }">
      <v-carousel delimiter-icon="mdi-plus">
        <v-carousel-item
          v-for="(mysource, i) in this.exerciseImages"
          :key="i"
          :src="mysource"
          @click="$router.push('/routines/1')"
        >
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-container style="background-color: white">
      <v-row>
        <v-col>
          <h2>Redes Sociales</h2>
        </v-col>

        <v-spacer></v-spacer>

        <v-col>
          <h2>APP Móvil Android</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn icon href="https://www.facebook.com/" class="mx-2">
            <v-icon color="blue darken-3" size="100">mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon href="https://www.twitter.com/" class="mx-16">
            <v-icon color="blue" size="100">mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon href="https://www.instagram.com/" class="mx-2">
            <v-icon color="orange darken-4" size="100">mdi-instagram</v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <img :src="android" alt="android" height="35px" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.alignedToCenter {
  align-items: center;
  flex-direction: column;
  width: 100vw;
  display: flex;
  /*<!-- también se podía usar padding-->*/
}
</style>
