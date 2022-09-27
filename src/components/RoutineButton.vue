<template>
  <v-card>
    <v-img class="routineButton white--text align-end" :src="image" :alt="title">
      <v-card-title>{{ title }}</v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "RoutineButton",
  props: {
    title: String,
    image: String,
    routineId: String,
  },
};
</script>

<style scoped>
.routineButton {
  width: 200px;
  height: 100px;
  margin: 10px 5px;
}
</style>
