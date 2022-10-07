<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column">
      <h3 class="font-weight-medium text-decoration-none">
        {{ value.name }}
      </h3>
      <div>
        <v-text-field v-model="value.duration"></v-text-field>
      </div>
    </div>

    <v-img
        class="flex-grow-0 ml-auto"
        width="80px"
        :src="value.img_url"
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