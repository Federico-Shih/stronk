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
        <h1 class="pl-4">Nombre del Ejercicio</h1>
      </div>

      <div class="mr-16 alignmentToTheRight">
        <v-btn outlined class="rounded-pill">
          <v-icon left>mdi-pencil</v-icon>
          Editar Ejercicio
        </v-btn>
      </div>
    </div>

    <div class="ml-6 mb-4 d-flex flex-row">
      <div class="d-flex flex-row justify-self-start">
        <v-btn icon class="mx-4">
          <v-img
            class="rounded-circle"
            :src="temp"
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
          :src="img"
          class="mr-4 mb-4 flex-grow-0"
          style="width: 150px"
        >
        </v-img>
      </div>
    </div>
    <div class="d-flex flex-column ml-8 mb-8">
      <h2 class="mb-2">Videos demostrativos</h2>
<!--      <div v-for="url in videos" class="align-self-center mb-8" >-->
<!--      <iframe-->
<!--              width="560"-->
<!--              height="315"-->
<!--              :src="loadURL(url)"-->
<!--              frameborder="0"-->
<!--              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"-->
<!--              allowfullscreen/>-->
<!--      </div>-->
    </div>
  </div>

</template>

<script>
import temp from "../assets/arnold.png";
import GoBackButton from "../components/GoBackButton.vue";

export default {
  components: {
   GoBackButton,
  },
  mounted() {
    this.$route.params.id;
  },
  data() {
    return {
      temp,
      creatorname: "Arnold Schwarzenegger",
      description:
        "Esta es la descripcion Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a nibh vitae nisi tincidunt vulputate vel nec risus. Fusce placerat sagittis nisl, quis ultricies quam scelerisque a. Nulla laoreet tellus a turpis hendrerit posuere. Curabitur in ante velit. Mauris eu dolor tortor. Curabitur nisl velit, tincidunt non orci id, rutrum sodales metus. Fusce vitae libero aliquet lorem mollis vestibulum nec non odio. Fusce placerat egestas dui at venenatis. Aliquam aliquet orci elit, ut aliquet justo mattis et. Curabitur vitae iaculis neque, ac eleifend nibh. Nam volutpat tortor sed leo sollicitudin, eget semper quam ultricies",
      type:'Ejercicio',
      images: [temp, temp, temp, temp, temp, temp, temp],
      videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ','https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    };
  },
  methods: {
    loadURL(youtubeURL) {
      const youtubeEmbedTemplate = 'https://www.youtube-nocookie.com/embed/'
      const url = youtubeURL.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      // console.log("url", url)
      const YId = undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0]
      // console.log("YId", YId)
      // if (YId === url[0]) {
      //   console.log("not a youtube link")
      // } else {
      //   console.log("it's  a youtube video")
      // }
      const topOfQueue = youtubeEmbedTemplate.concat(YId)
      console.log("topOfQueue", topOfQueue)
      return topOfQueue;
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
