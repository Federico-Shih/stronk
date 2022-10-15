<template>
  <v-container fluid style="margin-left: 2em">
    <h1>Mis Rutinas</h1>
    <div class="alignedToCenter flex-grow-1">
      <div
        :style="{
          background: $vuetify.theme.themes[theme].contback,
          width: '78%',
        }"
      >
        <h2>Creadas Por Mi</h2>
      </div>
      <div
        class="d-flex flex-row flex-wrap justify-space-around pt-2 pb-4"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
          width: '78%',
        }"
      >
        <div
          class="alignedToCenter"
          :style="{ width: '25%' }"
          v-for="atr in myRoutineList"
          :key="atr.id"
        >
          <router-link
            :to="`/routines/${atr.id}`"
            style="text-decoration: none; color: inherit"
          >
            <RoutineButton
              variant="small"
              :title="atr.name"
              :image="atr.metadata?.image"
              :routineId="atr.id"
            />
          </router-link>
        </div>
        <v-icon v-if="ownShowArrow" @click="increaseCounterOwn"
        >mdi-chevron-double-down
        </v-icon>
        <router-link to="/routines/create">
          <h2 v-if="myRoutineList.length === 0" class="text--black">
            No tienes rutinas, empezá creando tu primera!
          </h2>
        </router-link>
      </div>
    </div>

    <div class="alignedToCenter flex-grow-1">
      <div
        class="mt-10 pt-2 pl-1"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
          width: '78%',
        }"
      >
        <h2>Rutinas Favoritas</h2>
      </div>
      <div
        class="d-flex flex-row flex-wrap justify-space-around pt-2 pb-4"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
          width: '78%',
        }"
      >
        <div
          class="alignedToCenter"
          :style="{ width: '25%' }"
          v-for="atr in myFavoritesList"
          :key="atr.id"
        >
          <router-link
            :to="`/routines/${atr.id}`"
            style="text-decoration: none; color: inherit"
          >
            <RoutineButton
              variant="small"
              :title="atr.name"
              :image="atr.metadata?.image"
            />
          </router-link>
        </div>
        <v-icon v-if="favShowArrow" @click="increaseCounterFav"
        >mdi-chevron-double-down
        </v-icon>
        <h2 v-if="myRoutineList.length === 0" class="text--black">
          No tienes favoritos, explorá las rutinas de la comunidad!
        </h2>
      </div>
    </div>
  </v-container>
</template>

<script>
import RoutineButton from "@/components/RoutineButton.vue";
import { useFavoriteRoutines, useMyRoutines } from "../stores/routine";
import { mapState } from "pinia";

export default {
  name: "MisRutinas.vue",
  components: { RoutineButton },
  data() {
    return {
      amountShownEachLine: 4,
      buttonAtributesFav: []
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
    ...mapState(useMyRoutines, ["routines", "isLastPage"]),
    ...mapState(useFavoriteRoutines, ["favorites, isLastFavorite"]),
    myRoutineList() {
      return this.routines;
    },
    myFavoritesList() {
      return this.favorites;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    ownShowArrow() {
      return !this.isLastPage;
    },
    favShowArrow() {
      return !this.isLastFavorite;
    }
  },
  async created() {
    const routineStore = useMyRoutines();
    await routineStore.getNextPage(this.amountShownEachLine);
    const favoriteStore = useFavoriteRoutines();
    await favoriteStore.getNextPage(this.amountShownEachLine);
  }
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
