<template>
  <div>
    <v-container fluid v-if="loadingDialogState !== 'loading' && loadingDialogState !== 'notFound'">
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex flex-row justify-start align-center">
          <GoBackButton />
          <h1 class="pl-4">{{ this.title }}</h1>
        </div>

        <div v-if="exerciseIsMine" class="mr-16">
          <v-btn
              color="primary"
              class="rounded-pill mr-4"
              @click="deleteDialog = true"
          >
            <v-icon left>mdi-delete</v-icon>
            Eliminar Ejercicio
          </v-btn>
          <v-btn
              color="primary"
              class="rounded-pill"
              @click="
            $router.push({ name: 'exercises_edit', params: { id: `${exId}` } })
          "
          >
            <v-icon left>mdi-pencil</v-icon>
            Editar Ejercicio
          </v-btn>
        </div>
      </div>
      <v-container fluid class="d-flex flex-column" style="gap: 2em">
        <div class="d-flex flex-row">
          <div class="d-flex flex-row justify-self-start">
            <v-btn
                icon
                class="mx-4"
                @click="
              $router.push({ name: 'profile_extern', params: { id: `${creatorid}` } })
            "
            >
              <v-img
                  class="rounded-circle"
                  :src="creatorimage"
                  :alt="this.temp"
                  height="50px"
                  width="50px"
              />
            </v-btn>
            <h3 class="mt-1">hecho por {{ creatorname }}</h3>
          </div>
          <div class="d-flex flex-row offset-1 justify-space-between">
            <h3 class="pr-4 mt-1">Tipo:</h3>
            <v-chip class="mr-2">{{ type }}</v-chip>
          </div>
        </div>
        <div class="d-flex flex-column" style="width: 70%">
          <h2 class="mb-2">Descripcion del Ejercicio</h2>
          <p>{{ description }}</p>
        </div>
        <div class="d-flex flex-column">
          <h2 class="mb-2">Imagenes demostrativas</h2>
          <div class="d-flex flex-wrap align-start" style="width: 80%">
            <v-img
                v-for="img in images"
                :src="img.url"
                :alt="img.url"
                :key="img.id"
                class="mr-4 mb-4 flex-grow-0"
                style="width: 150px"
            >
            </v-img>
          </div>
        </div>
        <div class="d-flex flex-column">
          <h2 class="mb-2">Videos demostrativos</h2>
          <div v-for="vid in videos" :key="vid.id" class="align-self-center mb-8">
            <iframe
                width="560"
                height="315"
                :src="loadURL(vid.url)"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
          </div>
        </div>
      </v-container>
    </v-container>
    <LoadingFetchDialog
        :dialog-state="loadingDialogState"
        loading-text="Por favor, espere..."
        not-found-text="¡Oops! El ejercicio no se ha encontrado."
        ok-not-found-button-text="OK"
        v-on:oknotfound="$router.back()"
    />
    <DeleteConfirmationDialog
        :dialog="deleteDialog"
        title="¿Está seguro que desea eliminar el ejercicio?"
        body-text="Se eliminará de forma permanente junto con su contenido."
        agree-button-text="Sí"
        disagree-button-text="No"
        v-on:agree="
        deleteDialog = false;
        deleteThisExercise();
      "
        v-on:disagree="deleteDialog = false"
    />
  </div>

</template>

<script>
import temp from "../assets/user-default.png";
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
  computed: {
    ...mapState(useProfileStore, ["getId"]),
    exerciseIsMine() {
      return this.creatorid === this.getId;
    }
  },
  data() {
    return {
      temp: temp,
      exId: null,
      description: null,
      type: null,
      images: null,
      videos: null,
      creatorid: null,
      creatorname: null,
      creatorimage: null,
      title: null,
      loadingDialogState: "loading",
      deleteDialog:false,
    };
  },
  methods: {
    ...mapActions(useExerciseStore, ["getExerciseById","deleteExercise"]),
    ...mapActions(useProfileStore, ["generateUser"]),
    loadURL(youtubeURL) {
      const youtubeEmbedTemplate = "https://www.youtube-nocookie.com/embed/";
      const vimeoEmbedTemplate = "https://player.vimeo.com/video/";
      const Yturl = youtubeURL.split(
        /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
      );
      const Vmurl = youtubeURL.split(/(video\/|vimeo\.com\/)/);
      //console.log("url", url)
      const YId =
        undefined !== Yturl[2]
          ? Yturl[2].split(/[^0-9a-z_/\\-]/i)[0]
          : Yturl[0];
      const VId =
        undefined !== Vmurl[2]
          ? Vmurl[2].split(/[^0-9a-z_/\\-]/i)[0]
          : Vmurl[0];
      let topOfQueue;
      if (YId === Yturl[0]) {
        //   console.log("not a youtube link")
        topOfQueue = vimeoEmbedTemplate.concat(VId);
      } else {
        // console.log("it's  a youtube video")
        topOfQueue = youtubeEmbedTemplate.concat(YId);
      }
      return topOfQueue;
    },
    async deleteThisExercise() {
      await this.deleteExercise(this.exId);
       await this.$router.replace(`/exercises`);
    }
  },
  async mounted() {
    this.exId = parseInt(this.$route.params.id);
    try {
      let exercise = await this.getExerciseById(this.exId);
      this.creatorid = exercise.metadata.creatorid;
      this.title = exercise.name;
      this.description = exercise.detail;
      this.type = exercise.type === "exercise" ? "Ejercicio" : "Descanso";
      this.images = exercise.images;
      this.videos = exercise.videos;
      console.log(`creatorid: ${this.creatorid}`);
      let creator = await this.generateUser(this.creatorid);
      this.creatorname = creator.username;
      this.creatorimage = creator.avatarUrl ? creator.avatarUrl : this.temp;
    } catch (e) {
      this.loadingDialogState = "notFound";
    }
    if (this.loadingDialogState === "loading") {
      this.loadingDialogState = "ok";
    }
  },
};
</script>

<style>
.alignmentToTheLeft {
  align-items: start;
  display: flex;
  flex-direction: row;
}

.alignmentToTheRight {
  align-items: end;
  display: flex;
  flex-direction: row;
}
</style>
