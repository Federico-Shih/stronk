<template>
  <v-card class="routine-button rounded-lg">
    <v-img :src="image" :alt="title">
      <div class="fill-height bottom-gradient d-flex flex-column justify-end">
        <v-card-title class="routine-button-text">{{ title }}</v-card-title>
      </div>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "RoutineButton",
  props: {
    variant: String,
    title: String,
    image: String,
    routineId: String,
  },
};
</script>

<style scoped>
.routine-button {
  position: relative;
  width: 200px;
  margin: 10px 5px;
}
.routine-button-text {
  padding: 0.5em 1em;
  color: white;
  font-size: 0.8em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
}
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 72px
  );
}
</style>
