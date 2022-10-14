<script>
import abdominales from "../assets/abdominales.jpg";
import CycleCard from "../components/rutine/CycleCard.vue";
import LoadingFetchDialog from "@/components/LoadingFetchDialog.vue";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";
import {CycleTypes, useCycles, useSaveRoutine} from "@/stores/routine";
import {useProfileStore} from "@/stores/profile";
import {mapState} from "pinia";

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
        routine: null,
        ratingMenu: false,
        yourRating: 0,
        loadingDialogState: 'loading',
      deleteDialog: false,
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
    removeRoutine() {
      useSaveRoutine().deleteRoutine(this.routineId);
      this.$router.replace("/routines");
    },
  },
  async created() {
    if (this.$route.params.id) {
      try{
        this.routineId = this.$route.params.id;
        let apiAns = await useSaveRoutine().getRoutine(this.routineId);
        this.routine = {
          name: apiAns.name,
          detail: apiAns.detail,
          rating: apiAns.score,
          author: apiAns.user, // {id, username, avatarUrl}
          difficulty: difficultyNamesToSpanish[apiAns.difficulty], //todo mostrar
          category: apiAns.category, // {id, name}
          creationDate: new Date(apiAns.date),
          liked: false, //todo
        }
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
        <div class="d-flex flex-row align-center">
          <v-btn icon @click="() => this.$router.go(-1)">
            <v-icon large>mdi-arrow-left</v-icon>
          </v-btn>
          <h4 class="text-h4 font-weight-bold ml-5">{{ routine.name }}</h4>
          <v-btn v-if="routineIsMine" outlined class="rounded-pill ml-auto" @click="deleteDialog = true">
            <v-icon class="mr-1">mdi-delete</v-icon>
            <span>Eliminar Rutina</span>
          </v-btn>
          <v-btn v-if="routineIsMine" outlined class="rounded-pill ml-4" @click="$router.push(`${$route.fullPath}/edit`)">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            <span>Editar Rutina</span>
          </v-btn>
          <v-btn icon @click="routine.liked = !routine.liked" class="ml-4">
            <v-icon color="primary" large
            >{{ routine.liked ? "mdi-heart" : "mdi-heart-outline" }}
            </v-icon>
          </v-btn>
        </div>
        <div class="d-flex flex-row align-center" style="position: relative">
        <span
        ><v-img
            height="50px"
            width="50px"
            :src="routine.author.avatarUrl"
            class="rounded-circle"
        ></v-img
        ></span>
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
                    half-increments
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
                    half-increments
                    hover
                    length="5"
                    size="24"
                    value="3"
                ></v-rating>
                <h4 class="ml-2">{{ this.yourRating }}</h4>
              </div>
            </v-card>
          </v-menu>
        </div>
        <div style="width: 50%" class="mt-5">
          {{ routine.detail }}
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
            :routine-id="parseInt(routineId)"
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
        <div style="width: 400px; height: 600px; background-color: grey"></div>
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
  </div>
</template>

<style></style>
