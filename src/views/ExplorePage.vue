<template>
  <div>
    <div class="page-title">
      <h1 class="mb-1">Explorar Nuevas Rutinas</h1>
      <div class="d-flex flex-row">
        <v-text-field
          label="Busca una rutina en particular..."
          outlined
          clearable
          v-model="input"
          class="rounded-lg mr-2"
          prepend-inner-icon="mdi-magnify"
          @click:clear="debouncedInput = ''"
        >
        </v-text-field>
        <v-card class="d-flex flex-row justify-start px-2" outlined style="max-height: 56px">
          <v-icon>mdi-filter</v-icon>
          <h4 class="mt-4 mx-3">Filtros:</h4>
          <v-chip-group
              v-model="filterSelected"
              active-class="primary--text"
              multiple
          >
            <v-chip
                v-for="index in filterChoices.length"
                :key="index"
                class="pa-5"
                @click="cleanModel(index - 1)"
            >{{ filterChoices[index - 1] }}
            </v-chip>
          </v-chip-group>
        </v-card>

      </div>
      <div class="d-flex flex-row mb-6" style="gap: 1em">
        <v-card v-for="(selected, index) in filterSelected" :key="index" outlined>
          <h5 class="ml-4 mt-2">{{filterChoices[selected]}}</h5>
          <div class="d-flex flex-row justify-center" v-if="selected !== undefined">
            <v-chip-group
                v-model="filtersModels[selected]"
                column
                color="primary"
                active-class="primary--text"
            >
              <v-chip
                  v-for="index in filters[selected].valueNames.length"
                  :key="index"
                  class="pa-5 mx-5"
              >{{ filters[selected].valueNames[index - 1] }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-card>
      </div>
      <div v-if="debouncedInput.length >= 3 || isFiltering" class="d-flex flex-row">
        <v-select
          label="Ordenar Por"
          v-model="order"
          outlined
          :items="orderChoices"
          dense
          item-text="name"
          item-value="valueCall"
        ></v-select>
        <v-card class="d-flex flex-row justify-center align-center ml-2 px-2" style="max-height: 40px" outlined v-if="order !== ''">
          <h4 class="">Ascendente o Descendente:</h4>
          <v-chip-group
            v-model="ascOrDes"
            color="primary"
            active-class="primary--text"
            mandatory
          >
            <v-chip class="pa-2 mx-2">
              <v-icon >mdi-sort-alphabetical-ascending</v-icon>
            </v-chip>
            <v-chip class="pa-2 mx-2">
              <v-icon >mdi-sort-alphabetical-descending</v-icon>
            </v-chip>
          </v-chip-group>
        </v-card>
      </div>
    </div>
    <div v-if="debouncedInput.length >= 3 || isFiltering" class="">
      <RoutineSlideGroup
        title="Resultados para tu búsqueda"
        size-variant="large"
        :routines="searchingList"
      />
    </div>
    <div>
      <div class="">
        <RoutineSlideGroup
          title="Rutinas Populares"
          size-variant="large"
          :routines="popularRoutines"
        />
      </div>
      <div class="">
        <RoutineSlideGroup
          title="Rutinas para Principiantes"
          size-variant="long"
          :routines="otherRoutines"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
import { mapActions } from "pinia";
import { useMyRoutines, useRoutines } from "@/stores/routine";
export default {
  components: {
    RoutineSlideGroup,
  },
  watch: {
    debouncedInput(curr) {
      if (curr.length >= 3) this.filteredList(curr);
      else this.filteredList();
    },
    filtersModels(curr) {
      this.startSearch();
      this.isFiltering = !curr.every((element) => element === undefined);
    },
    order() {
      this.startSearch();
    },
    ascOrDes() {
      this.startSearch();
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    input: {
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
        }, 300);
      },
    },
  },
  methods: {
    ...mapActions(useMyRoutines, ["getNextPage"]),
    ...mapActions(useRoutines, ["getAnotherPage", "resetPages"]),
    cleanModel(index) {
      this.filtersModels[index] = undefined;
      this.filtersModels = [...this.filtersModels];
    },
    startSearch() {
      if (this.debouncedInput.length >= 3)
        this.filteredList(this.debouncedInput);
      else this.filteredList();
    },
    async filteredList(searchValue) {
      let object = {};
      if (searchValue !== null && searchValue !== undefined)
        object["search"] = searchValue;
      if (this.order !== "") object["orderBy"] = this.order;
      object["direction"] = this.ascOrDesVec[this.ascOrDes];
      for (let i = 0; i < this.filterSelected.length; i++) {
        const paramValue =
          this.filters[this.filterSelected[i]].valueCall[
            this.filtersModels[this.filterSelected[i]]
          ];
        if (paramValue !== undefined)
          object[this.filters[this.filterSelected[i]].nameOfParam] = paramValue;
      }
      this.searchingList = await this.getAnotherPage(object);
      this.resetPages();
    },
  },
  async mounted() {
    this.popularRoutines = await this.getAnotherPage({ score: 5 });
    this.resetPages();
    this.popularRoutines = this.popularRoutines.concat(
      await this.getAnotherPage({ score: 4 })
    );
    this.resetPages();
    this.otherRoutines = await this.getAnotherPage({ difficulty: "beginner" });
    this.resetPages();
  },
  data() {
    return {
      popularRoutines: [],
      otherRoutines: [],
      isFiltering: false,
      searchingList: [],
      debouncedInput: "",
      timeout: null,
      ascOrDes: 0,
      ascOrDesVec: ["asc", "desc"],
      order: "",
      orderChoices: [
        { name: "Nada en Específico", valueCall: "" },
        { name: "Creador", valueCall: "user" },
        { name: "Nombre de Rutina", valueCall: "name" },
        { name: "Fecha de Creación", valueCall: "date" },
        { name: "Puntuación", valueCall: "score" },
        { name: "Dificultad", valueCall: "difficulty" },
        { name: "Categoría", valueCall: "category" },
      ],
      filterSelected: [],
      filtersModels: [undefined, undefined, undefined],
      filterChoices: ["Puntuación", "Dificultad", "Categoría"],
      filters: [
        {
          valueNames: ["0", "1", "2", "3", "4", "5"],
          valueCall: [0, 1, 2, 3, 4, 5],
          nameOfParam: "score",
        },
        {
          valueNames: ["Principiante", "Intermedio", "Avanzado"],
          valueCall: ["beginner", "intermediate", "advanced"],
          nameOfParam: "difficulty",
        },
        {
          valueNames: [
            "Full Body",
            "Pecho",
            "Espalda",
            "Piernas",
            "Abdominales",
            "Brazos",
          ],
          valueCall: [1, 2, 3, 4, 5, 6],
          nameOfParam: "categoryId",
        },
      ],
      routines: [],
    };
  },
};
</script>

<style>
.page-title {
  margin: 0 2em;
}
</style>
