<template>
  <div class="d-flex flex-column justify-start px-4 py-8">
    <div class="d-flex flex-row justify-space-between">
      <div class="d-flex flex-row justify-start">
        <GoBackButton/>
        <h1 class="pl-4">{{ (edit)? 'Editar':'Crear' }} un Ejercicio</h1>
      </div>
      <div class="d-flex flex-row mr-8">
        <v-btn outlined  class="rounded-pill mr-4" @click="$router.back()">
          <v-icon left>mdi-close</v-icon>
          Descartar {{ edit? " Cambios": " Ejercicio"}}
        </v-btn>
        <v-btn outlined class="rounded-pill" @click="">
          <v-icon left>mdi-content-save</v-icon>
          Guardar {{ edit? " Cambios": " Ejercicio"}}
        </v-btn>
      </div>
    </div>
    <div class="ml-16 d-flex flex-row justify-space-between">
      <div class="d-flex flex-column justify-start pt-4" style="width: 40%">
        <v-text-field v-model="name" label="Nombre del Ejercicio" dense outlined class="rounded-lg" />
        <v-textarea v-model="description" label="Descripción del Ejercicio" dense outlined class="rounded-lg" />
        <v-text-field v-model="imageurl" label="Escriba el URL de la imagen" dense outlined class="rounded-lg" @keypress.native.enter="loadImage()"></v-text-field>
        <v-text-field v-model="videourl" label="Escriba un URL del video de Youtube" dense outlined class="rounded-lg" @keypress.native.enter="loadVideo()"></v-text-field>

      </div>
      <div class="d-flex flex-column justify-start">
        <div class="d-flex flex-row align-center mr-8" >
          <h4 class="mr-4">Tipo de Actividad: </h4>
          <v-chip-group v-model="typeSelected" mandatory column active-class="primary--text">
            <v-chip v-for="index in type.length" class="pa-5">{{type[index-1]}}</v-chip>
          </v-chip-group>
        </div>
        <div v-if="images.length>0" class="d-flex flex-column align-self-start mr-8">
          <h3 class="mb-2">Imagenes agregadas</h3>
            <div v-for="img in images" class="d-flex flex-row ">
            <span style="width: 300px ;text-overflow: ellipsis; overflow: hidden;">{{img}}</span>
            <v-btn icon @click="removeImage(img)"><v-icon>mdi-close-box-outline</v-icon></v-btn>
          </div>
        </div>
        <div v-if="videos.length>0" class="d-flex flex-column align-self-start mr-8">
          <h3 class="mb-2">Videos Agregados</h3>
          <div v-for="vid in videos" class="d-flex flex-row">
            <span style="width: 300px ; text-overflow: ellipsis; overflow: hidden; ">{{vid}}</span>
            <v-btn icon @click="removeVideo(vid)"><v-icon>mdi-close-box-outline</v-icon></v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoBackButton from "../components/GoBackButton.vue";
import { useExerciseStore} from "../stores/exercise";
import {mapActions} from "pinia";
import {useProfileStore} from "../stores/profile";
export default {
  components: {
    GoBackButton,
  },

  data(){
    return{
      name:'',
      description:'',
      type:['Ejercicio','Descanso'],
      typeSelected:0,
      imageurl:'',
      videourl:'',
      images:[],
      videos:[],
    }
  },
  computed:{
    edit:(!this.$route.params.id),
    exId:(this.$route.params.id)? this.$route.params.id:0,
    creatorid: this.getId(),
  },
  methods:{
    ...mapActions(useExerciseStore, ["getExerciseById","saveExercise","putExercise"]),
    ...mapActions(useProfileStore,["getId"]),
    loadImage(){
      if(this.imageurl!== '') {
        this.images.push(this.imageurl);
        this.imageurl = '';
      }
    },
    loadVideo(){
      if(this.videourl!=='') {
        this.videos.push(this.videourl);
        this.videourl = '';
      }
    },
    removeImage(img){
      this.images=this.images.filter((value)=>{
        return value !== img
      });
    },
    removeVideo(vid){
      this.videos=this.videos.filter((value)=>{
        return value !== vid
      });
    },
    async sumbitExercise(){
      let exercise={
        name:this.name,
        detail:this.description,
        type:(this.type==='Ejercicio')? 'exercise':'rest',
        metadata:{creatorid: this.creatorid}
      }
      if(this.edit){
        await this.saveExercise(exercise,this.images,this.videos,this.exId);
      }else{
        await this.putExercise(exercise,this.images,this.videos);
      }
    },
  },
  mounted(){
    if(this.edit){
      const exercise=this.getExerciseById(this.exId);
      this.name=exercise.name;
      this.description=exercise.detail;
      this.typeSelected=(exercise.type==='exercise')? 0:1;
      this.images=exercise.images;
      this.videos=exercise.videos;
    }
  },
};

</script>