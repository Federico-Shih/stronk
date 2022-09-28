<template>
    <v-main>
      <div class="page-title">
          <h1 class="mb-1">Explorar Nuevas Rutinas</h1>
          <v-text-field
              label="Busca una rutina en particular..."
              outlined
              class="rounded-lg"
              prepend-inner-icon="mdi-magnify"
          >
          </v-text-field>
        </div>
      <div class="">
       <RoutineSlideGroup title="Rutinas Populares" size-variant="large" :routines="routines" />
      </div>
      <div class="" >
        <RoutineSlideGroup title="Otras Rutinas de la Comunidad" size-variant="long" :routines="routines" />
      </div>
      <div class="">
        <RoutineSlideGroup title="Últimas Rutinas de Quienes Sigo" size-variant="small" :routines="routines" />
      </div>
    </v-main>
</template>



<script>
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
export default {
  components: {
    RoutineSlideGroup
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  data() {
      return {
        routines: [
          {
            title: "Abdominales en 15 minutos!",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "Abdominales en 30 minutos!",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "Abdominales en 45 minutos!",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "Abdominales en 30 minutos!",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "Abdominales en 45 minutos!",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
        ]
      };

  },
};
</script>

<style>
.page-title {
  margin: 0 2em;
}
</style>
