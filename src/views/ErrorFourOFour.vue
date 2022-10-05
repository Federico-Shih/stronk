<template>
  <div class="d-flex flex-column align-to-center">
    <h1 class="mt-8">Lo siento...</h1>
    <h2>No hemos podido encontrar la página buscada</h2>
    <img :src="imagen404" alt="Not Found" />
  </div>
</template>

<script>
import cansancio from "../assets/cansancio2.jpg";
export default {
  name: "ErrorFourOFour.vue",
  data() {
    return {
      imagen404: cansancio,
    }
  }
};
</script>

<style scoped>
.align-to-center {
  align-items: center;
}
</style>
