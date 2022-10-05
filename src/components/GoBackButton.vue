<template>
  <div>
    <v-btn icon @click="$router.back()">
      <v-icon large>mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "GoBackButton.vue",
};
</script>

<style scoped></style>
