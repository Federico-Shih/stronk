<template>
  <v-container fluid class="d-flex flex-column justify-start">
    <v-form @submit.prevent="submitExercise" ref="form" v-model="valid">
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex flex-row justify-start align-center">
          <GoBackButton />
          <h1 class="pl-4">{{ edit ? "Editar" : "Crear" }} un Ejercicio</h1>
        </div>
        <div class="d-flex flex-row mr-8">
          <v-btn color="secondary" class="rounded-pill mr-4" @click="discardDialog=true">
            <v-icon left>mdi-close</v-icon>
            Descartar {{ edit ? " Cambios" : " Ejercicio" }}
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
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
            :rules="[rules.notEmptyRule,rules.maxLenght(70)]"
          />
          <v-textarea
            v-model="description"
            label="Descripción del Ejercicio"
            dense
            outlined
            class="rounded-lg"
            validate-on-blur
            :rules="[rules.maxLenght(200)]"
          />
          <h2 class="mb-2">Agregue imagenes y videos demostrativos</h2>
          <v-form @submit.prevent="loadImage" ref="imgform" v-model="validImgUrl">
            <v-text-field
              v-model="imageurl"
              label="Ingrese el URL de la imagen"
              dense
              outlined
              class="rounded-lg"
              append-icon="mdi-send"
              :rules="[rules.maxLenght(255)]"
              validate-on-blur
              @click:append="loadImage()"
              @keypress.native.enter="loadImage()"
            ></v-text-field>
          </v-form>
          <v-form @submit.prevent="loadVideo" ref="vidform" v-model="validVidUrl">
            <v-text-field
              v-model="videourl"
              label="Ingrese el URL del video (Vimeo o Youtube)"
              dense
              outlined
              class="rounded-lg"
              append-icon="mdi-send"
              :rules="[rules.maxLenght(255)]"
              validate-on-blur
              @click:append="loadVideo()"
              @keypress.native.enter="loadVideo()"
            ></v-text-field>
          </v-form>
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
      Ejercicio guardado con éxito!
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
            $router.go(-1);
          "
        >
          Salir
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="red" :timeout="timeout">
      Ocurrio un error guardando el ejercicio.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false">
          Cerrar
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
    <DeleteConfirmationDialog
        :dialog="discardDialog"
        title="¿Está seguro que desea descartar el ejercicio?"
        body-text="Se perderán todos los cambios realizados."
        agree-button-text="Sí"
        disagree-button-text="No"
        v-on:agree="
        discardDialog = false;
        $router.back();
      "
        v-on:disagree="discardDialog = false"
    />
  </v-container>
</template>

<script>
import GoBackButton from "../components/GoBackButton.vue";
import { useExerciseStore } from "../stores/exercise";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "../stores/profile";
import LoadingFetchDialog from "../components/LoadingFetchDialog.vue";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog.vue";
export default {
  components: {
    GoBackButton,
    LoadingFetchDialog,
    DeleteConfirmationDialog,
  },

  data() {
    return {
      name: "",
      valid: false,
      validImgUrl: false,
      validVidUrl: false,
      description: "",
      type: ["Ejercicio", "Descanso"],
      typeSelected: 0,
      imageurl: "",
      videourl: "",
      images: [],
      videos: [],
      rules:{
        notEmptyRule: (v) => !!v || "Campo de nombre no puede quedar vacío",
        maxLenght(n) {return value => value.length < n || `Menor a ${n} caracteres`},
      },
      savingExerciseButton: false,
      loadingDialogState: "loading",
      saveSnackbar: false,
      timeout: 2000,
      discardDialog:false,
      error:false,
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
      this.$refs.imgform.validate();
      if(this.validImgUrl) {
        if (this.imageurl !== "") {
          this.images.push(this.imageurl);
          this.imageurl = "";
        }
      }
    },
    loadVideo() {
      this.$refs.vidform.validate();
      if (this.validVidUrl){
        if (this.videourl !== "") {
          this.videos.push(this.videourl);
          this.videourl = "";
        }
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
        try{
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
      }catch (e) {
        this.savingExerciseButton = false;
        this.error = true;
      }
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
