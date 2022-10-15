<script>
import abdominales from "../assets/abdominales.jpg";
import CycleCard from "../components/rutine/CycleCard.vue";
import LoadingFetchDialog from "@/components/LoadingFetchDialog.vue";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";
import {CycleTypes, useCycles, useSaveRoutine} from "@/stores/routine";
import {useProfileStore} from "@/stores/profile";
import {mapActions, mapState} from "pinia";
import {useFavoriteRoutines} from "../stores/routine";
import person01 from "@/assets/stock_people/person01.png";
import person02 from "@/assets/stock_people/person02.png";
import person03 from "@/assets/stock_people/person03.png";
import person04 from "@/assets/stock_people/person04.png";
import person05 from "@/assets/stock_people/person05.png";
import person06 from "@/assets/stock_people/person06.png";

const difficultyNamesToSpanish = {
  "beginner": "Principiante",
  "intermediate": "Intermedio",
  "advanced": "Avanzado"
}


export default {
  components: {LoadingFetchDialog, CycleCard, DeleteConfirmationDialog},
  data() {
    return {
      routineId: null,
          img: abdominales,
        cycles: [],
        loading: true,
        routine:{},
        ratingMenu: false,
        yourRating: 0,
        loadingDialogState: 'loading',
      deleteDialog: false,
      saveSnackbarRating: false,
      timeout: 2000,
      favoriteSnackbar:false,
      stockPeopleImages: [person01, person02, person03, person04, person05, person06],
    }
  },
  computed: {
    routineIsMine() {
      return this.routine.author.id === this.getId();
    },
  },
  mounted() {

  },
  methods: {
    ...mapState(useProfileStore, ['getId']),
    ...mapActions(useSaveRoutine, [
      "deleteRoutine",
        "sumbitRoutineScore",
    ]),
    ...mapActions(useFavoriteRoutines,["favoriteRoutine","unfavoriteRoutine","isFavorite"]),

    async removeRoutine() {//Aca no estaba puesto el async ni el await, no se si era intencional
     await this.deleteRoutine(this.routineId);
     this.$router.replace("/routines");
    },
    async sumbitRating(){
      await this.sumbitRoutineScore(this.routineId, this.yourRating);
      this.ratingMenu = false;
      this.saveSnackbarRating=true;
    },
    async favorite(){
      await this.favoriteRoutine(this.routineId);
      this.routine.liked= true;
      this.favoriteSnackbar=true;

    },
    async unfavorite(){
      await this.unfavoriteRoutine(this.routineId);
      this.routine.liked=false;
      this.favoriteSnackbar=true;
    },
    share() {
      navigator.clipboard.writeText(window.location.href);
    }

    },
  async created() {
    if (this.$route.params.id) {
      try{
        this.routineId = parseInt(this.$route.params.id);
        let apiAns = await useSaveRoutine().getRoutine(this.routineId);
        this.routine = {
          name: apiAns.name,
          detail: apiAns.detail,
          rating: apiAns.score,
          author: apiAns.user, // {id, username, avatarUrl}
          difficulty: difficultyNamesToSpanish[apiAns.difficulty], //todo mostrar
          category: apiAns.category, // {id, name}
          creationDate: new Date(apiAns.date),
          liked: await useFavoriteRoutines().isFavorite(this.routineId), //todo revisar
        };
        console.log(`rutina=${JSON.stringify(this.routine)}`);
        apiAns = await useCycles().getCyclesFromRoutine(this.routineId);
        this.cycles = apiAns;
        this.cycles.sort((a,b) => a.order-b.order);
      } catch (e) {
        this.loadingDialogState = 'notFound';
      }
    } else {
      this.loadingDialogState = 'notFound';
    }
    if(this.loadingDialogState === 'loading') {
      this.loadingDialogState = 'ok';
    }
  },

};
</script>

<template>
  <div>
    <div v-if="loadingDialogState !== 'loading' && loadingDialogState !== 'notFound'" >
      <div class="d-flex flex-column mx-10 mt-5">
        <div class="d-flex flex-row align-center mb-2">
          <v-btn icon @click="() => this.$router.go(-1)">
            <v-icon large>mdi-arrow-left</v-icon>
          </v-btn>
          <h4 class="text-h4 font-weight-bold ml-5">{{ routine.name }}</h4>
          <v-spacer></v-spacer>
          <v-btn v-if="routineIsMine" outlined class="rounded-pill ml-4" @click="deleteDialog = true">
            <v-icon class="mr-1">mdi-delete</v-icon>
            <span>Eliminar Rutina</span>
          </v-btn>
          <v-btn v-if="routineIsMine" outlined class="rounded-pill ml-4" @click="$router.push(`${$route.fullPath}/edit`)">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            <span>Editar Rutina</span>
          </v-btn>
          <v-btn outlined class="rounded-pill ml-4" @click="share()">
            <v-icon class="">mdi-share-variant</v-icon>
          </v-btn>
          <v-btn icon @click="(routine.liked)? unfavorite():favorite()" class="ml-4">
            <v-icon color="primary" large
            >{{ routine.liked ? "mdi-heart" : "mdi-heart-outline" }}
            </v-icon>
          </v-btn>
        </div>
        <div class="d-flex flex-row align-center ml-4" style="position: relative">
          <span>
            <v-btn icon class="ml-4" @click="$router.push({ name: 'profile', params: { id: `${routine.author.id}` } })">
              <v-img
                height="50px"
                width="50px"
                :src="routine.author.avatarUrl"
                class="rounded-circle"
            ></v-img>
            </v-btn>
          </span>
          <span class="ml-3">hecha por {{ routine.author.username }}</span>
          <span class="ml-10 mr-2">Categoría:</span>
          <v-chip>{{ routine.category.name }}</v-chip>
          <span class="ml-10 mr-2">Dificultad:</span>
          <v-chip>{{ routine.difficulty }}</v-chip>
          <v-menu v-model="ratingMenu" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                  large
                  label
                  class="d-flex flex-row align-center text--primary mt-8"
                  style="position: absolute; right: 0"
                  v-bind="attrs"
                  v-on="on"
              >
                {{ routine.rating }}
                <v-rating
                    disabled
                    readonly
                    :value="routine.rating"
                    dense
                    class="ml-3"
                ></v-rating>
              </v-chip>
            </template>
            <v-card class="pa-4">
              <h4>Tu puntación para esta rutina:</h4>
              <div class="d-flex flex-row align-baseline">
                <v-rating
                    v-model="yourRating"
                    color="primary"
                    dense
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half-full"
                    hover
                    length="5"
                    size="24"
                    value="3"
                ></v-rating>
                <h4 class="ml-2">{{ this.yourRating }}</h4>
              </div>
              <v-btn
                  depressed
                  color="primary"
                  class="rounded-pill ml-4"
                  @click="sumbitRating">Confirmar</v-btn>
            </v-card>
          </v-menu>
        </div>
        <div style="width: 50%" class="mt-5">
          <span>Fecha de Creación: {{ routine.creationDate.toLocaleDateString() }}</span>
          <br/>
          <span>Descripción: {{ routine.detail }}</span>
        </div>
      </div>
      <v-container class="mt-3">
        <h2 class="text-h5 font-weight-bold">Ciclos de ejercicios:</h2>
      </v-container>
      <v-container class="d-flex flex-row justify-space-between">
        <div style="width: 600px; position: relative">
          <v-container
              class="width_full primary text-h5 font-weight-bold mb-6 rounded-pill white--text pl-8"
          >Inicio
          </v-container>
          <CycleCard
            class="mt-3"
            v-for="(cycle, index) in this.cycles"
            :key="index"
            :cycle-id="cycle.id"
            :cycle-name="cycle.name"
            :cycle-repetitions="cycle.repetitions"
          ></CycleCard>
          <div
              class="primary"
              style="
            position: absolute;
            height: 100%;
            width: 6px;
            top: 0;
            left: 155px;
          "
          ></div>
          <v-container
              class="width_full primary text-h5 font-weight-bold rounded-pill mt-6 white--text pl-8"
          >Fin
          </v-container>
        </div>
        <v-img contain :src="stockPeopleImages[this.routineId % stockPeopleImages.length]" max-height="600px" max-width="300px"></v-img>
      </v-container>

    </div>
    <LoadingFetchDialog
        :dialog-state="loadingDialogState"
        loading-text="Por favor, espere..."
        not-found-text="¡Oops! La rutina no se ha encontrado."
        ok-not-found-button-text="OK"
        v-on:oknotfound="$router.back()"
    />
    <DeleteConfirmationDialog
        :dialog="deleteDialog"
        title="¿Está seguro que desea eliminar la rutina?"
        body-text="Se eliminará de forma permanente junto con su contenido."
        agree-button-text="Sí"
        disagree-button-text="No"
        v-on:agree="deleteDialog = false; removeRoutine();"
        v-on:disagree="deleteDialog = false"
    />
    <v-snackbar v-model="saveSnackbarRating" color="green" :timeout="timeout">
      Puntuacion guardada con éxito!
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="saveSnackbarRating = false;"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="favoriteSnackbar" :color="!routine.liked? 'red':'green'" :timeout="timeout">
      {{!routine.liked? "Rutina eliminada de favoritos":"Rutina agregada a favoritos"}}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="favoriteSnackbar = false;"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style></style>
