<template>
  <v-text-field
    :label="title"
    :v-model="model"
    outlined
    class="rounded-lg"
    prepend-inner-icon="mdi-magnify"
  >
  </v-text-field>
</template>

<script>
export default {
  name: "SearchBar.vue",
  props: {
    title: String,
    model: String,
  },
};
</script>

<style scoped></style>
