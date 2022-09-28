<template>
  <v-app class="app">
    <NavBar />
<!--      <RoutineButton title="tumama" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>-->
    <v-main class="main">
      <router-view />
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
