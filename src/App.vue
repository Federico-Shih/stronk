<template>
  <v-app class="app">
    <NavBar/>
    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import RoutineButton from "./components/RoutineButton.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    RoutineButton,
    NavBar,
  }
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
