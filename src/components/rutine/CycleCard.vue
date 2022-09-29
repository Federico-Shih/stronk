<script>
class Exercise {
  constructor(id, title, img_url, reps, duration) {
    this.id = id;
    this.title = title;
    this.img_url = img_url;
    this.reps = reps;
    this.duration = duration;
  }
}

export default {
  props: {
    title: String,
    repetitions: Number,
    exercises: Array,
  },
  name: "CycleCard",
};
</script>
<template>
  <v-card>
    <v-card-title>{{ this.title }}</v-card-title>
    <div v-for="exercise in exercises" :key="exercise.id">
      <div>
        {{ exercise.title }}
      </div>
      <div><v-img width="200" :src="exercise.img_url"></v-img></div>
    </div>
  </v-card>
</template>
