<template>
  <div>
    <v-container v-if="allUsers!==null" fluid style="margin-left: 2em">
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
            <v-icon
                x-large
                v-if="showArrow && searcher === ''"
                @click="loadMoreUsers"
            >mdi-chevron-double-down
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <LoadingFetchDialog
        :dialog-state="dialogState"
        loading-text="Por favor, espere..."
        :not-found-text="text"
        ok-not-found-button-text="OK"
        v-on:oknotfound="$router.back()"/>
  </div>
</template>

<script>
import CommunityProfileButton from "../components/CommunityProfileButton.vue";
import { mapActions } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { mapState } from "pinia/dist/pinia";
import LoadingFetchDialog from "@/components/LoadingFetchDialog.vue";
export default {
  components: {
    LoadingFetchDialog,
    CommunityProfileButton,
  },
  data() {
    return {
      searcher: "",
      pageSize: 10,
      id: null,
      hasProf: false,
      showArrow: true,
      allUsers: null,
      dialogState: 'loading',
      timeout: 1000,
      text: "Inicie sesión para ver perfiles de la comunidad.",
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
      console.log(addedUsers);
      this.changeShownArrow(addedUsers);
      this.allUsers.content = this.allUsers.content.concat(addedUsers.content);
    },
  },
  computed: {
    ...mapState(useProfileStore, ["getHasProfile", "getId"]),
    filteredList() {
      let busq = this.searcher;
      if (busq === null) {
        busq = "";
      }
      if (this.allUsers.length !== 0)
        return this.allUsers.content.filter((user) =>
          user.username.includes(busq)
        );
      return [];
    },
  },
  async created() {
    this.hasProf = this.getHasProfile;
    this.id = this.getId;
    if (this.hasProf) {
      this.allUsers = await this.generateNUsers(this.pageSize);
      const page = this.allUsers.page;
      if (page !== 0) {
        this.setPage(0);
        this.allUsers = await this.generateNUsers(this.pageSize * page);
        this.setPage(page);
      }
      this.changeShownArrow(this.allUsers);
      this.dialogState = 'ok';
    }
    else {
      this.dialogState = 'notFound';
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
