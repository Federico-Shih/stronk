<template>
  <div class="mt-4" style="{width: 100%; height: 100%}">
    <div class="mb-2 ml-6 d-flex flex-row justify-space-between">

      <div class="d-flex flex-row justify-start ">
        <v-btn icon>
          <v-icon large>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="pl-4">Nombre del Ejercicio</h1>
      </div>

      <div class="mr-16 alignmentToTheRight">
        <v-btn outlined class="rounded-pill">
          <v-icon left>mdi-pencil</v-icon>
          Editar Ejercicio
        </v-btn>
      </div>

    </div>

    <div class="ml-6 mb-4 d-flex flex-row ">
      <div class="d-flex flex-row justify-self-start">
        <v-btn icon class="mx-4">
          <v-img class="rounded-circle" :src="temp" height="50px" width="50px"/>
        </v-btn>
        <h3 class="mt-1">hecho por {{ creatorname }}</h3>
      </div>
      <div class="d-flex flex-row offset-1 mr-6 mt-1 justify-space-between">
        <h3 class="pr-4">Categorias:</h3>
        <v-btn v-for="index in category.length" x-small class="rounded-l-pill mt-1 mr-5">{{category[index-1]}}</v-btn>
      </div>
    </div>
    <div class="d-flex flex-column ml-8 mb-8" style="width: 70%">
      <h2 class="mb-2">Descripcion del Ejercicio</h2>
      <p>{{ description }}</p>
    </div>
    <div class="d-flex flex-column ml-8 mb-8">
      <h2 class="mb-2">Imagenes demostrativas</h2>
      <div class="d-flex flex-wrap align-start " style="width: 80%; ">
        <v-img  v-for="img in images" :src="img" class="mr-4 mb-4 flex-grow-0" style="width: 150px;"> </v-img>
      </div>
    </div>
<!--    todo hacer que se pueda ver videos de ejercicios-->
  </div>
</template>


<script>
import temp from "../assets/arnold.png";

export default {

  mounted() {
    this.$route.params.id
  },
  data() {
    return {
      temp,
      creatorname: 'Arnold Schwarzenegger',
      description: 'Esta es la descripcion Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a nibh vitae nisi tincidunt vulputate vel nec risus. Fusce placerat sagittis nisl, quis ultricies quam scelerisque a. Nulla laoreet tellus a turpis hendrerit posuere. Curabitur in ante velit. Mauris eu dolor tortor. Curabitur nisl velit, tincidunt non orci id, rutrum sodales metus. Fusce vitae libero aliquet lorem mollis vestibulum nec non odio. Fusce placerat egestas dui at venenatis. Aliquam aliquet orci elit, ut aliquet justo mattis et. Curabitur vitae iaculis neque, ac eleifend nibh. Nam volutpat tortor sed leo sollicitudin, eget semper quam ultricies',
      category:['Musculo Grande','Musculo Chico','Dificultad'],
      images: [temp,temp,temp,temp,temp,temp,temp],
      videos: [],
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