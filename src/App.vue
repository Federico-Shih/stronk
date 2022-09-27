<template>
  <v-app>
    <v-app-bar app color="primary" dark>hola</v-app-bar>
    <v-main>
      <RoutineButton title="tumama" image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import RoutineButton from "./components/RoutineButton.vue";


export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    RoutineButton
  }
};
</script>
