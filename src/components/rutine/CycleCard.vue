<script>
export default {
  props: {
    title: String,
    repetitions: Number,
    exercises: Array
  },
  name: "CycleCard"
};
</script>
<template>
  <v-card outlined>
    <div style="padding-left: 180px; padding-bottom: 40px">
      <v-card-title class="font-weight-bold text-h5"
      >{{ this.title }}
      </v-card-title>
      <v-card-text>
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
                      {{ exercise.title }}
                    </h3>
                    <div>
                      <span v-if="exercise.reps"
                      >{{ exercise.reps }} repeticiones
                        {{ exercise.duration ? "| " : "" }}</span
                      >
                      <span v-if="exercise.duration"
                      >{{ exercise.duration }}s</span
                      >
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
        height: 85%;
        border: 6px solid;
        width: 136px;
      "
      :style="{ borderColor: this.$vuetify.theme.themes.light.primary }"
      class="text-h5 pa-3 ml-6 mb-5 d-flex flex-column justify-end rounded-xl"
    >
      <div>
        <span class="font-weight-bold text-h4">{{ repetitions }}</span> reps.
      </div>
    </div>
  </v-card>
</template>

<style></style>
