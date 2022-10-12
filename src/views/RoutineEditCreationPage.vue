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
        <v-btn outlined class="rounded-pill" @click="saveRoutine()">
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
            <v-chip v-for="index in difficulty.length" :key="index" class="pa-5"
            >{{ difficulty[index - 1] }}
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
            <v-chip v-for="index in category.length" :key="index" class="pa-5"
            >{{ category[index - 1] }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <h2 class="mt-4 ml-8">Ciclos de Ejercicios</h2>
    <div
      v-for="cycle in cycles"
      :key="cycle.internalId"
      class="d-flex flex-column align-center flex-grow-0"
    >
      <EditCycle
        :bus="bus"
        :order="cycle.order"
        :cycle-type="cycle['cycle-type']"
        :cycleId="cycle.id"
        :routine-id="parseInt(routineId)"
      />
      <v-btn
        v-if="cycle.order !== cycles.length && cycle.order !== 1"
        @click="() => addCycle(cycle.order)"
        class="mb-7 mt-5"
      >
        <v-icon>mdi-plus</v-icon>
        Agregar ciclo
      </v-btn>
      <div v-else class="mt-4"></div>
    </div>
  </div>
</template>

<script>
import EditCycle from "@/components/editroutine/EditCycle.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Vue from "vue";
import {CycleTypes, useCycles, useSaveRoutine} from "../stores/routine";
import {mapActions} from "pinia";

const difficultyApiNames = ["beginner", "intermediate", "advanced"];



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
      cycles: [],
      maxId: 0
    };
  },
  computed: {
    edit() {
      return this.$route.params.id !== undefined;
    }
  },
  async created() {
    this.bus.$on('removeCycle', (order) => {
      this.removeCycle(order);
    })
    if (this.$route.params.id) {
      this.routineId = this.$route.params.id;
      let apiAns = await useSaveRoutine().getRoutine(this.routineId);
      this.name = apiAns.name;
      this.detail = apiAns.detail;
      this.difficultySelected = difficultyApiNames.indexOf(apiAns.difficulty);
      //todo categories y author
      apiAns = await useCycles().getCyclesFromRoutine(
          this.routineId
      );
      this.cycles = apiAns.map((cycle, index) => ({
        ...cycle,
        "cycle-type": cycle.type,
        internalId: index
      }));
      this.cycles.sort((a,b) => a.order-b.order);
      this.maxId = this.cycles.length;
    } else {
      this.cycles = this.cycles.concat(
        { "cycle-type": CycleTypes.WARMUP, order: 1, id: null, internalId: 0 },
        { "cycle-type": CycleTypes.EXERCISE, order: 2, id: null, internalId: 1 },
        { "cycle-type": CycleTypes.COOLDOWN, order: 3, id: null, internalId: 2 }
      );
      this.maxId = 3;
    }
  },
  methods: {
    ...mapActions(useCycles, ["getCyclesFromRoutine"]),
    addCycle(order) {
      const newCycles = [];
      this.cycles.forEach((cycle) => {
        if (cycle.order === order) {
          newCycles.push(cycle, {
            order: order + 1,
            "cycle-type": CycleTypes.EXERCISE,
            internalId: this.maxId,
          });
        } else if (cycle.order > order) {
          newCycles.push({ ...cycle, order: cycle.order + 1 });
        } else {
          newCycles.push(cycle);
        }
      });
      this.cycles = newCycles;
      this.maxId += 1;
    },
    removeCycle(order) {
      const newCycles = [];
      let i = 1;
      this.cycles.forEach((cycle) => {
        if (cycle.order !== order) {
          newCycles.push({
            ...cycle,
            order: i++,
          });
        }
      });
      this.cycles = newCycles;
    },
    async saveRoutine() {
      const routineBody = {
        "name": this.name,
        "detail": this.detail,
        "isPublic": true,
        "difficulty": difficultyApiNames[this.difficultySelected],
        "metadata": null
        //todo categories y author
      };
      if(this.edit)
      {
        await useSaveRoutine().modifyRoutine(this.routineId, routineBody);
        await useCycles().cleanCyclesFromRoutine(this.routineId);
      }
      else
      {
        this.routineId = await useSaveRoutine().createRoutine(routineBody);
      }
      this.bus.$emit('saveCycle', this.routineId);
    }
  },
};
</script>

<style scoped></style>
