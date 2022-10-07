<template>
  <div class="d-flex flex-column justify-start px-4 py-8">
    <div class="d-flex flex-row justify-space-between">
      <div class="d-flex flex-row justify-start">
        <GoBackButton/>
        <h1 class="pl-4">{{ (edit)? 'Editar':'Crear' }} un Ejercicio</h1>
      </div>
      <div class="d-flex flex-row mr-8">
        <v-btn outlined  class="rounded-pill mr-4">
          <v-icon left>mdi-close</v-icon>
          Descartar {{ edit? " Cambios": " Ejercicio"}}
        </v-btn>
        <v-btn outlined class="rounded-pill">
          <v-icon left>mdi-content-save</v-icon>
          Guardar {{ edit? " Cambios": " Ejercicio"}}
        </v-btn>
      </div>
    </div>
    <div class="ml-16 d-flex flex-row justify-space-between">
      <div class="d-flex flex-column justify-start pt-4" style="width: 40%">
        <v-text-field v-model="name" label="Nombre del Ejercicio" dense outlined class="rounded-lg" />
        <v-textarea v-model="description" label="Descripción del Ejercicio" dense outlined class="rounded-lg" />
      </div>
      <div class="d-flex flex-column justify-start">
        <div class="d-flex flex-row align-center mr-8" >
          <h4 class="mr-4">Tipo de Actividad: </h4>
          <v-chip-group v-model="typeSelected" mandatory column active-class="primary--text">
            <v-chip v-for="index in type.length" class="pa-5">{{type[index-1]}}</v-chip>
          </v-chip-group>
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
      edit:false,
      name:'',
      description:'',
      type:['Ejercicio','Descanso'],
      typeSelected:0,
    }
  }
};

</script>