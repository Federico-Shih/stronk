<script>
import { mapState } from "pinia";
import { useProfileStore } from "../stores/profile";
import logotype from "../assets/logotipo.png";
import temp from "../assets/cristiano.png";

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
        { label: "Configuración de cuenta", link: "" },
        { label: "Cambiar Idioma", link: "" },
        { label: "Cerrar sesión", link: "" },
      ],
      temp,
    };
  },
};
</script>

<template>
  <v-app-bar app color="primary">
    <router-link to="/">
      <v-img max-width="100" :src="logo" />
    </router-link>
    <router-link
      class="black--text ml-16 mt-2"
      v-for="link in ownedLinks"
      :key="link.link"
      :to="link.link"
      >{{ link.label }}</router-link
    >
    <v-spacer></v-spacer>
    <div v-if="!this.hasProfile">
      <v-btn class="mx-5" elevation="1" color="accent">Registrarse</v-btn>
      <v-btn elevation="1">Iniciar sesión</v-btn>
    </div>
    <div v-if="this.hasProfile">
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              rounded
              class="py-6"
              color="secondary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Bienvenido, Cristiano
              <v-img class="ml-2" :src="temp" max-width="30" />
              <v-icon class="text--black" left> mdi-chevron-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in dropdownItems" :key="index">
              <router-link :to="item.link"
                ><v-list-item-title>{{
                  item.label
                }}</v-list-item-title></router-link
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>
