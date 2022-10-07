<template>
  <v-overlay :value="this.show">
    <v-card class="pa-8 card-anim" min-width="500px">
      <v-btn
          style="position: absolute; right: 0; top: 0; z-index: 1000"
          class="ma-5"
          icon
          @click="hidePopup"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-select v-model="exerciseSelected" :items="exercises" item-value="id" item-text="name" label="Eliga un Ejercicio"></v-select>
      <v-select v-model="exerciseType"  :item="Type" label="Eliga el tipo de Ejercicio"></v-select>
      <v-btn @click="onSumbit" color="primary">Terminar</v-btn>
    </v-card>

  </v-overlay>
</template>

<script>
import { mapActions} from "pinia";
import { useExerciseStore} from "../stores/exercise";

export default {
  name: "ExercisePopup",
  data()  {
    return{
      exerciseSelected,
      exerciseType,
      Type:['Tiempo','Repeticiones','Ambos'],
      exercises:[ {id:1 ,name:"abdominales", detail:"abdos",type:"exercise",date:16000 ,metadata:null}],
    }
  },
  computed:{

  },
  watch: {

  },
  methods: {
    onSumbit() {
      this.$emit('sumbit',this.exerciseSelected,this.exerciseType);
    }
  },
  mounted:{
    ...mapActions(useExerciseStore, ["getExercises"]),
    retrieveExercises(){
      this.exercises=this.getExercises();
    }
  }
};

</script>

<style scoped>

</style>