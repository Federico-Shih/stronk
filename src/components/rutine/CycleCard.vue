<script>
import {useCycles} from "@/stores/routine";

export default {
  props: {
    cycleId: {
      type: Number,
      required: true
    },
    cycleName: {
      type: String,
      required: true
    },
    cycleRepetitions: {
      type: Number,
      required: true
    },
  },
  name: "CycleCard",
  data() {
    return {
      cycle: null,
      exercises: [],
      loading: true,
    };
  },
  async mounted() {
    if (this.cycleId !== undefined && this.cycleId !== null) {
      let exercises = await useCycles().getCycleExercises(this.cycleId);
      exercises.sort((a,b) => a.order-b.order).forEach((ex) => {
        this.exercises.push({
          id: ex['exercise'].id,
          name: ex['exercise'].name,
          duration: ex.duration,
          img_url: ex.img_url,
          repetitions: ex.repetitions,
          type: ex.duration === 999 ? "Repeticiones" : ex.repetitions === 999 ? "Tiempo" : "Ambos",
        });
      });
      this.loading = false;
    }
  }
};
</script>
<template>
  <div>
    <v-card outlined v-if="!loading">
      <div style="padding-left: 180px; padding-bottom: 40px">
        <v-card-title class="font-weight-bold"
        >{{ this.cycleName }}
        </v-card-title>
        <v-card-text>
          <h4 v-if="exercises.length === 0">No hay ejercicios para este ciclo</h4>
          <div v-for="(exercise, index) in exercises" :key="index" class="mt-3">
            <v-hover v-slot="{ hover }">
              <div>
                <v-icon
                    style="position: absolute; transform: translate(-54px)"
                    color="primary"
                    size="30"
                >mdi-circle
                </v-icon>
                <router-link :to="'/exercises/' + exercise.id">
                  <div
                      class="d-flex flex-row"
                      :style="{
                    transform: `scale(${hover ? 1.02 : 1})`,
                  }"
                  >
                    <div class="d-flex flex-column">
                      <h3 class="font-weight-medium text-decoration-none">
                        {{ exercise.name }}
                      </h3>
                      <div>
                      <span v-if="exercise.type !== 'Tiempo'">
                        {{ exercise.repetitions }} {{ exercise.repetitions === 1 ? 'repetición' : 'repeticiones' }}
                        {{ exercise.type !== 'Repeticiones' ? "| " : "" }}
                      </span>
                        <span v-if="exercise.type !== 'Repeticiones'">
                        {{ exercise.duration }} {{ exercise.duration === 1 ? "segundo" : "segundos" }}
                      </span>
                      </div>
                    </div>

                    <v-img
                        class="flex-grow-0 ml-auto"
                        width="80px"
                        :src="exercise.img_url"
                        @click.stop="
                      (event) => {
                        console.log(event);
                      }
                    "
                    ></v-img>
                  </div>
                </router-link>
              </div>
            </v-hover>
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
        top: 1em;
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
    <v-skeleton-loader
        v-else
        class="mx-auto my-2"
        type="card"
    ></v-skeleton-loader>
  </div>
</template>

<style></style>
