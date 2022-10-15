<template>
  <v-container fluid class="d-flex flex-column justify-start">
    <v-form @submit.prevent="submitExercise" ref="form" v-model="valid">
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex flex-row justify-start align-center">
          <GoBackButton />
          <h1 class="pl-4">{{ edit ? "Editar" : "Crear" }} un Ejercicio</h1>
        </div>
        <div class="d-flex flex-row mr-8">
          <v-btn outlined class="rounded-pill mr-4" @click="$router.back()">
            <v-icon left>mdi-close</v-icon>
            Descartar {{ edit ? " Cambios" : " Ejercicio" }}
          </v-btn>
          <v-btn
            :disabled="!valid"
            outlined
            class="rounded-pill"
            @click="submitExercise"
            :loading="savingExerciseButton"
          >
            <v-icon left>mdi-content-save</v-icon>
            Guardar {{ edit ? " Cambios" : " Ejercicio" }}
          </v-btn>
        </div>
      </div>
      <div class="ml-16 d-flex flex-row justify-space-between">
        <div class="d-flex flex-column justify-start pt-4" style="width: 40%">
          <v-text-field
            v-model="name"
            label="Nombre del Ejercicio"
            dense
            outlined
            class="rounded-lg"
            :rules="notEmptyRules"
          />
          <v-textarea
            v-model="description"
            label="Descripción del Ejercicio"
            dense
            outlined
            class="rounded-lg"
          />
          <v-text-field
            v-model="imageurl"
            label="Escriba el URL de la imagen"
            dense
            outlined
            class="rounded-lg"
            @keypress.native.enter="loadImage()"
          ></v-text-field>
          <v-text-field
            v-model="videourl"
            label="Escriba un URL del video de Youtube"
            dense
            outlined
            class="rounded-lg"
            @keypress.native.enter="loadVideo()"
          ></v-text-field>
        </div>
        <div class="d-flex flex-column justify-start mr-10">
          <div class="d-flex flex-row align-center justify-end">
            <h4 class="mr-4">Tipo de Actividad:</h4>
            <v-chip-group
              v-model="typeSelected"
              mandatory
              column
              active-class="primary--text"
            >
              <v-chip v-for="index in type.length" :key="index" class="pa-5"
              >{{ type[index - 1] }}
              </v-chip>
            </v-chip-group>
          </div>
          <v-container style="width: 600px">
            <v-simple-table v-if="images.length > 0">
              <template v-slot:default>
                <thead class="mb-2">
                <tr>
                  <th class="text-left">Imagenes agregadas</th>
                  <th class="text-left">Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(img, index) in images" :key="index">
                  <td>
                    <div
                      style="
                          width: 300px;
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                        "
                    >
                      {{ img }}
                    </div>
                  </td>
                  <td>
                    <v-btn icon @click="removeImage(img)">
                      <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-simple-table v-if="videos.length > 0">
              <template v-slot:default>
                <thead class="mb-2">
                <tr>
                  <th class="text-left">Videos agregados</th>
                  <th class="text-left">Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(vid, index) in videos" :key="index">
                  <td>
                      <span
                        style="
                          width: 300px;
                          text-overflow: ellipsis;
                          overflow: hidden;
                        "
                      >{{ vid }}</span
                      >
                  </td>
                  <td>
                    <v-btn icon @click="removeVideo(vid)">
                      <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
        </div>
      </div>
    </v-form>
    <v-snackbar v-model="saveSnackbar" color="green">
      Ejercicio guardada con éxito!
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="saveSnackbar = false">
          Seguir Editando
        </v-btn>
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="
            saveSnackbar = false;
            $router.back();
          "
        >
          Salir
        </v-btn>
      </template>
    </v-snackbar>
    <LoadingFetchDialog
      :dialog-state="loadingDialogState"
      loading-text="Por favor, espere..."
      not-found-text="¡Oops! El ejercicio no se ha encontrado."
      ok-not-found-button-text="OK"
      v-on:oknotfound="$router.back()"
    />
  </v-container>
</template>

<script>
import GoBackButton from "../components/GoBackButton.vue";
import { useExerciseStore } from "../stores/exercise";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "../stores/profile";
import LoadingFetchDialog from "../components/LoadingFetchDialog.vue";
export default {
  components: {
    GoBackButton,
    LoadingFetchDialog,
  },

  data() {
    return {
      name: "",
      valid: false,
      description: "",
      type: ["Ejercicio", "Descanso"],
      typeSelected: 0,
      imageurl: "",
      videourl: "",
      images: [],
      videos: [],
      notEmptyRules: [(v) => !!v || "Campo de nombre no puede quedar vacío"],
      savingExerciseButton: false,
      loadingDialogState: "loading",
      saveSnackbar: false,
      timeout: 2000
    };
  },
  computed: {
    edit: function () {
      return !!this.$route.params.id;
    },
    exId: function () {
      return this.$route.params.id ? parseInt(this.$route.params.id) : 0;
    },
    ...mapState(useProfileStore, ["getId"]),
  },
  methods: {
    ...mapActions(useExerciseStore, [
      "getExerciseById",
      "saveExercise",
      "putExercise",
    ]),
    loadImage() {
      if (this.imageurl !== "") {
        this.images.push(this.imageurl);
        this.imageurl = "";
      }
    },
    loadVideo() {
      if (this.videourl !== "") {
        this.videos.push(this.videourl);
        this.videourl = "";
      }
    },
    removeImage(img) {
      let found = false;
      this.images = this.images.filter((value) => {
        if (value === img && !found) {
          found = true;
          return false;
        }
        return true;
      });
    },
    removeVideo(vid) {
      let found = false;
      this.videos = this.videos.filter((value) => {
        if (value === vid && !found) {
          found = true;
          return false;
        }
      });
    },
    async submitExercise() {
      this.$refs.form.validate();

      if (this.valid) {
        let exercise = {
          name: this.name,
          detail: this.description,
          type: this.typeSelected === 0 ? "exercise" : "rest",
          metadata: { creatorid: this.getId },
        };
        this.savingExerciseButton = true;
        if (this.edit) {
          await this.saveExercise(
            exercise,
            this.images,
            this.videos,
            this.exId
          );
        } else {
          await this.putExercise(exercise, this.images, this.videos);
        }
        this.savingExerciseButton = false;
        this.saveSnackbar = true;
      }
    },
  },
  async created() {
    if (this.edit) {
      try {
        const exercise = await this.getExerciseById(this.exId);
        this.name = exercise.name;
        this.description = exercise.detail;
        this.typeSelected = exercise.type === "exercise" ? 0 : 1;
        this.images = exercise.images.map((img) => img.url);
        this.videos = exercise.videos.map((vid) => vid.url);
      } catch (e) {
        this.loadingDialogState = "notFound";
      }
    }
    if (this.loadingDialogState === "loading") {
      this.loadingDialogState = "ok";
    }
  },
};
</script>
