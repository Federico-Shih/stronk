<template>
  <div class="d-flex flex-column justify-start px-4 py-8">
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
            :disabled="loading"
            outlined
            class="rounded-pill"
            @click="submitExercise"
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
        <div class="d-flex flex-column justify-start">
          <div class="d-flex flex-row align-center mr-8">
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
                    <span
                      style="
                        width: 300px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                      "
                      >{{ img }}</span
                    >
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
        </div>
      </div>
    </v-form>
    <div class="d-flex justify-center">
      <v-progress-circular
        v-show="loading"
        indeterminate
        color="primary"
        :size="100"
      />
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      El ejercicio se ha {{edit? 'guardado':'creado'}} correctamente
      <template v-slot:action="{ attrs }">
        <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="
            snackbar = false;
            timeout = 2000;
          "
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import GoBackButton from "../components/GoBackButton.vue";
import { useExerciseStore } from "../stores/exercise";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "../stores/profile";

export default {
  components: {
    GoBackButton,
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
      loading: false,
      snackbar:false,
      timeout:3000,
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
      let found=false;
      this.images = this.images.filter((value) => {
        if (value === img && !found) {
          found=true;
          return false;
        }
        return true;
      });
    },
    removeVideo(vid) {
      let found=false;
      this.videos = this.videos.filter((value) => {
        if (value === vid && !found) {
          found=true;
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
        this.loading = true;
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
        this.loading = false;
        this.snackbar=true;
        setTimeout(() => {
          this.$router.push({ name: "exercises" });
        }, 3000);
      }
    },
  },
  async created() {
    if (this.edit) {
      const exercise = await this.getExerciseById(this.exId);
      this.name = exercise.name;
      this.description = exercise.detail;
      this.typeSelected = exercise.type === "exercise" ? 0 : 1;
      this.images = exercise.images.map((img) => img.url);
      this.videos = exercise.videos.map((vid) => vid.url);
    }
  },
};
</script>
