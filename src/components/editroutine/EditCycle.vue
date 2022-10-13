<template>
  <v-form v-model="valid">
    <v-card outlined class="d-flex flex-row">
      <div
        style="border: 6px solid; width: 136px"
        :style="{ borderColor: this.$vuetify.theme.themes.light.primary }"
        class="text-h5 pa-3 ml-6 my-5 d-flex flex-column justify-end rounded-xl"
      >
        <div style="width: 100px">
          <v-text-field
            outlined
            class=""
            suffix="reps."
            v-model="cycleRepetitions"
            type="number"
            :rules="[rules.required, rules.moreThan(0), rules.lessThan(1000)]"
          />
        </div>
      </div>
      <div style="padding-bottom: 40px; min-width: 600px" class="ml-5">
        <div class="d-flex flex-row justify-space-between align-baseline">
          <v-text-field
              v-if="cycleType === CycleTypes.EXERCISE"
              outlined
              dense
              class="mt-4"
              label="Nombre del ciclo"
              v-model="cycleName"
              :rules="[rules.required]"
          />
          <h3 v-else class="mt-4">{{ cycleName }}</h3>
          <v-btn class="mx-2" icon
                 :disabled="this.cycleType !== CycleTypes.EXERCISE || this.order === 2"
                 @click="deleteDialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex flex-row justify-center">
            <v-btn icon @click="addExercise(0)">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-divider></v-divider>
          <div
            v-for="(exercise, index) in exercises"
            :key="index"
            class="mt-3 d-flex flex-column"
          >
            <v-icon
              style="position: absolute; transform: translate(-54px)"
              color="primary"
              size="30"
            >mdi-circle
            </v-icon>
            <EditExercise
              :index="index"
              :last="index === exercises.length - 1"
              :type="exercise.type"
              :name="exercise.name"
              :img_url="exercise.img_url"
              :duration="exercise.duration"
              :repetitions="exercise.repetitions"
              :cycle-order="order"
              :bus="bus"
              @update:duration="
                (valor) => {
                  updateDuration(valor, index);
                }
              "
              @update:repetitions="
                (valor) => {
                  updateRepetitions(valor, index);
                }
              "
              v-on:moveup="moveUp(index)"
              v-on:movedown="moveDown(index)"
              v-on:remove="remove(index)"
            ></EditExercise>
            <v-divider class="mt-3"></v-divider>
            <div class="d-flex flex-row justify-center">
              <v-btn icon @click="addExercise(index + 1)">
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </div>
            <v-divider
              v-if="index !== exercises.length - 1"
              class="mt-3"
            ></v-divider>
          </div>
        </v-card-text>
      </div>
      <ExercisePopup :used-exercises="this.exercises" v-if="showPopup" @ex-sumbit="sumbitEx" />
      <DeleteConfirmationDialog
          :dialog="deleteDialog"
          title="¿Está seguro que desea eliminar el ciclo?"
          body-text="Se eliminará de forma permanente junto con sus ejercicios."
          agree-button-text="Sí"
          disagree-button-text="No"
          v-on:agree="deleteDialog = false; removeCycle();"
          v-on:disagree="deleteDialog = false"
      />
    </v-card>
  </v-form>
</template>

<script>
import EditExercise from "@/components/editroutine/EditExercise.vue";
import { CycleTypes } from "@/stores/routine";
import ExercisePopup from "@/components/ExercisePopup.vue";
import { mapActions } from "pinia";
import { useExPopupStore } from "@/stores/expopup";
import { useCycles } from "../../stores/routine";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";

export default {
  name: "EditCycle",
  components: {DeleteConfirmationDialog, ExercisePopup, EditExercise },
  props: {
    order: {
      type: Number,
      required: true
    },
    routineId: {
      type: Number
    },
    bus: {
      type: Object,
      required: true
    },
    cycleType: {
      type: String,
      default: CycleTypes.EXERCISE
    },
    cycleId: {
      type: Number,
      default: null
    }
  },
  async mounted() {
    if (this.cycleType === CycleTypes.WARMUP) {
      this.cycleName = "Ciclo de Entrada en Calor";
    } else if (this.cycleType === CycleTypes.COOLDOWN) {
      this.cycleName = "Ciclo de Enfriamiento";
    }
    if (this.cycleId !== undefined && this.cycleId !== null) {
      let cycle = await useCycles().getCycleWithExercises(this.routineId, this.cycleId);
      this.cycleName = cycle.name;
      cycle.exercises.sort((a,b) => a.order-b.order).forEach((ex) => {
        this.exercises.push({
          id: ex['exercise'].id,
          name: ex['exercise'].name,
          duration: ex.duration,
          img_url: ex.img_url,
          repetitions: ex.repetitions,
          type: ex.duration === 999 ? "Repeticiones" : ex.repetitions === 999 ? "Tiempo" : "Ambos",
        });
      })
      this.cycleRepetitions = cycle.repetitions;
    }
  },
  created() {
    this.bus.$on('saveCycle', this.saveCycle);
    this.bus.$on('validate', this.validateSelf);
    this.bus.$on('validatedEx', this.validateEx);
  },
  data: () => ({
    cycleName: "Nuevo Ciclo",
    showPopup: false,
    exercises: [],
    cycleRepetitions: 1,
    CycleTypes,
    valid: true,
    exercisesValidations: 0,
    deleteDialog: false,
    rules: {
      required: value => !!value || 'Requerido',
      moreThan(n){ return value => value > n || `Mayor a ${n}` },
      lessThan(n){ return value => value < n || `Menor a ${n}` },
    }
  }),
  methods: {
    ...mapActions(useExPopupStore, ["showExPopup"]),
    validateSelf() {
      if(this.exercises.length === 0 && this.valid) {
        console.log(`Validating cycle ${this.order}`);
        this.bus.$emit('validatedCycle');
      }
    },
    validateEx(order) {
      if (order === this.order && this.valid) {
        if(++this.exercisesValidations === this.exercises.length) {
          this.exercisesValidations = 0;
          this.bus.$emit('validatedCycle');
        }
      }
    },
    sumbitEx(ExerciseSelected, ExerciseType, index) {
      this.exercises.splice(index, 0, {
        id: ExerciseSelected.id,
        type: ExerciseType,
        name: ExerciseSelected.name,
        duration: ExerciseType === "Repeticiones" ? 999 : 1,
        repetitions: ExerciseType === "Tiempo" ? 999 : 1
      });
      this.showPopup = false;
    },
    updateDuration(value, index) {
      this.exercises[index].duration = value;
    },
    updateRepetitions(value, index) {
      this.exercises[index].repetitions = value;
    },
    moveUp(index) {
      if (index !== 0) {
        const aux = this.exercises[index];
        this.exercises[index] = this.exercises[index - 1];
        this.exercises[index - 1] = aux;
        this.exercises = [...this.exercises];
      }
    },
    moveDown(index) {
      if (index !== this.exercises.length - 1) {
        const aux = this.exercises[index];
        this.exercises[index] = this.exercises[index + 1];
        this.exercises[index + 1] = aux;
        this.exercises = [...this.exercises];
      }
    },
    remove(index) {
      for (let i = index; i < this.exercises.length - 1; i++) {
        this.exercises[i] = this.exercises[i + 1];
      }
      this.exercises.splice(this.exercises.length - 1, 1);
    },
    addExercise(index) {
      this.showPopup = true;
      this.showExPopup(index);
    },
    async saveCycle(routine_id) {
      let exercisesArray = [];
      let i = 1;
      for(let ex of this.exercises)
      {
        exercisesArray.push({
          id: ex.id,
          body: {
            order: i++,
            duration: parseInt(ex.duration),
            repetitions: parseInt(ex.repetitions),
          }
        });
      }

      await useCycles().postCycle(routine_id,
          {
        name: this.cycleName,
        detail: '',
        type: this.cycleType,
        order: this.order,
        repetitions: parseInt(this.cycleRepetitions),
        metadata: null
      },
          exercisesArray);
      this.bus.$emit('savedCycle');
    },
    removeCycle() {
      this.bus.$emit('removeCycle', this.order);
      this.bus.$off('saveCycle', this.saveCycle);
      this.bus.$off('validate', this.validateSelf);
      this.bus.$off('validatedEx', this.validateEx);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style scoped></style>
