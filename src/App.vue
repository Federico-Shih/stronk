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
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;1,200;1,600&display=swap");
.main {
  width: 100vw;
}
.app {
  position: absolute;
  font-family: "Kanit","Roboto","sans-serif" !important;
  left: 0;
}
</style>
