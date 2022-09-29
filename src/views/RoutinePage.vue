<script>
import abdominales from "../assets/abdominales.jpg";
import CycleCard from "../components/rutine/CycleCard.vue";
export default {
  mounted() {
    console.log(this.$route.params.id);
  },
  components: { CycleCard },
  data: () => ({
    img: abdominales,
  }),
};
</script>

<template>
  <div style="width: 500px">
    <CycleCard
      title="Hola"
      :exercises="[{ img_url: img, title: 'hola' }]"
    ></CycleCard>
  </div>
</template>
