<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column">
      <h3 class="font-weight-medium text-decoration-none">
        {{ this.title }}
      </h3>
      <div>
        <span v-if="exercise.reps"
        >{{ this.repetitions }} repeticiones
          {{ this.duration ? "| " : "" }}</span
        >
        <span v-if="exercise.duration"
        >{{ this.duration }}s</span
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
</template>

<script>
export default {
  name: "EditExercise"
}
</script>

<style scoped>

</style>