<template>
  <v-container fluid style="margin-left: 2em">
    <v-row class="d-flex flex-row flex-grow-0">
      <v-col class="mr-16 align-start">
        <h1>Comunidad</h1>
        <v-text-field
          label="¿Buscás a alguien en particular?"
          v-model="searcher"
          outlined
          clearable
          @click:clear="resetSearch()"
          class="rounded-lg"
          prepend-inner-icon="mdi-magnify"
        />
        <div v-if="hasProf">
          <div
            v-for="person in filteredList"
            :key="person.id"
            class="flex-grow-0"
          >
            <CommunityProfileButton
              variant="large"
              :display-name="person.username"
              description="Body Builder"
              :profile-pic="person.avatarUrl"
              v-if="person.id !== id"
              :profileId="person.id"
            />
          </div>
          <div>
            <v-btn
              v-if="showArrow && searcher === ''"
              plain
              @click="loadMoreUsers"
            >
              <v-icon>mdi-chevron-double-down</v-icon>
              <div>Mostrar más</div>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <LoadingFetchDialog
      :dialog-state="loadingDialogState"
      loading-text="Por favor, espere..."
      not-found-text="Error cargando comunidad, intente más tarde..."
      ok-not-found-button-text="OK"
      v-on:oknotfound="$router.back()"
    />
  </v-container>
</template>

<script>
import CommunityProfileButton from "../components/CommunityProfileButton.vue";
import LoadingFetchDialog from "../components/LoadingFetchDialog.vue";
import { mapActions } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { mapState } from "pinia/dist/pinia";
export default {
  components: {
    CommunityProfileButton,
    LoadingFetchDialog
  },
  data() {
    return {
      searcher: "",
      pageSize: 5,
      id: null,
      hasProf: false,
      showArrow: true,
      allUsers: [],
      snackbar: false,
      recommendedUsers: [],
      connectError: false,
      timeout: 1000,
      text: "Inicie sesión para ver perfiles de la comunidad.",
      loadingDialogState: ""
    };
  },
  methods: {
    ...mapActions(useProfileStore, [
      "generateAllUsers",
      "generateNUsers",
      "setPage",
    ]),

    resetSearch() {
      this.searcher = "";
    },
    changeShownArrow(users) {
      this.showArrow = !users.isLastPage;
    },
    async loadMoreUsers() {
      const addedUsers = await this.generateNUsers(this.pageSize);
      this.changeShownArrow(addedUsers);
      this.allUsers.content = this.allUsers.content.concat(addedUsers.content);
    },
  },
  computed: {
    ...mapState(useProfileStore, ["getHasProfile", "getId"]),
    filteredList() {
      if (this.allUsers.length !== 0)
        return this.allUsers.content.filter((user) =>
          user.username.includes(this.searcher || "")
        );
      return [];
    },
  },
  async created() {
    this.hasProf = this.getHasProfile;
    this.id = this.getId;
    this.loadingDialogState = "loading";
    try {
      if (this.hasProf) {
        const users = await this.generateNUsers(this.pageSize);
        if (!users) {
          this.connectError = true;
          return;
        }
        this.allUsers = users;
        const page = this.allUsers.page;
        if (page !== 0) {
          this.setPage(0);
          const otherUsers = await this.generateNUsers(this.pageSize * page);
          if (!otherUsers) {
            this.connectError = true;
            return;
          }
          this.allUsers = otherUsers;
          this.setPage(page);
        }
        this.changeShownArrow(this.allUsers);
      }
      this.loadingDialogState = "";
    } catch (err) {
      console.log(err);
      this.loadingDialogState = "notFound";
    }
  },
};
</script>

<style>
.alignmentToTheRight {
  align-items: end;
  display: flex;
  flex-direction: column;
}

.alignmentToTheCenter {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
