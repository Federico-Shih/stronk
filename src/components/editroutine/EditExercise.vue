<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column">
      <h3 class="font-weight-bold text-decoration-none mb-2">
        {{ value.name }}
      </h3>
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex flex-row align-center">
          <v-img
              class="flex-grow-0 ml-auto mr-4"
              width="10em"
              height="7em"
              :src="value.img_url"
          ></v-img>
          <v-text-field class="mr-2" v-model="value.repetitions" outlined dense label="Repeticiones"/>
          <v-text-field v-model="value.duration" outlined dense label="Tiempo (segs)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditExercise",
  props: ['value'],
  methods: {
    handleInput (e) {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped>

</style>