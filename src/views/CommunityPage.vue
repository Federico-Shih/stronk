<template>
  <v-main class="px-8">
    <v-row class="ml-8 d-flex flex-row justify-space-between">
      <v-col class="mr-16">
        <h1>Comunidad</h1>
        <search-bar title="¿Buscás a alguien en particular?"></search-bar>
        <div v-if="hasProf" class="alignmentToTheCenter">
          <div v-for="person in this.allUsers.content" :key="person.id">
            <router-link
              style="text-decoration: none; color: inherit"
              :to="{ name: 'profile', params: { id: `${person.id}` } }"
            >
              <CommunityProfileButton
                variant="large"
                :display-name="person.username"
                description="Body Builder"
                :profile-pic="person.avatarUrl"
              />
            </router-link>
          </div>
          <v-icon x-large v-if="showArrow" @click="loadMoreUsers"
            >mdi-chevron-double-down
          </v-icon>
        </div>
        <div v-else>
          <div
            @click="
              snackbar = true;
              timeout = timeout + 1000;
            "
            v-for="person in defaultUsers"
            :key="person.id"
          >
            <CommunityProfileButton
              variant="large"
              :display-name="person.username"
              :profile-pic="person.avatarUrl"
              :description="person.description"
            />
          </div>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-col class="mr-16 alignmentToTheRight">
        <h2 class="align-self-start">Recomendados</h2>
        <div v-if="hasProf">
          <div v-for="person in this.recommendedUsers" :key="person.id">
            <router-link
              style="text-decoration: none; color: inherit"
              :to="{ name: 'profile', params: { id: `${person.id}` } }"
            >
              <CommunityProfileButton
                variant="small"
                :display-name="person.username"
                description="Body Builder"
                :profile-pic="person.avatarUrl"
              />
            </router-link>
          </div>
        </div>
        <div v-else>
          <div
            @click="
              snackbar = true;
              timeout = timeout + 1000;
            "
            v-for="person in recommendedUsers"
            :key="person.id"
          >
            <CommunityProfileButton
              variant="small"
              :display-name="person.username"
              description="Body Builder"
              :profile-pic="person.avatarUrl"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="
            snackbar = false;
            timeout = 2000;
          "
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import CommunityProfileButton from "../components/CommunityProfileButton.vue";
import abdos from "../assets/abdominallateral.jpg";
import SearchBar from "../components/SearchBar.vue";
import { mapActions } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { mapState } from "pinia/dist/pinia";
export default {
  components: {
    CommunityProfileButton,
    SearchBar,
  },
  data() {
    return {
      Abdos: abdos,
      pageSize: 10,
      hasProf: false,
      showArrow: true,
      allUsers: [],
      snackbar: false,
      recommendedUsers: [],
      timeout: 1000,
      text: "Inicie sesión para ver perfiles.",
      defaultUsers: [
        {
          id: "1",
          username: "The Arnold Schwarzenegger",
          avatarUrl:
            "https://media.ambito.com/p/175c80b523ca2cb374923d219f969e60/adjuntos/239/imagenes/038/108/0038108131/arnold-schwarzenegger.jpg",
          description:
            "Austrian-American actor, film producer, businessman, retired professional bodybuilder and politician.",
        },
        {
          id: "2",
          username: "The Terminator Guy",
          avatarUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg",
          description: "Mr Universe.",
        },
        {
          id: "3",
          username: "Arnold",
          avatarUrl:
            "https://tn.com.ar/resizer/z4vSOIFyoqVJdouo5QO_lFNne_k=/767x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/QREUJ7GN7GLL2JJMK6BJYGME4E.jpg",
          description: "American Actor and playboy.",
        },
        {
          id: "4",
          username: "Arn Schwarz",
          avatarUrl:
            "https://www.clarin.com/img/2019/10/30/arnold-en-la-primera-de___nhHQ72HK_720x0__1.jpg",
          description: "Body Builder.",
        },
        {
          id: "5",
          username: "The Same Guy",
          avatarUrl:
            "https://media.ambito.com/p/5e2a346f9de355d551193e0fcc962ab5/adjuntos/239/imagenes/039/609/0039609224/arnold-schwarzenegger-choque-1.jpg",
          description:
            "Known as the Styrian Oak, or Austrian Oak, in the bodybuilding world.",
        },
      ],
    };
  },
  methods: {
    ...mapActions(useProfileStore, [
      "generateAllUsers",
      "generateNUsers",
      "setPage",
    ]),
    ...mapState(useProfileStore, ["getHasProfile"]),
    loadRecommendedUsers() {
      this.recommendedUsers = this.hasProf
        ? this.allUsers.content.slice(this.pageSize - 3, this.pageSize)
        : this.defaultUsers.slice(0, 3);
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
  async created() {
    this.hasProf = this.getHasProfile();
    if (this.hasProf) {
      this.allUsers = await this.generateNUsers(this.pageSize);
      const page = this.allUsers.page;
      if (page !== 0) {
        this.setPage(0);
        this.allUsers = await this.generateNUsers(this.pageSize * page);
        this.setPage(page);
      }
      this.changeShownArrow(this.allUsers);
    }
    this.loadRecommendedUsers();
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
