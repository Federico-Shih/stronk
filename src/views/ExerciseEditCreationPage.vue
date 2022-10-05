<template>
  <div
      class="mt-4"
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
        <h1 class="pl-4">{{ (edit)? 'Editar':'Crear' }} un Ejercicio</h1>
      </div>
      <div class="d-flex flex-row justify-space-between mr-16 mt-2">
        <v-btn outlined  class="rounded-pill mr-4">
          <v-icon left>mdi-close</v-icon>
          Descartar Ejercicio
        </v-btn>

        <v-btn outlined class="rounded-pill">
          <v-icon left>mdi-content-save</v-icon>
          Guardar Ejercicio
        </v-btn>
      </div>
    </div>
    <div class="ml-16 d-flex flex-column">
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex flex-column" style="width: 40%">
          <h3>Nombre</h3>
          <v-text-field dense outlined class="rounded-lg" />
        </div>
        <div class="d-flex flex-column mr-16" >
          <h4>Dificultad</h4>
          <v-chip-group mandatory column active-class="primary--text" >
            <v-chip class="rounded-l-pill pa-5"> Principiante</v-chip>
            <v-chip class="rounded-l-pill pa-5"> Intermedio</v-chip>
            <v-chip class="rounded-l-pill pa-5"> Avanzado</v-chip>
          </v-chip-group>
        </div>
      </div>
      <div>
        <div class="d-flex flex-row justify-space-between">
          <div class="d-flex flex-column" style="width: 40%">
            <h3>Descripcion del Ejercicio</h3>
            <v-textarea dense outlined class="rounded-lg" />
          </div>
          <div class="d-flex flex-column mr-16" >
            <h4>Categoria(s)</h4>
            <v-chip-group multiple column >
              <v-chip class="rounded-l-pill pa-5"> Musculo Grande</v-chip>
              <v-chip class="rounded-l-pill pa-5"> Musculo Chico</v-chip>
              <v-chip class="rounded-l-pill pa-5"> Anadir</v-chip>
            </v-chip-group>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import GoBackButton from "../components/GoBackButton.vue";

export default {
  components: {
    GoBackButton,
  },
  data(){
    return{
      edit:true
    }
  }
};

</script>

<style scoped>
.alignmentToTheRight {
  align-items: end;
  display: flex;
  flex-direction: column;
}

</style>