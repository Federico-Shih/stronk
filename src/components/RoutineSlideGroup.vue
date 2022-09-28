<template>
  <v-slide-group>
    <v-slide-item
        v-for="n in 15"
        :key="n"
    >
      <RoutineButton variant="small" title="Abdominales en 15 minutos!" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import RoutineButton from "@/components/RoutineButton.vue";

export default {
  name: "RoutineSlideGroup.vue",
  components: {
    RoutineButton
  }
}
</script>

<style scoped>

</style>