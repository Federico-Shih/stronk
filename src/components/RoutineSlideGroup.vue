<template>
  <div
    class="routine-slide-group-container"
    :style="{ background: $vuetify.theme.themes[theme].contback }"
  >
    <h2 class="routine-slide-group-title">{{ title }}</h2>
    <v-slide-group show-arrows="always">
      <v-slide-item v-for="(routine, idx) in routines" :key="idx">
        <RoutineButton
          :variant="sizeVariant"
          :title="routine.name"
          :routineId="routine.id"
          :category="routine.category.id"
        />
      </v-slide-item>
      <div class="align-to-center my-16 mx-6" v-if="routines.length === 0">
        <v-icon large left> mdi-clipboard-alert</v-icon>
        <span class="text-h6 font-weight-light align-self-center">
          {{ this.noRoutinesMessage }}
        </span>
      </div>
    </v-slide-group>
  </div>
</template>

<script>
import RoutineButton from "@/components/RoutineButton.vue";

export default {
  name: "RoutineSlideGroup.vue",
  components: {
    RoutineButton,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  props: {
    title: String,
    routines: Array,
    sizeVariant: String,
    noRoutinesMessage: {
      type: String,
      default: "No hay rutinas para mostrar",
    },
  },
};
</script>

<style scoped>
.routine-slide-group-title {
  margin-left: 2.5em;
}
.routine-slide-group-container {
  margin: 1em 0;
  padding-top: 0.5em;
}
</style>
