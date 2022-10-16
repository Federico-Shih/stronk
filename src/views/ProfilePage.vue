<template>
  <div>
    <div v-if="userExists">
      <div class="d-flex flex-row justify-space-between mb-8">
        <div class="d-flex flex-row mx-8">
          <goBackButton />
          <v-img
            v-if="showPic"
            :lazy-src="userDefault"
            class="mx-8 rounded-circle"
            :src="avatar"
            alt="No picture Available"
            height="150px"
            width="150px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="d-flex flex-column justify-center align-start">
            <div class="d-flex flex-row justify-start align-baseline">
              <h1 class="mr-4 d-flex flex-row" style="gap: 5px">
                <span>{{ this.userInfo.firstName }}</span>
                <span>{{ this.userInfo.lastName }}</span>
                <span v-if="!this.userInfo.firstName">{{
                    this.userInfo.username
                  }}</span>
              </h1>
              <h3 v-if="this.userInfo.firstName">
                <span>{{ this.userInfo.username }}</span>
              </h3>
            </div>
            <div v-if="userInfo.birthdate" class="d-flex flex-row align-center">
              <v-icon class="pb-2">mdi-cake</v-icon>
              <div class="pa-1 mx-3">
                {{ new Date(userInfo.birthdate).toISOString().split("T")[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="mx-16">
          <v-btn
            v-if="ownUser"
            color="primary"
            class="rounded-pill"
            @click="$router.push(`${$route.fullPath}/edit`)"
          >
            <v-icon class="mr-1">mdi-pencil</v-icon>
            <span>Editar Perfil</span>
          </v-btn>
        </div>
      </div>
      <div class="" v-if="hasRoutines != null">
        <RoutineSlideGroup
          v-if="hasRoutines"
          :title="`Rutinas Creadas por ${this.userInfo.username}`"
          size-variant="small"
          :routines="userRoutines"
        />
        <v-card v-else>
          <v-card-title class="justify-center">
            <div class="align-to-center">
              <v-icon large left> mdi-clipboard-alert</v-icon>
              <div class="font-weight-light align-self-center">
                {{ this.text }}
              </div>
            </div>
          </v-card-title>
        </v-card>
      </div>
    </div>
    <ErrorPage v-if="dialogState !== 'loading' && !userExists" />

    <LoadingFetchDialog
      :dialog-state="dialogState"
      loading-text="Por favor, espere..."
      not-found-text="¡Oops! El perfil no se ha encontrado."
      ok-not-found-button-text="OK"
      v-on:oknotfound="$router.back()"
    />
  </div>
</template>

<script>
import temp from "../assets/user-default.png";
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
import GoBackButton from "../components/GoBackButton.vue";
import ErrorPage from "./ErrorFourOFour.vue";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "@/stores/profile";
import LoadingFetchDialog from "../components/LoadingFetchDialog.vue";
import userDefault from "../assets/user-default.png";

export default {
  components: {
    GoBackButton,
    RoutineSlideGroup,
    ErrorPage,
    LoadingFetchDialog
  },
  data() {
    return {
      dialogState: "loading",
      ownUser: false,
      userInfo: null,
      showPic: false,
      temp,
      avatar: "",
      hasRoutines: null,
      userRoutines: [],
      userDefault: userDefault,
      description: [
        "Solo estoy aquí porque mis amigos me hicieron una cuenta",
        "Me gustan los paseos en la playa y alguna otra cosa creo",
        "Campeón mundial de wrestling :D",
        "No sé qué poner en descripción",
        "Vean mis rutinas! Tengo de todo, pero quizás no las cargué todavía :p",
      ],
    };
  },
  methods: {
    ...mapActions(useProfileStore, ["generateUser", "getRoutinesFrom"]),
    getDescription() {
      return this.description[
        parseInt(this.$route.params.id) % this.description.length
      ];
    },
  },
  computed: {
    ...mapState(useProfileStore, ["getId", "profile"]),
    userExists() {
      return this.userInfo !== null && Object.keys(this.userInfo).length !== 0;
    },
    text() {
      return this.ownUser
        ? "¡Usted no cuenta con rutinas aún!"
        : "¡Este Usuario no cuenta con ninguna rutina!";
    },
  },
  async mounted() {
    this.userInfo = this.$route.params.id
      ? await this.generateUser(`${this.$route.params.id}`)
      : this.profile;
    if (this.userExists) {
      this.ownUser = this.getId === this.userInfo?.id;
      this.avatar = this.userInfo?.avatarUrl
        ? this.userInfo?.avatarUrl
        : this.temp;
      this.showPic = this.avatar.length !== 0;
      this.userRoutines = await this.getRoutinesFrom(this.userInfo?.id);
      if (this.userRoutines.length === 0) {
        this.hasRoutines = false;
      } else {
        this.hasRoutines = true;
      }
      this.dialogState = "";
    } else {
      this.dialogState = "notFound";
    }
  },
};
</script>

<style>
.align-to-center {
  align-items: center;
  display: flex;
}
</style>
