<template>
  <v-main>
    <div class="d-flex flex-row justify-space-between mb-8">
      <div class="d-flex flex-row mx-8">
        <div class="d-flex flex-column justify-start">
          <GoBackButton />
        </div>
        <v-img
          class="mx-8 rounded-circle"
          :src="temp"
          height="150px"
          width="150px"
        />
        <div class="d-flex flex-column justify-center">
          <div class="d-flex flex-row justify-start align-baseline">
            <h1 class="mr-4">Arnold Schwarzenegger</h1>
            <h4>75 años</h4>
          </div>
          <h4>
            Body builder, philanthropist, playboy, ex-governor of California
          </h4>
          <v-btn outlined class="mt-2 rounded-pill" max-width="200px">
            Seguir
          </v-btn>
        </div>
      </div>
      <div class="mx-16">
        <v-btn outlined class="rounded-pill">
          <v-icon class="mr-1">mdi-pencil</v-icon>
          <span>Editar Perfil</span>
        </v-btn>
      </div>
    </div>
    <div class="">
      <RoutineSlideGroup
        title="Rutinas Creadas por Arnold"
        size-variant="small"
        :routines="routines"
      />
    </div>
    <div class="">
      <RoutineSlideGroup
        title="Rutinas Favoritas de Arnold"
        size-variant="small"
        :routines="routines"
      />
    </div>
  </v-main>
</template>

<script>
import temp from "../assets/arnold.png";
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
import GoBackButton from "../components/GoBackButton.vue";

export default {
  components: {
    GoBackButton,
    RoutineSlideGroup,
  },
  data() {
    return {
      temp,
      routines: [
        {
          title: "Abdominales en 15 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          title: "Abdominales en 30 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          title: "Abdominales en 45 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          title: "Abdominales en 30 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          title: "Abdominales en 45 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          title: "Abdominales en 30 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          title: "Abdominales en 45 minutos!",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
      ],
    };
  },
};
</script>
