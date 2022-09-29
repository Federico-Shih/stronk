<template>
  <v-app class="app">
    <NavBar />
    <v-main class="main">
      <router-view />
    </v-main>
    <AuthPopup />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import AuthPopup from "./components/AuthPopup.vue";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    AuthPopup,
    NavBar,
  },
};
</script>

<style>
.main {
  width: 100vw;
}
.app {
  position: absolute;
  left: 0;
}
</style>
