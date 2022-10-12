<template>
  <v-main>
    <div class="d-flex flex-row justify-space-between mb-8">
      <div class="d-flex flex-row mx-8">
        <div class="d-flex flex-column mr-4 justify-start">
          <GoBackButton />
        </div>
        <v-img
          v-if="showPic"
          class="mx-8 rounded-circle"
          :src="avatar"
          alt="No picture Available"
          height="150px"
          width="150px"
        />
        <div class="d-flex flex-column justify-center">
          <div class="d-flex flex-row justify-start align-baseline">
            <h1 class="mr-4">{{ this.userInfo.username }}</h1>
            <h4>75 años</h4>
          </div>
          <h4>
            Body builder, philanthropist, playboy, ex-governor of California
          </h4>
          <v-btn
            v-if="!ownUser"
            outlined
            class="mt-2 rounded-pill"
            max-width="200px"
          >
            Seguir
          </v-btn>
        </div>
      </div>
      <div class="mx-16">
        <v-btn v-if="ownUser" outlined class="rounded-pill">
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
      <v-card v-else
        ><v-card-title class="justify-center">
          <div class="align-to-center">
            <v-icon large left> mdi-clipboard-alert </v-icon>
            <div class="text-h6 font-weight-light align-self-center">
              ¡Este Usuario no cuenta con ninguna rutina!
            </div>
          </div>
        </v-card-title></v-card
      >
    </div>
    <!--   <div class="">
      <RoutineSlideGroup
        title="Rutinas Favoritas de Arnold"
        size-variant="small"
        :routines="routines"
      />
    </div> -->
  </v-main>
</template>

<script>
import temp from "../assets/arnold.png";
import RoutineSlideGroup from "../components/RoutineSlideGroup.vue";
import GoBackButton from "../components/GoBackButton.vue";
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "@/stores/profile";

export default {
  components: {
    GoBackButton,
    RoutineSlideGroup,
  },
  data() {
    return {
      ownUser: false,
      userInfo: "",
      showPic: false,
      temp,
      avatar: "",
      hasRoutines: true,
      userRoutines: [],
    };
  },
  methods: {
    ...mapActions(useProfileStore, ["generateUser", "getRoutinesFrom"]),
    ...mapState(useProfileStore, ["getId"]),
  },
  async mounted() {
    this.userInfo = await this.generateUser(`${this.$route.params.id}`);
    this.ownUser =
      (await this.getId()) === parseInt(`${this.$route.params.id}`);
    this.avatar = this.userInfo.avatarUrl ? this.userInfo.avatarUrl : this.temp;
    console.log(this.avatar);
    this.showPic = this.avatar.length !== 0;
    this.userRoutines = await this.getRoutinesFrom(`${this.$route.params.id}`);
    console.log("Rutina:");
    console.log(this.userRoutines);
    if (this.userRoutines.totalCount === 0) {
      this.userRoutines = [];
      this.hasRoutines = false;
    } else {
      this.userRoutines = this.userRoutines.content;
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
