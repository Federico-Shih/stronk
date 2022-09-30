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

    <div class="ml-6 mb-4 d-flex flex-row justify-space-between">
      <div class="d-flex flex-row justify-start ">
        <v-btn icon class="mx-4">
          <v-img class="rounded-circle" :src="temp" height="50px" width="50px"/>
        </v-btn>
        <h3 class="mt-1">hecho por {{ creatorname }}</h3>
      </div>
      <!--        <div>-->
      <!--          aca irian las categorias si supiera como hacerlas en la forma que esta, pero serian botones en column -->
      <!--        </div>-->

    </div>
    <div class="d-flex flex-column ml-8 mb-8" style="width: 70%">
      <h2 class="mb-2">Descripcion del Ejercicio</h2>
      <p>{{ description }}</p>
    </div>


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
      description: 'Esta es la descripcion Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a nibh vitae nisi tincidunt vulputate vel nec risus. Fusce placerat sagittis nisl, quis ultricies quam scelerisque a. Nulla laoreet tellus a turpis hendrerit posuere. Curabitur in ante velit. Mauris eu dolor tortor. Curabitur nisl velit, tincidunt non orci id, rutrum sodales metus. Fusce vitae libero aliquet lorem mollis vestibulum nec non odio. Fusce placerat egestas dui at venenatis. Aliquam aliquet orci elit, ut aliquet justo mattis et. Curabitur vitae iaculis neque, ac eleifend nibh. Nam volutpat tortor sed leo sollicitudin, eget semper quam ultricies'
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