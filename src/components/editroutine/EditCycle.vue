<template>
  <v-card outlined>
    <div style="padding-left: 180px; padding-bottom: 40px">
      <v-card-title class="font-weight-bold text-h5"
      >{{ this.cycleName }}
      </v-card-title>
      <v-card-text>
        <div v-for="(exercise, index) in this.exercises" :key="index" class="mt-3">
            <div>
              <v-icon
                  style="position: absolute; transform: translate(-54px)"
                  color="primary"
                  size="30"
              >mdi-circle
              </v-icon>
              <EditExercise v-model="exercises[index]"></EditExercise>
            </div>
          <v-divider
              v-if="index !== exercises.length - 1"
              class="mt-3"
          ></v-divider>
        </div>
      </v-card-text>
    </div>
    <div
        style="
        position: absolute;
        left: 0;
        bottom: 0;
        height: 85%;
        border: 6px solid;
        width: 136px;
      "
        :style="{ borderColor: this.$vuetify.theme.themes.light.primary }"
        class="text-h5 pa-3 ml-6 mb-5 d-flex flex-column justify-end rounded-xl"
    >
      <div>
        <span class="font-weight-bold text-h4">{{ this.cycleRepetitions }}</span> reps.
      </div>
    </div>
  </v-card>
</template>

<script>

import EditExercise from "@/components/editroutine/EditExercise.vue";
import {CycleTypes} from "@/stores/routine";

export default {
  name: "EditCycle",
  components: {EditExercise},
  props: {
    routineId: {
      type: Number,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    bus: {
      type: Object,
      required: true
    },
    cycleType: {
      type: CycleTypes,
      default: CycleTypes.EXERCISE
    },
    cycleId: {
      type: Number,
      default: null
    }
  },
  mounted() {
    if(this.cycleType === "warmup")
    {
      this.cycleName = 'Ciclo de Entrada en Calor';
    }
    else if(this.cycleType === "cooldown")
    {
      this.cycleName = 'Ciclo de Enfriamiento';
    }
    if(this.cycleId!=null)
    {
      let cycle = undefined; //= store.getCycle(this.cycleId)
      this.cycleName = cycle.name;
      this.cycleDetails = cycle.details;
      this.exercises = cycle.exercises; //o como sea para agarrar los ejs
      this.cycleRepetitions = cycle.repetitions;
    }
  },
  data: () => ({
    cycleName: 'Nuevo Ciclo',
    cycleDetails: '',
    exercises: [{
      name: 'Jumping Jacks',
      duration: 0,
      repetitions: 30
    },
      {
        name: 'Abdominales',
        duration: 60,
        repetitions: 15
      },
    ],
    cycleRepetitions: 1,
  }),
  methods: {
    chooseNewExercise() {
      //store.showpopup()
    },
    getNewExercise(exerciseId, exerciseType) {
      let exercise = undefined; //= store.getExercise(exerciseId);
      this.exercises.push({
        id: exerciseId,
        type: exerciseType,
        name: exercise.name,
        order: this.exercises.length,
        duration: 0,
        repetitions: 0
      });
    }
  }
}
</script>

<style scoped>

</style>