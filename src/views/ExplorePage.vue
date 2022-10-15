<template>
  <div>
    <div class="page-title">
      <h1 class="mb-1">Explorar Nuevas Rutinas</h1>
      <div class="d-flex flex-row">
        <v-text-field
          label="Busca una rutina en particular..."
          v-model="searcher"
          outlined
          class="rounded-lg mr-2"
          prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
        <v-chip-group
          v-model="filterSelected"
          style="width: 42%"
          column
          active-class="primary--text"
          multiple
        >
          <v-chip
            v-for="index in filterChoices.length"
            :key="index"
            class="pa-5"
            >{{ filterChoices[index - 1] }}
          </v-chip>
        </v-chip-group>
      </div>
      <div v-for="(selected, index) in filterSelected" :key="index">
        <div class="d-flex justify-center" v-if="selected !== undefined">
          <v-chip-group
            v-model="filtersModels[selected]"
            row
            color="primary"
            active-class="primary--text"
          >
            <v-chip
              v-for="index in filters[selected].length"
              :key="index"
              class="pa-5 mx-5"
              >{{ filters[selected][index - 1] }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
      <v-select
        label="Ordenar Por"
        v-model="order"
        outlined
        :items="orderChoices"
        dense
        item-text="name"
        item-value="valueCall"
      ></v-select>
    </div>
    <div v-if="searcher !== ''" class="">
      <RoutineSlideGroup
        title="Rutinas Buscadas"
        size-variant="large"
        :routines="routines"
      />
    </div>
    <div v-else>
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
import { useMyRoutines } from "@/stores/routine";
export default {
  components: {
    RoutineSlideGroup,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    filteredList() {
      if (this.ourRoutines.length !== 0)
        return this.ourRoutines.content.filter((routine) =>
          routine.name.includes(this.searcher)
        );
      return [];
    },
  },
  methods: {
    ...mapActions(useMyRoutines, ["getNextPage"]),
  },
  async mounted() {
    this.ourRoutines = (await this.getNextPage(5)).data;
    console.log("Our Routines:");
    console.log(this.ourRoutines);
  },
  data() {
    return {
      order: 0,
      filterSelected: 0,
      filtersModels: [undefined, undefined, undefined, undefined],
      filterChoices: [
        "Fecha de Creación",
        "Puntuación",
        "Dificultad",
        "Categoría",
      ],
      orderChoices: [
        { name: "Fecha de Creación", valueCall: "date" },
        { name: "Puntuación", valueCall: "score" },
        { name: "Dificultad", valueCall: "difficulty" },
        { name: "Categoría", valueCall: "category" },
      ],
      filters: [
        ["Ascending", "Descending"],
        ["1", "2", "3", "4", "5"],
        ["Principiante", "Intermedio", "Avanzado"],
        ["Full Body", "Pecho", "Espalda", "Piernas", "Abdominales", "Brazos"],
      ],
      ourRoutines: [],
      searcher: "",
      routines: [
        {
          name: "Abdominales en 15 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          name: "Abdominales en 30 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          name: "Abdominales en 45 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          name: "Abdominales en 30 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          name: "Abdominales en 45 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
      ],
    };
  },
};
</script>

<style>
.page-title {
  margin: 0 2em;
}
</style>
