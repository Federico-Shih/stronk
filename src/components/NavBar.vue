<script>
import { mapActions, mapState } from "pinia";
import { useProfileStore } from "../stores/profile";
import AuthPopup from "./AuthPopup.vue";
import logotype from "../assets/logotipo.png";
import temp from "../assets/cristiano.png";
import { usePopupStore } from "../stores/auth";

export default {
  name: "NavBar",
  computed: {
    ...mapState(useProfileStore, ["profile"]),
    ...mapState(useProfileStore, ["hasProfile"]),
    ownedLinks() {
      return this.links.filter((link) =>
        link.protected ? this.hasProfile : true
      );
    },
  },
  data() {
    return {
      logo: logotype,
      links: [
        { label: "Explorar", link: "/explore" },
        { label: "Comunidad", link: "/community" },
        { label: "Mis rutinas", link: "/routines", protected: true },
        { label: "Mis ejercicios", link: "/exercises", protected: true },
        { label: "Mi perfil", link: "/profile", protected: true },
      ],
      dropdownItems: [
        { label: "Configuración de cuenta", link: "", click: () => {} },
        { divider: true },
        { label: "Cambiar Idioma", link: "", click: () => {} },
        { divider: true },
        {
          label: "Cerrar sesión",
          link: "",
          click: () => {
            this.logout();
          },
        },
      ],
      temp,
      expanded: false,
    };
  },
  methods: {
    setExpanded(value) {
      this.expanded = value;
    },
    ...mapActions(usePopupStore, ["showPopup"]),
    ...mapActions(useProfileStore, ["logout"]),
  },
  watch: {
    hasProfile(curr) {
      if (curr) {
        this.expanded = false;
      }
    },
  },
};
</script>

<template>
  <v-app-bar app color="primary">
    <router-link to="/">
      <v-img max-width="100" :src="logo" />
    </router-link>
    <router-link
      v-for="{ link, label } in ownedLinks"
      :key="link"
      :to="link"
      class="black--text ml-16 mt-2 text-decoration-none"
      active-class="active"
      >{{ label }}</router-link
    >
    <v-spacer></v-spacer>
    <div v-if="!this.hasProfile">
      <v-btn
        class="mx-5"
        elevation="1"
        color="accent"
        @click="showPopup('/', 'register')"
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
              class="py-6"
              :dark="!expanded"
              v-bind="attrs"
              v-on="on"
              @click="setExpanded(!expanded)"
            >
              Bienvenido, Cristiano
              <v-img class="ml-2" :src="temp" max-width="30" />
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
  font-weight: bolder;
}
</style>
