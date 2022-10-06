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
              <EditExercise></EditExercise>
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
export const CycleTypes = {
  WARMUP: "warmup",
  EXERCISE: "exercise",
  COOLDOWN: "cooldown"
};

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
      required: true
    }
  },
  data: () => ({
    cycleName: 'Nuevo Ciclo',
    cycleType: CycleTypes.EXERCISE,
    cycleDetails: '',
    exercises: [],
    cycleRepetitions: 1,
  }),
  methods: {
    newExercise() {
      this.exercises.push({id: 0})
    }
  }
}
</script>

<style scoped>

</style>