<script>
import EditCycle from "@/components/editroutine/EditCycle.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Vue from "vue";
import { CycleTypes, useCycles, useSaveRoutine } from "@/stores/routine";
import { mapActions } from "pinia";
import LoadingFetchDialog from "@/components/LoadingFetchDialog.vue";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";

const difficultyApiNames = ["beginner", "intermediate", "advanced"];

export default {
  name: "RoutineEditCreationPage",
  components: {
    DeleteConfirmationDialog,
    LoadingFetchDialog,
    GoBackButton,
    EditCycle
  },
  data() {
    return {
      routineId: null,
      name: "Nueva Rutina",
      detail: "",
      category: [],
      categorySelected: 0,
      difficulty: ["Principiante", "Intermedio", "Avanzado"],
      difficultySelected: 0,
      bus: new Vue({}),
      cycles: [],
      maxId: 0,
      cycleValidations: [],
      cycleSaves: 0,
      valid: true,
      snackbar: false,
      saveSnackbar: false,
      loadingDialogState: "loading",
      exitDialog: false,
      rules: {
        required: (value) => value.length > 0 || "Requerido",
        maxLength(n) {
          return (value) => value.length <= n || `Maximo ${n} caracteres`;
        }
      },
      saveButtonLoading: false,
      connectError: false
    };
  },
  computed: {
    edit() {
      return this.routineId !== null;
    }
  },
  async beforeCreate() {
    try {
      const res = await useSaveRoutine().getCategories();
      this.category = res || [];
    } catch (err) {
      this.connectError = true;
    }
  },
  async created() {
    this.bus.$on("removeCycle", (order) => {
      this.removeCycle(order);
    });
    this.bus.$on("validatedCycle", (order) => {
      this.cycleValidations.push(order);
      this.cycleValidations = [...new Set(this.cycleValidations)];
    });
    this.bus.$on("savedCycle", () => {
      this.cycleSaves++;
      if (this.cycleSaves === this.cycles.length) this.finishSave();
    });
    this.bus.$on("errorCycle", () => {
      this.connectError = true;
    });
    if (this.$route.params.id) {
      try {
        this.routineId = this.$route.params.id;
        let apiAns = await useSaveRoutine().getRoutine(this.routineId);
        this.name = apiAns.name;
        this.detail = apiAns.detail;
        this.difficultySelected = difficultyApiNames.indexOf(apiAns.difficulty);
        this.categorySelected = apiAns.category.id - 1;
        apiAns = await useCycles().getCyclesFromRoutine(this.routineId);
        this.cycles = apiAns.map((cycle, index) => ({
          ...cycle,
          "cycle-type": cycle.type,
          internalId: index
        }));
        this.cycles.sort((a, b) => a.order - b.order);
        this.maxId = this.cycles.length;
      } catch (e) {
        this.loadingDialogState = "notFound";
      }
    } else {
      this.cycles = this.cycles.concat(
        { "cycle-type": CycleTypes.WARMUP, order: 1, id: null, internalId: 0 },
        {
          "cycle-type": CycleTypes.EXERCISE,
          order: 2,
          id: null,
          internalId: 1
        },
        { "cycle-type": CycleTypes.COOLDOWN, order: 3, id: null, internalId: 2 }
      );
      this.maxId = 3;
    }
    if (this.loadingDialogState === "loading") {
      this.loadingDialogState = "ok";
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
    setButtonLoading(value) {
      this.saveButtonLoading = value;
    },
    showExitDialog() {
      this.exitDialog = true;
    },
    trySaveRoutine() {
      this.cycleValidations = [];
      this.bus.$emit("validate");
      this.setButtonLoading(true);
      setTimeout(() => {
        if (this.cycleValidations.length === this.cycles.length && this.valid) {
          this.saveRoutine();
        } else {
          this.snackbar = true;
          this.setButtonLoading(false);
        }
      }, 1000);
    },
    async saveRoutine() {
      const routineBody = {
        name: this.name,
        detail: this.detail,
        isPublic: true,
        difficulty: difficultyApiNames[this.difficultySelected],
        metadata: null,
        category: {
          id: this.categorySelected + 1
        }
      };
      try {
        if (this.edit) {
          await useSaveRoutine().modifyRoutine(this.routineId, routineBody);
          await useCycles().cleanCyclesFromRoutine(this.routineId);
        } else {
          const res = await useSaveRoutine().createRoutine(routineBody);
          if (res) this.routineId = res;
        }
        this.cycleSaves = 0;
        this.bus.$emit("saveCycle", this.routineId);
      } catch (err) {
        this.connectError = true;
      }
      this.setButtonLoading(false);
    },
    finishSave() {
      this.saveSnackbar = true;
      this.setButtonLoading(false);
    }
  },
};
</script>

<template>
  <div>
    <v-container
      v-if="
        loadingDialogState !== 'loading' && loadingDialogState !== 'notFound'
      "
      fluid
      class="d-flex flex-column justify-start"
    >
      <div class="d-flex flex-row align-center">
        <div class="d-flex flex-row justify-start align-center">
          <GoBackButton :on-click-function="showExitDialog" />
          <h1 class="pl-4">{{ edit ? "Editar" : "Crear" }} una Rutina</h1>
        </div>
        <div class="d-flex flex-row mr-8 ml-auto">
          <v-btn
            color="accent"
            class="rounded-pill mr-4"
            @click="showExitDialog()"
          >
            <v-icon left>mdi-close</v-icon>
            Descartar {{ edit ? " Cambios" : " Rutina" }}
          </v-btn>
          <v-btn
            color="primary"
            class="rounded-pill"
            @click="trySaveRoutine()"
            :loading="saveButtonLoading"
          >
            <v-icon left>mdi-content-save</v-icon>
            Guardar {{ edit ? " Cambios" : " Rutina" }}
          </v-btn>
        </div>
      </div>
      <div class="ml-16 d-flex flex-row justify-space-between">
        <div class="d-flex flex-column justify-start pt-4" style="width: 40%">
          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              label="Nombre de la Rutina"
              dense
              outlined
              class="rounded-lg"
              :rules="[rules.required, rules.maxLength(100)]"
            />
          </v-form>
          <v-textarea
            v-model="detail"
            label="Descripción de la Rutina"
            dense
            outlined
            class="rounded-lg"
            :rules="[rules.maxLength(200)]"
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
              <v-chip
                v-for="index in difficulty.length"
                :key="index"
                class="pa-5"
              >{{ difficulty[index - 1] }}
              </v-chip>
            </v-chip-group>
          </div>
          <div class="d-flex flex-row justify-end align-center mr-8">
            <h4 class="mr-4">Categoría:</h4>
            <v-chip-group
              v-model="categorySelected"
              mandatory
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
      <div class="d-flex flex-column align-start ma-6" style="width: 780px">
        <v-container
          fluid
          class="primary font-weight-bold mb-6 rounded-pill white--text pl-8"
        >
          <h2>Inicio</h2>
        </v-container>
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
            class="mb-7 mt-5 rounded-pill"
            color="primary"
          >
            <v-icon>mdi-plus</v-icon>
            Agregar ciclo
          </v-btn>
          <div v-else class="mt-4"></div>
        </div>
        <v-container
          fluid
          class="primary font-weight-bold rounded-pill white--text pl-8"
        >
          <h2>Fin</h2>
        </v-container>
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
      </div>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="4000" color="red">
      Error, existen campos incorrectos!
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="connectError" :timeout="3000" color="red">
      Error en el servicio de rutinas, estamos trabajando en eso!
    </v-snackbar>
    <v-snackbar v-model="saveSnackbar" color="green">
      Rutina guardada con éxito!
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="saveSnackbar = false">
          Seguir Editando
        </v-btn>
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="
            saveSnackbar = false;
            $router.back();
          "
        >
          Salir
        </v-btn>
      </template>
    </v-snackbar>
    <DeleteConfirmationDialog
      :dialog="exitDialog"
      title="¿Está seguro que desea salir?"
      body-text="Se perderán todos los cambios no guardados."
      agree-button-text="Sí"
      disagree-button-text="No"
      v-on:agree="
        exitDialog = false;
        $router.back();
      "
      v-on:disagree="exitDialog = false"
    />
    <LoadingFetchDialog
      :dialog-state="loadingDialogState"
      loading-text="Por favor, espere..."
      not-found-text="¡Oops! La rutina no se ha encontrado."
      ok-not-found-button-text="OK"
      v-on:oknotfound="$router.back()"
    />
  </div>
</template>

<style scoped></style>
