<template>
  <div>
    <div>
      <h1 class="page-title">¡Bienvenido a Stronk!</h1>
    </div>
    <div>
      <RoutineSlideGroup
        title="Últimas rutinas"
        size-variant="long"
        :routines="routines"
      />
      <RoutineSlideGroup
        title="Mis rutinas"
        size-variant="long"
        :routines="routines"
      />
      <RoutineSlideGroup
        title="Rutinas más populares"
        size-variant="long"
        :routines="routines"
      />
    </div>
  </div>
</template>

<script>
import RoutineSlideGroup from "@/components/RoutineSlideGroup.vue";

export default {
  components: {
    RoutineSlideGroup
  },
  data() {
    return {
      routines: [
        {
          name: "Abdominales en 15 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        },
        {
          name: "Abdominales en 30 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        },
        {
          name: "Abdominales en 45 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        },
        {
          name: "Abdominales en 30 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        },
        {
          name: "Abdominales en 45 minutos!",
          metadata:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        }
      ],
    };
  },
};
</script>

<style>
.page-title {
  margin: 0 1em;
}
</style>
