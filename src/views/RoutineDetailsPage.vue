<script>
import abdominales from "../assets/abdominales.jpg";
import CycleCard from "../components/rutine/CycleCard.vue";
import { cycle1, cycle2, routine } from "../models/routine.model";

export default {
  mounted() {
    this.routine = routine;
    this.loading = false;
  },
  components: { CycleCard },
  data: () => ({
    img: abdominales,
    cycles: [cycle1, cycle2],
    loading: true,
    routine: null
  })
};
</script>

<template>
  <div v-if="loading">
    <v-skeleton-loader
      height="500"
      loading
      type="article, paragraph@2, card"
    ></v-skeleton-loader>
  </div>
  <div v-else>
    <div class="d-flex flex-column mx-10 mt-5">
      <div class="d-flex flex-row align-center">
        <v-btn icon @click="() => this.$router.go(-1)">
          <v-icon large>mdi-arrow-left</v-icon>
        </v-btn>
        <h4 class="text-h4 font-weight-bold ml-5">{{ routine.title }}</h4>
        <v-btn icon @click="() => {}" class="ml-auto">
          <v-icon color="primary" large>{{
              routine.liked ? "mdi-heart" : "mdi-heart-outline"
            }}
          </v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-row align-center" style="position: relative">
        <span
        ><v-img
          height="50px"
          width="50px"
          :src="routine.author.img"
          class="rounded-circle"
        ></v-img
        ></span>
        <span class="ml-3">hecha por {{ routine.author.name }}</span>
        <span class="ml-10 mr-2">Categorias:</span>
        <span
          class="mr-2"
          v-for="category in routine.categories"
          :key="category.id"
        >
          <v-chip>{{ category.name }}</v-chip>
        </span>
        <v-chip
          large
          label
          class="d-flex flex-row align-center text--primary mt-8"
          style="position: absolute; right: 0"
        >
          {{ routine.rating }}
          <v-rating
            disabled
            readonly
            :value="routine.rating"
            half-increments
            dense
            class="ml-3"
          ></v-rating>
        </v-chip>
      </div>
      <div style="width: 50%" class="mt-5">
        {{ routine.description }}
      </div>
    </div>
    <v-container class="mt-3">
      <h2 class="text-h5 font-weight-bold">Ciclos de ejercicios:</h2>
    </v-container>
    <v-container class="d-flex flex-row justify-space-between">
      <div style="width: 600px; position: relative">
        <v-container
          class="width_full primary text-h5 font-weight-bold mb-6 rounded-pill"
        >Inicio
        </v-container>
        <CycleCard
          class="mt-3"
          v-for="(cycle, index) in routine.cycles"
          :key="index"
          :title="cycle.title"
          :repetitions="cycle.times"
          :exercises="cycle.exercises"
        ></CycleCard>
        <div
          class="primary"
          style="
            position: absolute;
            height: 100%;
            width: 6px;
            top: 0;
            left: 155px;
          "
        ></div>
        <v-container
          class="width_full primary text-h5 font-weight-bold rounded-pill mt-6"
        >Fin
        </v-container>
      </div>
      <div style="width: 400px; height: 600px; background-color: grey"></div>
    </v-container>
  </div>
</template>

<style></style>
