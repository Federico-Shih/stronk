<template>
  <v-overlay :value="this.show">
    <v-card class="pa-8 card-anim" min-width="500px">
      <v-btn
          style="position: absolute; right: 0; top: 0; z-index: 1000"
          class="ma-5"
          icon
          @click="hide()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-form v-model="valid">
        <v-select v-model="exerciseSelected" :items="exercises" item-value="id" item-text="name" label="Eliga un Ejercicio" :item-disabled="disableExercise" return-object :rules="[rules.required]"></v-select>
        <v-spacer style="height: 50px"></v-spacer>
        <v-select v-model="exerciseType"  :items="Type" label="Eliga el tipo de Ejercicio" :rules="[rules.required]"></v-select>
      <v-spacer style="height: 50px"></v-spacer>
      <v-btn @click="onSumbit" color="primary" :disabled="!valid">Terminar</v-btn>
      </v-form>
    </v-card>
  </v-overlay>
</template>

<script>
import {mapActions, mapState} from "pinia";
import { useExerciseStore} from "../stores/exercise";
import {useExPopupStore} from "../stores/expopup";

export default {
  name: "ExercisePopup",
  props:{
    usedExercises:{
      type: Array,
      required: true
    },

  },
  data()  {
    return{
      exerciseSelected:null,
      exerciseType:null,
      Type:['Tiempo','Repeticiones','Ambos'],
      exercises:[{id:1 ,name:"abdominales", detail:"abdos",type:"exercise",date:16000 ,metadata:null},
          {id:2 ,name:"jumping jacks", detail:"core",type:"exercise",date:16000 ,metadata:null} ],
      valid:false,
      rules:{
        required: value => !!value || 'Elija una opcion'
      }
    };
  },
  computed:{
    ...mapState(useExPopupStore, ["show", "index"]),
  },
  watch:{
    show(){

    }
  },
  methods: {
    ...mapActions(useExerciseStore, ["getOwnExercises"]),
    ...mapActions(useExPopupStore,["hideExPopup"]),
    onSumbit(){
      this.$emit('ex-sumbit',this.exerciseSelected,this.exerciseType, this.index);
      this.hideExPopup();
    },
  async retrieveExercises(){
      this.exercises=await this.getOwnExercises();
    },
    disableExercise(item){
      return this.usedExercises.some((used) => used.id === item.id); //si no esta en el array de usados
    },
    hide(){
      this.$emit('popup-hide');
      this.hideExPopup();
    }
  },
  mounted(){
    this.retrieveExercises();
  }
};

</script>

<style scoped>

</style>