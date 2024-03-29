<script>
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "@/stores/profile";
import logotype from "../assets/logotipo_blanco.png";
import temp from "../assets/user-default.png";
import { usePopupStore } from "@/stores/auth";

export default {
  name: "NavBar",
  computed: {
    ...mapState(useProfileStore, [
      "getHasProfile",
      "getFirstname",
      "getLastname",
      "getToken",
      "profile",
    ]),
    ownedLinks() {
      return this.links.filter((link) =>
        link.protected ? this.getHasProfile : true
      );
    },
    LogoClicked() {
      return "/";
    },
  },
  data() {
    return {
      connectError: false,
      id: "",
      logo: logotype,
      firstname: "",
      links: [
        { label: "Explorar", link: "/explore" },
        { label: "Comunidad", link: "/community", protected: true },
        { label: "Mis rutinas", link: "/routines", protected: true },
        { label: "Mis ejercicios", link: "/exercises", protected: true },
        { label: "Mi perfil", link: "/profile", protected: true }
      ],
      dropdownItems: [
        {
          label: "Editar Perfil",
          link: "",
          click: () => {
            this.$router.push("/profile/edit");
          }
        },
        { divider: true },
        {
          label: "Cerrar sesión",
          link: "",
          click: async () => {
            await this.logout();
            if (this.$route.path !== "/") {
              await this.$router.replace("/");
            }
          }
        }
      ],
      temp,
      image: "",
      expanded: false,
    };
  },
  methods: {
    setExpanded(value) {
      this.expanded = value;
    },
    ...mapActions(usePopupStore, ["showPopup"]),
    ...mapActions(useProfileStore, ["logout", "loadCurrentNames"]),
    ...mapState(useProfileStore, ["getId", "getPic"]),
  },
  watch: {
    getHasProfile(curr) {
      if (curr) {
        this.expanded = false;
      }
    },
    getFirstname(curr) {
      this.firstname = curr;
      this.id = this.getId();
      this.links[4].link = "/profile";
      this.image = this.getPic();
      this.image = this.image ? this.image : this.temp;
    },
  },
  async created() {
    if (!this.getHasProfile && this.getToken.length !== 0) {
      try {
        await this.loadCurrentNames();
      } catch (err) {
        this.connectError = true;
      }
    }
  },
};
</script>

<template>
  <v-app-bar app color="primary">
    <v-btn plain @click="$router.push(LogoClicked)">
      <v-img max-width="100" :src="logo" />
      <div style="display: none">Home</div>
    </v-btn>
    <router-link
      v-for="{ link, label } in ownedLinks"
      :key="link"
      :to="link"
      style="text-decoration: none"
      class="white--text ml-16 mt-2"
      active-class="active"
    >{{ label }}
    </router-link>
    <v-spacer></v-spacer>
    <div v-if="!this.getHasProfile">
      <v-btn
        class="mx-5"
        elevation="1"
        color="secondary"
        @click="showPopup('/', 'register')"
        style="color: black"
        >Registrarse</v-btn
      >
      <v-btn elevation="1" @click="showPopup('/', 'login')"
        >Iniciar sesión</v-btn
      >
    </div>
    <div v-else>
      <div class="text-center">
        <v-menu
          :close-on-content-click="false"
          offset-y
          :value="expanded"
          :close-on-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              rounded
              class="py-6 rounded"
              v-bind="attrs"
              v-on="on"
              @click="setExpanded(!expanded)"
            >
              Bienvenido, {{ firstname }}
              <v-img
                class="ml-2 rounded-circle"
                :src="image"
                :lazy-src="temp"
                height="30"
                max-width="30"
              />
              <v-icon class="text--black ml-3">
                {{ expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <template v-for="(item, index) in dropdownItems">
              <v-divider v-if="item.divider" :key="index"> </v-divider>
              <v-list-item :light="true" v-else :key="index">
                <v-btn
                  style="width: 100%; height: 100%"
                  :to="item.link"
                  text
                  @click="item.click"
                  class="text-decoration-none text-left"
                  ><div style="width: 100%; text-align: start">
                    {{ item.label }}
                  </div></v-btn
                >
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<style>
.active {
  font-weight: 500;
  text-decoration: underline !important;
}
</style>
