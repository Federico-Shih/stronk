<template>
  <v-app class="app">
    <NavBar />
    <v-main class="main">
      <div class="pt-10">
        <router-view :key="$route.fullPath" />
      </div>
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
