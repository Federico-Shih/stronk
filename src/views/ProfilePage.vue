<template>
  <div>
    <div v-if="userExists">
      <div class="d-flex flex-row justify-space-between mb-8">
        <div class="d-flex flex-row mx-8">
          <goBackButton />
          <v-img
            v-if="showPic"
            class="mx-8 rounded-circle"
            :src="avatar"
            alt="No picture Available"
            height="150px"
            width="150px"
          />
          <div class="d-flex flex-column justify-center align-start">
            <div class="d-flex flex-row justify-start align-baseline">
              <h1 class="mr-4 d-flex flex-row" style="gap: 5px">
                <span>{{ this.userInfo.firstName }}</span>
                <span>{{ this.userInfo.lastName }}</span>
                <span v-if="!this.userInfo.firstName">{{
                    this.userInfo.username
                  }}</span>
              </h1>
              <h3>
                <span v-if="this.userInfo.firstName">{{
                    this.userInfo.username
                  }}</span>
              </h3>
            </div>
            <div class="mt-2">
              <h3>
                <span> {{ getDescription() }}</span>
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
            outlined
            class="rounded-pill"
            @click="$router.push(`${$route.fullPath}/edit`)"
          >
            <v-icon class="mr-1">mdi-pencil</v-icon>
            <span>Editar Perfil</span>
          </v-btn>
        </div>
      </div>
      <div class="">
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
              <div class="text-h6 font-weight-light align-self-center">
                ¡Este Usuario no cuenta con ninguna rutina!
              </div>
            </div>
          </v-card-title>
        </v-card>
      </div>
    </div>
    <ErrorPage v-if="!userExists" />
    <!--   <div class="">
      <RoutineSlideGroup
        title="Rutinas Favoritas de Arnold"
        size-variant="small"
        :routines="routines"
      />
    </div> -->
  </div>
</template>

<script>
import temp from "../assets/arnold.png";
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
import GoBackButton from "../components/GoBackButton.vue";
import ErrorPage from "./ErrorFourOFour.vue";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "@/stores/profile";

export default {
  components: {
    GoBackButton,
    RoutineSlideGroup,
    ErrorPage,
  },
  data() {
    return {
      ownUser: false,
      userInfo: null,
      showPic: false,
      temp,
      avatar: "",
      hasRoutines: true,
      userRoutines: [],
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
    }
  },
  async mounted() {
    this.userInfo = this.$route.params.id
      ? await this.generateUser(`${this.$route.params.id}`)
      : this.profile;
    console.log(this.userInfo);
    if (this.userExists) {
      this.ownUser = this.getId === this.userInfo?.id;
      this.avatar = this.userInfo?.avatarUrl
        ? this.userInfo?.avatarUrl
        : this.temp;
      this.showPic = this.avatar.length !== 0;
      this.userRoutines = await this.getRoutinesFrom(this.userInfo?.id);
      if (this.userRoutines.totalCount === 0) {
        this.userRoutines = [];
        this.hasRoutines = false;
      } else {
        this.userRoutines = this.userRoutines.content;
      }
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
