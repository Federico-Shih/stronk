<script>
import abdominales from "../assets/abdominales.jpg";
import temp from "../assets/user-default.png";
import CycleCard from "../components/rutine/CycleCard.vue";
import LoadingFetchDialog from "@/components/LoadingFetchDialog.vue";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog.vue";
import { CycleTypes, useCycles, useSaveRoutine } from "@/stores/routine";
import { useProfileStore } from "@/stores/profile";
import { mapActions, mapState } from "pinia";
import { useFavoriteRoutines } from "../stores/routine";
import person01 from "@/assets/stock_people/person01.png";
import person02 from "@/assets/stock_people/person02.png";
import person03 from "@/assets/stock_people/person03.png";
import person04 from "@/assets/stock_people/person04.png";
import person05 from "@/assets/stock_people/person05.png";
import person06 from "@/assets/stock_people/person06.png";

const difficultyNamesToSpanish = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado"
};

export default {
  components: { LoadingFetchDialog, CycleCard, DeleteConfirmationDialog },
  data() {
    return {
      routineId: null,
      img: abdominales,
      temp: temp,
      cycles: [],
      loading: true,
      routine: {},
      ratingMenu: false,
      yourRating: 0,
      loadingDialogState: "loading",
      deleteDialog: false,
      saveSnackbarRating: false,
      timeout: 2000,
      favoriteSnackbar: false,
      shareSnackbar: false,
      stockPeopleImages: [
        person01,
        person02,
        person03,
        person04,
        person05,
        person06
      ]
    };
  },
  computed: {
    routineIsMine() {
      console.log(this.routine);
      return this.routine.author.id === this.getId();
    },
    ...mapState(useProfileStore, ["getToken"])
  },
  mounted() {
  },
  methods: {
    ...mapState(useProfileStore, ["getId"]),
    ...mapActions(useSaveRoutine, ["deleteRoutine", "sumbitRoutineScore"]),
    ...mapActions(useFavoriteRoutines, [
      "favoriteRoutine",
      "unfavoriteRoutine",
      "isFavorite"
    ]),

    async removeRoutine() {
      await this.deleteRoutine(this.routineId);
      await this.$router.replace("/routines");
    },
    async sumbitRating() {
      await this.sumbitRoutineScore(this.routineId, this.yourRating);
      this.ratingMenu = false;
      this.saveSnackbarRating = true;
    },
    async favorite() {
      await this.favoriteRoutine(this.routineId);
      this.routine.liked = true;
      this.favoriteSnackbar = true;
    },
    async unfavorite() {
      await this.unfavoriteRoutine(this.routineId);
      this.routine.liked = false;
      this.favoriteSnackbar = true;
    },
    share() {
      this.shareSnackbar = true;
      navigator.clipboard.writeText(window.location.href);
    }
  },
  async created() {
    if (this.$route.params.id) {
      try {
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
          liked:
            this.getToken !== "" &&
            (await useFavoriteRoutines().isFavorite(this.routineId)) //todo revisar
        };
        console.log(`rutina=${JSON.stringify(this.routine)}`);
        apiAns = await useCycles().getCyclesFromRoutine(this.routineId);
        this.cycles = apiAns;
        this.cycles.sort((a, b) => a.order - b.order);
      } catch (e) {
        console.log(e);
        this.loadingDialogState = "notFound";
      }
    } else {
      this.loadingDialogState = "notFound";
    }
    if (this.loadingDialogState === "loading") {
      this.loadingDialogState = "ok";
    }
  },
};
</script>

<template>
  <v-container fluid>
    <div
      v-if="
        loadingDialogState !== 'loading' && loadingDialogState !== 'notFound'
      "
    >
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-center mb-2">
          <v-btn icon @click="() => this.$router.go(-1)">
            <v-icon large>mdi-arrow-left</v-icon>
          </v-btn>
          <h1 class="font-weight-bold ml-5">{{ routine.name }}</h1>
          <v-spacer></v-spacer>
          <div class="mr-10">
            <v-btn
              v-if="routineIsMine"
              color="primary"
              class="rounded-pill ml-4"
              @click="deleteDialog = true"
            >
              <v-icon class="mr-1">mdi-delete</v-icon>
              <span>Eliminar Rutina</span>
            </v-btn>
            <v-btn
              v-if="routineIsMine"
              color="primary"
              class="rounded-pill ml-4"
              @click="$router.push(`${$route.fullPath}/edit`)"
            >
              <v-icon class="mr-1">mdi-pencil</v-icon>
              <span>Editar Rutina</span>
            </v-btn>
            <v-btn color="secondary" class="rounded-pill ml-4" @click="share()">
              <v-icon class="">mdi-share-variant</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="routine.liked ? unfavorite() : favorite()"
              class="ml-4"
            >
              <v-icon color="primary" large
              >{{ routine.liked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <v-container fluid class="d-flex flex-row">
          <v-card width="800">
            <v-card-text>
              <v-container>
                <div>
                  <span>
                    <v-btn
                      icon
                      @click="
                        $router.push({
                          name: 'profile_extern',
                          params: { id: `${routine.author.id}` },
                        })
                      "
                    >
                      <v-img
                        height="50px"
                        width="50px"
                        :src="
                          routine.author.avatarUrl
                            ? routine.author.avatarUrl
                            : temp
                        "
                        :lazy-src="temp"
                        class="rounded-circle"
                      ></v-img>
                    </v-btn>
                  </span>
                  <span class="ml-5"
                  >hecha por {{ routine.author.username }}</span
                  >
                  <span class="ml-10 mr-2">Categoría:</span>
                  <v-chip>{{ routine.category.name }}</v-chip>
                  <span class="ml-10 mr-2">Dificultad:</span>
                  <v-chip>{{ routine.difficulty }}</v-chip>
                  <span style="float: right">
                    {{ routine.creationDate.toLocaleDateString() }}
                  </span>
                </div>
                <div class="mt-5 text--primary">
                  <div>{{ routine.detail }}</div>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
          <v-spacer></v-spacer>
          <div class="mr-10">
            <v-menu
              v-model="ratingMenu"
              :close-on-content-click="false"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  large
                  label
                  class="d-flex flex-row align-center text--primary mt-8"
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
                  @click="sumbitRating"
                >Confirmar
                </v-btn>
              </v-card>
            </v-menu>
          </div>
        </v-container>
      </div>
      <v-container fluid class="mt-3">
        <h2 class="font-weight-bold my-5">Ciclos de ejercicios:</h2>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 600px; position: relative">
            <v-container
              class="width_full primary font-weight-bold mb-6 rounded-pill white--text pl-8"
            >
              <h2>Inicio</h2>
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
              class="width_full primary font-weight-bold rounded-pill mt-6 white--text pl-8"
            >
              <h2>Fin</h2>
            </v-container>
          </div>
          <v-img
            contain
            :src="stockPeopleImages[this.routineId % stockPeopleImages.length]"
            max-height="600px"
            max-width="300px"
          ></v-img>
        </div>
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
      v-on:agree="
        deleteDialog = false;
        removeRoutine();
      "
      v-on:disagree="deleteDialog = false"
    />
    <v-snackbar v-model="saveSnackbarRating" color="green" :timeout="timeout">
      ¡Puntuación guardada con éxito!
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="saveSnackbarRating = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="shareSnackbar" color="primary" :timeout="timeout">
      ¡Enlace copiado al portapapeles!
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="shareSnackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="favoriteSnackbar"
      :color="!routine.liked ? 'red' : 'green'"
      :timeout="timeout"
    >
      {{
        !routine.liked
          ? "Rutina eliminada de favoritos"
          : "Rutina agregada a favoritos"
      }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="favoriteSnackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style></style>
