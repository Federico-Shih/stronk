<template>
  <div class="d-flex flex-column justify-start py-8 px-4">
    <div class="d-flex flex-row justify-space-between">
      <div class="d-flex flex-row justify-start">
        <GoBackButton />
        <h1 class="pl-4">{{ edit ? "Editar" : "Crear" }} una Rutina</h1>
      </div>
      <div class="d-flex flex-row mr-8">
        <v-btn outlined class="rounded-pill mr-4">
          <v-icon left>mdi-close</v-icon>
          Descartar {{ edit ? " Cambios" : " Rutina" }}
        </v-btn>
        <v-btn outlined class="rounded-pill">
          <v-icon left>mdi-content-save</v-icon>
          Guardar {{ edit ? " Cambios" : " Rutina" }}
        </v-btn>
      </div>
    </div>
    <div class="ml-16 d-flex flex-row justify-space-between">
      <div class="d-flex flex-column justify-start pt-4" style="width: 40%">
        <v-text-field
          v-model="name"
          label="Nombre de la Rutina"
          dense
          outlined
          class="rounded-lg"
        />
        <v-textarea
          v-model="detail"
          label="Descripción de la Rutina"
          dense
          outlined
          class="rounded-lg"
        />
      </div>
      <div class="d-flex flex-column justify-start">
        <div class="d-flex flex-row justify-end align-center mr-8">
          <h4 class="mr-4">Dificultad:</h4>
          <v-chip-group
            v-model="difficultySelected"
            mandatory
            style="width: 60%"
            column
            active-class="primary--text"
          >
            <v-chip v-for="index in difficulty.length" class="pa-5">{{
                difficulty[index - 1]
              }}
            </v-chip>
          </v-chip-group>
        </div>
        <div class="d-flex flex-row justify-end align-center mr-8">
          <h4 class="mr-4">Categorías:</h4>
          <v-chip-group
            v-model="categoriesSelected"
            mandatory
            multiple
            style="width: 60%"
            column
            active-class="primary--text"
          >
            <v-chip
              v-for="index in category.length"
              :key="index"
              class="pa-5"
            >{{ category[index - 1] }}
            </v-chip
            >
          </v-chip-group>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <h2 class="mt-4 ml-8">Ciclos de Ejercicios</h2>
    <div
      v-for="(cycle, index) in cycles"
      :key="index"
      class="d-flex flex-column align-center flex-grow-0"
    >
      <EditCycle
        :bus="bus"
        :order="cycle.order"
        :routine-id="routineId"
        :cycle-type="cycle['cycle-type']"
        :cycleId="cycle.id"
      />
      <v-btn
        v-if="cycle.order !== cycles.length"
        @click="() => addCycle(cycle.order)"
        class="mb-7 mt-5"
      >
        <v-icon>mdi-plus</v-icon>
        Agregar ciclo
      </v-btn
      >
    </div>
  </div>
</template>

<script>
import EditCycle from "@/components/editroutine/EditCycle.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Vue from "vue";
import { CycleTypes } from "../stores/routine";

export default {
  name: "RoutineEditCreationPage",
  components: { GoBackButton, EditCycle },
  data() {
    return {
      routineId: null,
      name: "",
      detail: "",
      category: ["Pecho", "Espalda", "Piernas", "Abdominales", "Brazos"],
      categoriesSelected: [],
      difficulty: ["Principiante", "Intermedio", "Avanzado"],
      difficultySelected: 0,
      bus: new Vue({}),
      cycles: []
    };
  },
  computed: {
    edit() {
      return this.routineId !== null;
    }
  },
  created() {
    if (this.$route.params.id) {
      console.log(this.$route.params.id);
    } else {
      this.cycles = this.cycles.concat(
        { "cycle-type": CycleTypes.WARMUP, order: 1 },
        { "cycle-type": CycleTypes.EXERCISE, order: 2 },
        { "cycle-type": CycleTypes.COOLDOWN, order: 3 }
      );
    }
  },
  methods: {
    addCycle(order) {
      const newCycles = [];
      this.cycles.forEach((cycle) => {
        if (cycle.order === order) {
          newCycles.push(cycle, {
            order: order + 1,
            "cycle-type": CycleTypes.EXERCISE
          });
        } else if (cycle.order > order) {
          newCycles.push({ ...cycle, order: cycle.order + 1 });
        } else {
          newCycles.push(cycle);
        }
      });
      console.log(newCycles);
      this.cycles = newCycles;
    }
  }
};
</script>

<style scoped></style>
