<script>
import abdominales from "../assets/abdominales.jpg";
import CycleCard from "../components/rutine/CycleCard.vue";
import { cycle1, cycle2 } from "../models/routine.model";

export default {
  mounted() {
    console.log(this.$route.params.id);
  },
  components: { CycleCard },
  data: () => ({
    img: abdominales,
    cycles: [cycle1, cycle2]
  })
};
</script>

<template>
  <v-container>
    <div style="width: 600px; position: relative">
      <v-container
        class="width_full primary text-h5 font-weight-bold mb-6 rounded-pill"
      >Inicio
      </v-container>
      <CycleCard
        class="mt-3"
        v-for="(cycle, index) in cycles"
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
  </v-container>
</template>

<style></style>
