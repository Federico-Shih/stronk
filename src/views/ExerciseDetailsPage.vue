<template>
  <div
    class="mt-4 d-flex flex-column"
    style="
       {
        width: 100%;
        height: 100%;
      }
    "
  >
    <div class="mb-2 ml-6 d-flex flex-row justify-space-between">
      <div class="d-flex flex-row justify-start">
        <GoBackButton/>
        <h1 class="pl-4">{{this.title}}</h1>
      </div>

      <div v-if="exerciseIsMine" class="mr-16 alignmentToTheRight">
        <router-link :to="{name: 'exercises_edit', params:{id: `${this.exId}` }  }" style="text-decoration: none;color: inherit">
          <v-btn outlined class="rounded-pill">
            <v-icon left>mdi-pencil</v-icon>
            Editar Ejercicio
          </v-btn>
        </router-link>
      </div>
    </div>

    <div class="ml-6 mb-4 d-flex flex-row">
      <div class="d-flex flex-row justify-self-start">
        <v-btn icon class="mx-4">
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
        <v-chip
          label
          class="mr-2"
        >{{ type }}
        </v-chip>
      </div>
    </div>
    <div class="d-flex flex-column ml-8 mb-8" style="width: 70%">
      <h2 class="mb-2">Descripcion del Ejercicio</h2>
      <p>{{ description }}</p>
    </div>
    <div class="d-flex flex-column ml-8 mb-8">
      <h2 class="mb-2">Imagenes demostrativas</h2>
      <div class="d-flex flex-wrap align-start" style="width: 80%">
        <v-img
          v-for="img in images"
          :src="img.url"
          :alt="img.url"
          :id="img.id"
          class="mr-4 mb-4 flex-grow-0"
          style="width: 150px"
        >
        </v-img>
      </div>
    </div>
    <div class="d-flex flex-column ml-8 mb-8">
      <h2 class="mb-2">Videos demostrativos</h2>
      <div v-for="vid in videos" :id="vid.id" class="align-self-center mb-8" >
      <iframe
              width="560"
              height="315"
              :src="loadURL(vid.url)"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen/>
      </div>
    </div>
    <LoadingFetchDialog
        :dialog-state="loadingDialogState"
        loading-text="Por favor, espere..."
        not-found-text="¡Oops! El ejercicio no se ha encontrado."
        ok-not-found-button-text="OK"
        v-on:oknotfound="$router.back()"
    />
  </div>

</template>

<script>
import temp from "../assets/arnold.png";
import GoBackButton from "../components/GoBackButton.vue";
import {useExerciseStore} from "../stores/exercise";
import {mapActions} from "pinia";
import {useProfileStore} from "../stores/profile";
import LoadingFetchDialog from "../components/LoadingFetchDialog.vue";
export default {
  components: {
   GoBackButton,
    LoadingFetchDialog,
  },
  computed: {
    ...mapState(useProfileStore,["getId"]),
  exerciseIsMine() {
    return this.creatorid === this.getId;
  },

  },
  data() {
    return {
      temp: temp,
      exId:null,
      description:null,
      type:null,
      images:null,
      videos:null,
      creatorid:null,
      creatorname:null,
      creatorimage:null,
      title:null,
      loadingDialogState: 'loading',
    };
  },
  methods: {
    ...mapActions(useExerciseStore, ["getExerciseById"]),
    ...mapActions(useProfileStore, ["generateUser"]),
    loadURL(youtubeURL) {
      const youtubeEmbedTemplate = 'https://www.youtube-nocookie.com/embed/';
      const vimeoEmbedTemplate = 'https://player.vimeo.com/video/';
      const Yturl = youtubeURL.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      const Vmurl = youtubeURL.split(/(video\/|vimeo\.com\/)/);
       //console.log("url", url)
      const YId = undefined !== Yturl[2] ? Yturl[2].split(/[^0-9a-z_/\\-]/i)[0] : Yturl[0];
      const VId= undefined !== Vmurl[2] ? Vmurl[2].split(/[^0-9a-z_/\\-]/i)[0] : Vmurl[0];
      let topOfQueue;
       if (YId === Yturl[0]) {
     //   console.log("not a youtube link")
         topOfQueue=vimeoEmbedTemplate.concat(VId);
      } else {
       // console.log("it's  a youtube video")
           topOfQueue = youtubeEmbedTemplate.concat(YId);
      }
      return topOfQueue;
    },
  },
  async mounted() {
    this.exId= parseInt(this.$route.params.id);
    try {
      let exercise = await this.getExerciseById(this.exId);
      this.creatorid = exercise.metadata.creatorid
      this.title = exercise.name;
      this.description = exercise.detail;
      this.type = (exercise.type === 'exercise') ? "Ejercicio" : "Descanso";
      this.images = exercise.images;
      this.videos = exercise.videos;
      console.log(`creatorid: ${this.creatorid}`);
      let creator = await this.generateUser(this.creatorid);
      this.creatorname = creator.username;
      this.creatorimage = creator.avatarUrl ? creator.avatarUrl : this.temp;
    } catch (e) {
      this.loadingDialogState = 'notFound';
    }
    if(this.loadingDialogState==='loading'){
      this.loadingDialogState = 'ok';
    }

  }

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
