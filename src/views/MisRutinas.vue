<template>
  <div v-if="!loading">
    <div class="d-flex flex-row align-center ml-8 mb-2">
      <h1>Mis Rutinas</h1>
    </div>
    <div class="flex-grow-1">
      <div
        class="mb-4"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
        }"
      >
        <v-container fluid>
          <h2 class="ml-4">Creadas Por Mi</h2>
          <div class="d-flex flex-row flex-wrap pt-2 pb-4" style="gap: 2em">
            <div v-for="atr in myRoutineList" :key="atr.id">
              <RoutineButton
                v-if="atr.id > 0"
                variant="small"
                :title="atr.name"
                :routineId="atr.id"
                :category="atr.category.id"
              />
              <RoutineButton
                v-else
                :new-blue-print="true"
                variant="small"
                :title="atr.name"
                :routineId="atr.id"
              />
            </div>

            <router-link
              to="/routines/create"
              v-if="myRoutineList.length === 0"
            >
              <h2 class="text--black">
                No tienes rutinas, empezá creando tu primera!
              </h2>
            </router-link>
          </div>
          <div class="alignedToCenter">
            <v-btn v-if="ownShowArrow" plain @click="increaseCounterOwn">
              <v-icon>mdi-chevron-double-down</v-icon>
              <div>Mostrar más</div>
            </v-btn>
          </div>
        </v-container>
      </div>

      <div
        class="mb-4"
        :style="{
          background: $vuetify.theme.themes[theme].contback,
        }"
      >
        <v-container fluid>
          <h2 class="ml-4">Rutinas Favoritas</h2>
          <div class="d-flex flex-row flex-wrap pt-2 pb-4" style="gap: 2em">
            <div v-for="atr in myFavoritesList" :key="atr.id">
              <router-link
                :to="`/routines/${atr.id}`"
                style="text-decoration: none; color: inherit"
              >
                <RoutineButton
                  variant="small"
                  :title="atr.name"
                  :routineId="atr.id"
                  :category="atr.category.id"
                />
              </router-link>
            </div>

            <h3 v-if="myFavoritesList.length === 0" class="text--black ml-8">
              No tienes rutinas favoritas al momento
            </h3>
          </div>
          <div class="alignedToCenter">
            <v-btn v-if="favShowArrow" plain @click="increaseCounterFav">
              <v-icon>mdi-chevron-double-down</v-icon>
              <div>Mostrar más</div>
            </v-btn>
          </div>
        </v-container>
      </div>
    </div>
    <LoadingFetchDialog
      :dialog-state="loadingDialogState"
      loading-text="Por favor, espere..."
      not-found-text="Error cargando tus rutinas, intente más tarde..."
      ok-not-found-button-text="OK"
      v-on:oknotfound="$router.back()"
    />
  </div>
</template>

<script>
import RoutineButton from "@/components/RoutineButton.vue";
import { useFavoriteRoutines, useMyRoutines } from "../stores/routine";
import { mapActions, mapState } from "pinia";
import LoadingFetchDialog from "../components/LoadingFetchDialog.vue";

export default {
  name: "MisRutinas.vue",
  components: { RoutineButton, LoadingFetchDialog },
  data() {
    return {
      amountShownEachLine: 5,
      buttonAtributesFav: [],
      loading: true,
      loadingDialogState: ""
    };
  },
  methods: {
    ...mapActions(useMyRoutines, ["resetPages", "getNextPage"]),
    ...mapActions(useFavoriteRoutines, ["resetPages", "getNextPage"]),
    async increaseCounterOwn() {
      this.counterOwn = this.counterOwn + 1;
      await useMyRoutines().getNextPage(this.amountShownEachLine);
    },
    async increaseCounterFav() {
      this.counterFav = this.counterFav + 1;
      await useFavoriteRoutines().getNextPage(this.amountShownEachLine);
    },
  },
  computed: {
    ...mapState(useMyRoutines, ["routines", "isLastPage"]),
    ...mapState(useFavoriteRoutines, ["favorites", "isLastFavorite"]),
    myRoutineList() {
      return [{ id: -1 }, ...this.routines];
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
  async mounted() {
    this.loadingDialogState = "loading";
    this.loading = true;
    try {
      useMyRoutines().resetPages();
      await useMyRoutines().getNextPage(this.amountShownEachLine);
      useFavoriteRoutines().resetPages();
      await useFavoriteRoutines().getNextPage(this.amountShownEachLine);
      this.loading = false;
      this.loadingDialogState = "";
    } catch (err) {
      this.loading = false;
      this.loadingDialogState = "notFound";
    }
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
