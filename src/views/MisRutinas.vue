<template>
  <div class="mt-2" :style="{ width: '100%', height: '100%' }">
    <h1 class="ml-10">Mis Rutinas</h1>
    <div class="alignedToCenter flex-grow-1">
      <div class="pa-1" :style="{ background: $vuetify.theme.themes[theme].contback, width: '87%' }">
        <h2>Creadas Por Mi</h2>
      </div>
      <div
        class="d-flex flex-row flex-wrap justify-space-around pt-2 pb-4"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
          width: '87%',
        }"
      >
        <div
          class="alignedToCenter"
          :style="{ width: '25%' }"
          v-for="atr in ownToShow"
          :key="atr.id"
        >
          <RoutineButton
            :variant="atr.variant"
            :title="atr.title"
            :image="atr.image"
          />
        </div>
        <v-icon v-if="ownShowArrow" @click="increaseCounterOwn"
          >mdi-chevron-double-down</v-icon
        >
      </div>
    </div>

    <div class="alignedToCenter flex-grow-1">
      <div class="mt-10 pt-2 pl-1" :style="{ background: $vuetify.theme.themes[theme].contback, width: '87%' }">
        <h2>Rutinas Favoritas</h2>
      </div>
      <div
        class="d-flex flex-row flex-wrap justify-space-around pt-2 pb-4"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
          width: '87%',
        }"
      >
        <div
          class="alignedToCenter"
          :style="{ width: '25%' }"
          v-for="atr in favToShow"
          :key="atr.id"
        >
          <RoutineButton
            :variant="atr.variant"
            :title="atr.title"
            :image="atr.image"
          />
        </div>
        <v-icon v-if="favShowArrow" @click="increaseCounterFav"
          >mdi-chevron-double-down</v-icon
        >
      </div>
    </div>
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
      counterOwn: 1,
      counterFav: 1,
      amountShownEachLine: 4,
      buttonAtributesOwn: [
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
      ],
      buttonAtributesFav: [
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
        { variant: "small", title: "Abs2", image: abslat, id: 2 },
        { variant: "small", title: "flex", image: fle, id: 3 },
        { variant: "small", title: "Abs", image: abs, id: 1 },
      ],
    };
  },
  methods: {
    increaseCounterOwn() {
      this.counterOwn = this.counterOwn + 1;
    },
    increaseCounterFav() {
      this.counterFav = this.counterFav + 1;
    },
  },
  computed: {
    ownToShow() {
      return this.buttonAtributesOwn.slice(
        0,
        this.counterOwn * this.amountShownEachLine
      );
    },
    favToShow() {
      return this.buttonAtributesFav.slice(
        0,
        this.counterFav * this.amountShownEachLine
      );
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    ownShowArrow() {
      return (
        this.counterOwn * this.amountShownEachLine <
        this.buttonAtributesOwn.length
      );
    },
    favShowArrow() {
      return (
        this.counterFav * this.amountShownEachLine <
        this.buttonAtributesFav.length
      );
    },
  },
};
/* podemos hacer una método computed el cual haga un splice desde
 * donde queramos de un array hasta counter*3 por ejemplo, el v-for haría
 * items in métodoComputed*/

/* flex-grow y width: 33%*/
</script>

<style scoped>
.alignedToCenter {
  align-items: center;
  flex-direction: column;
  width: 100vw;
  display: flex;
  /*<!-- también se podía usar padding-->*/
}

.colorViewer {
  background-color: darkgray;
  width: 100%;
}
</style>
