<template>
  <v-main>
    <div class="d-flex flex-row justify-space-between mb-8 px-10">
      <GoBackButton></GoBackButton>
      <v-card
        outlined
        width="100%"
        class="mx-16 pa-8 d-flex flex-column justify-space-around"
      >
        <div class="d-flex flex-row justify-start align-center mb-8">
          <v-img
            class="mx-8 rounded-circle"
            :src="imageUrl"
            height="150px"
            max-width="150px"
          />
          <v-btn
            v-if="!changePhoto"
            outlined
            @click="changePhoto++"
            class="rounded-pill mb-4"
          >
            <v-icon class="mr-2">mdi-image-edit</v-icon>
            <span>Cambiar Foto</span>
          </v-btn>
          <v-file-input
            v-if="changePhoto"
            prepend-icon="mdi-camera"
            v-model="image"
            type="file"
            class="input"
            label="Cargar Imagen"
            hint="Cambiar foto de perfil"
            outlined
            dense
            @change="onFileChange"
          />
        </div>
        <div class="d-flex flex-row">
          <v-text-field
            v-model="name"
            class="mr-8"
            outlined
            dense
            label="Nombres"
            prepend-icon="mdi-account"
            :rules="nameRules"
            counter="32"
          ></v-text-field>
          <v-text-field
            v-model="surname"
            outlined
            dense
            label="Apellidos"
            :rules="nameRules"
            counter="32"
          ></v-text-field>
        </div>
        <div class="">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Birthday date"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1900-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </div>
        <div>
          <v-textarea
            outlined
            dense
            prepend-icon="mdi-text-account"
            v-model="description"
            :rules="descriptionRules"
            counter="280"
            label="Descripción"
          >
          </v-textarea>
        </div>
        <div class="d-flex flex-row justify-end">
          <v-btn
            outlined
            class="rounded-pill mx-4 d-flex flex-row justify-space-between"
          >
            <v-icon class="mr-1">mdi-close</v-icon>
            <span>Descartar Cambios</span>
          </v-btn>
          <v-btn
            outlined
            class="rounded-pill mx-4 d-flex flex-row justify-space-between"
          >
            <v-icon class="mr-1">mdi-content-save</v-icon>
            <span>Guardar Cambios</span>
          </v-btn>
        </div>
      </v-card>
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
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
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
    },
  },
  data() {
    return {
      activePicker: null,
      name: "Arnold",
      surname: "Schwartzenegger",
      date: "1950-03-24",
      description:
        "Hola, soy Arnold. No se escribir mi apellido ni mi fecha de nacimiento así que puse cualquier banana!",
      menu: false,
      changePhoto: false,
      image: undefined,
      imageUrl: temp,
      nameRules: [(v) => v.length <= 32 || "Max 32 caracteres"],
      descriptionRules: [(v) => v.length <= 280 || "Max 280 caracteres"],
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
