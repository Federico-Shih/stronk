<template>
  <v-main>
    <div class="d-flex flex-row justify-space-between mb-8">
        <v-card outlined class="mx-16 d-flex flex-column justify-space-around">
          <v-img class="ma-8 rounded-circle" :src="imageUrl" height="150px" width="150px"/>
          <div class="mx-4 d-flex flex-row justify-center">
            <v-btn class="mb-8" v-if="!changePhoto" color="primary" elevation="2" @click="changePhoto++">Cambiar foto</v-btn>
            <v-file-input v-if="changePhoto" prepend-icon="mdi-camera" v-model="image" type="file" class="input" label="Cargar Imagen" hint="Cambiar foto de perfil" outlined dense @change="onFileChange" />
          </div>
        </v-card>
        <v-card outlined class="d-flex flex-column justify-space-around pa-8">
          <div class="d-flex flex-row justify-start align-baseline">
            <h1 class="mr-4">Arnold Schwarzenegger</h1>
            <h4>75 años</h4>
          </div>
          <h4>Body builder, filtrantropist, playboy, ex-governor of California</h4>
        </v-card>
      <div class="d-flex flex-column justify-start mx-16">
        <v-btn outlined class="rounded-pill mb-4 d-flex flex-row justify-space-between">
          <v-icon class="mr-1">mdi-content-save</v-icon>
          <span>Guardar Cambios</span>
        </v-btn>
        <v-btn outlined class="rounded-pill mb-4 d-flex flex-row justify-space-between">
          <v-icon class="mr-1">mdi-close</v-icon>
          <span>Descartar Cambios</span>
        </v-btn>
      </div>
    </div>

  </v-main>
</template>

<script>
import temp from "../assets/arnold.png";
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
export default {
  components: {
    RoutineSlideGroup,
  },
  methods: {
    createImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    }
  },
  data() {
    return {
      changePhoto: false,
      image: undefined,
      imageUrl: '',
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
    }
  }
}
</script>