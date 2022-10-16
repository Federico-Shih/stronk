<template>
  <div>
    <div class="page-title">
      <h1 class="mb-1">Explorar Nuevas Rutinas</h1>
      <div class="d-flex flex-row">
        <v-text-field
          label="Busca una rutina en particular..."
          outlined
          v-model="input"
          class="rounded-lg mr-2"
          prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
        <h4 class="mt-4 mr-3">Filtros:</h4>
        <v-chip-group
          v-model="filterSelected"
          style="width: 30%"
          column
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
      </div>
      <div v-for="(selected, index) in filterSelected" :key="index">
        <div class="d-flex justify-center" v-if="selected !== undefined">
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
      </div>
      <div v-if="debouncedInput.length >= 3 || isFiltering">
        <v-select
          label="Ordenar Por"
          v-model="order"
          outlined
          :items="orderChoices"
          dense
          item-text="name"
          item-value="valueCall"
        ></v-select>
        <div class="d-flex flex-row justify-center" v-if="order !== ''">
          <h3 class="align-self-center">Ascendente o Descendente:</h3>
          <v-chip-group
            v-model="ascOrDes"
            column
            color="primary"
            active-class="primary--text"
            mandatory
          >
            <v-chip class="pa-5 mx-2">
              <v-icon large>mdi-sort-alphabetical-ascending</v-icon>
            </v-chip>
            <v-chip class="pa-5 mx-2">
              <v-icon large>mdi-sort-alphabetical-descending</v-icon>
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </div>
    <div v-if="debouncedInput.length >= 3 || isFiltering" class="">
      <RoutineSlideGroup
        title="Rutinas Buscadas"
        size-variant="large"
        :routines="searchingList"
      />
    </div>
    <div>
      <div class="">
        <RoutineSlideGroup
          title="Rutinas Populares"
          size-variant="large"
          :routines="routines"
        />
      </div>
      <div class="">
        <RoutineSlideGroup
          title="Otras Rutinas de la Comunidad"
          size-variant="long"
          :routines="routines"
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
      if (this.debouncedInput.length >= 3)
        this.filteredList(this.debouncedInput);
      else this.filteredList();
      this.isFiltering = !curr.every((element) => element === undefined);
    },
    order() {
      if (this.debouncedInput.length >= 3)
        this.filteredList(this.debouncedInput);
      else this.filteredList();
    },
    ascOrDes() {
      if (this.debouncedInput.length >= 3)
        this.filteredList(this.debouncedInput);
      else this.filteredList();
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
    async filteredList(searchValue) {
      console.log("asdasd");
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
    this.ourRoutines = await this.getNextPage(5);
    console.log("Our Routines:");
    console.log(this.ourRoutines);
  },
  data() {
    return {
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
      ourRoutines: [],
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
