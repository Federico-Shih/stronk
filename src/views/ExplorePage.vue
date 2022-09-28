<template>
    <v-main class="grey lighten-2">
        <div  class="pl-8 mr-8">
          <h1>Explorar Nuevas Rutinas</h1>
          <v-text-field placeholder="Busca una rutina en particular..." append-icon="" background-color="#D1d0d6"  outlined class="rounded-lg"></v-text-field>
        </div>
      <div class="pl-8 mr-8">
       <v-carousel>
         <h2>Rutinas Populares</h2>
         <v-carousel-item height="50%" ><RoutineButton title="Abdominales" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" variant="long"/> </v-carousel-item>
         <v-carousel-item> <RoutineButton title="Otros" variant="small" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/> </v-carousel-item>
         <v-carousel-item> <RoutineButton title="otras" variant="large" /> </v-carousel-item>
         <v-carousel-item> <RoutineButton title="Otres" variant="large" /> </v-carousel-item>
       </v-carousel>
      </div>
      <div class="pl-8 mr-8 mt-6" >
        <h2>Otras Rutinas de la Comunidad</h2>
        <v-row>
          <template>
            <v-col
                v-for="j in 6"
                :key="`${j}`"
                cols="6"
                md="2"
            >
              <RoutineButton title="Algo aca tendria que ir" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" variant="large" />
            </v-col>
          </template>
        </v-row>
      </div>
      <div class="pl-8 mr-8 mt-6">
        <h2>Últimas Rutinas de Quienes Sigo</h2>
        <v-row>
          <template>
            <v-col
                v-for="j in 6"
                :key="`${j}`"
                cols="6"
                md="2"
            >
              <RoutineButton title="Algo aca tendria que ir" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
            </v-col>
          </template>
        </v-row>
      </div>
    </v-main>
</template>



<script>
import RoutineButton from "../components/RoutineButton.vue";
import abs from "../assets/abdominales.jpg";
import abslat from "../assets/abdominallateral.jpg";
import fle from "../assets/flexiones.jpg";
import estirar from "../assets/estirar.jpg";
export default {
  components: {
    RoutineButton
  },
  data() {
      return {
        sources: [abs, abslat, fle, estirar],
      };

  },
};
</script>
