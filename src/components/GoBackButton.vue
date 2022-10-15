<template>
  <div>
    <v-btn icon @click="onClickFunction? onClickFunction() : goBack()">
      <v-icon large>mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "GoBackButton.vue",
  props: {
    onClickFunction: {
      type: Function,
      default: null
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped></style>
