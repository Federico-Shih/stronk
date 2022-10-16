<script>
import abs from "../assets/abdominales.jpg";
import abslat from "../assets/abdominallateral.jpg";
import fle from "../assets/flexiones.jpg";
import estirar from "../assets/estirar.jpg";
import android from "../assets/android.png";
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
import { mapActions } from "pinia";
import { useRoutines } from "@/stores/routine";
import exerciseGuy from "@/assets/stock_people/exercisesperson.png";
import exerciseGirl from "@/assets/stock_people/person05.png";

export default {
  components: { RoutineSlideGroup },
  data() {
    return {
      exerciseImages: [abslat, abs, fle, estirar],
      android,
      popularRoutines: [],
      exerciseGuy: exerciseGuy,
      exerciseGirl: exerciseGirl
    };
  },
  async mounted() {
    const page = await this.getAnotherPage({
      orderBy: "date",
      direction: "desc"
    });
    if (page) {
      this.popularRoutines = page;
    }
    this.resetPages();
  },
  methods: {
    ...mapActions(useRoutines, ["getAnotherPage", "resetPages"])
  }
};
</script>

<template>
  <div class="">
    <div class="d-flex flex-row justify-center my-16">
      <div class="flex-grow-1 d-flex flex-row justify-center">
        <v-img
          contain
          :src="exerciseGirl"
          max-height="600px"
          max-width="300px"
        ></v-img>
      </div>
      <div class="d-flex flex-column align-center">
        <div class="text-center mt-10">
          <h1>¡Conviertete en tu mejor versión!</h1>
          <p class="align-center">
            Elige entre una gran variedad de rutinas y ejercicios<br />
            Hagamos rendir mas tu tiempo en el gimnasio.<br />
            ¡Diviertete haciendo cada dia un mejor esfuerzo!
          </p>
        </div>
        <div class="text-center mt-8 pa-4">
          <v-btn
            color="primary"
            class="v-size--x-large"
            @click="$router.push({ name: 'explore' })"
          >Explora Nuestras Rutinas
          </v-btn
          >
        </div>
      </div>
      <div class="flex-grow-1 d-flex flex-row justify-center">
        <v-img
          contain
          :src="exerciseGuy"
          max-height="600px"
          max-width="300px"
        ></v-img>
      </div>
    </div>

    <div class="">
      <RoutineSlideGroup
        title="Últimas Rutinas"
        size-variant="large"
        :routines="popularRoutines"
      />
    </div>
    <v-footer style="width: 100%" color="darkback" dark class="mt-10 pb-8">
      <v-container>
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
              <v-icon color="blue darken-3" size="60">mdi-facebook</v-icon>
              <div style="display: none">Facebook</div>
            </v-btn>
            <v-btn icon href="https://www.twitter.com/" class="mx-10">
              <v-icon color="blue" size="60">mdi-twitter</v-icon>
              <div style="display: none">Twiiter</div>
            </v-btn>
            <v-btn icon href="https://www.instagram.com/" class="mx-2">
              <v-icon color="orange darken-4" size="60">mdi-instagram</v-icon>
              <div style="display: none">Instagram</div>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <img :src="android" alt="android" height="35px" />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
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
