<template>
  <v-main class="px-8">
    <v-row class="ml-8 d-flex flex-row justify-space-between">
      <v-col class="mr-16">
        <h1>Comunidad</h1>
        <search-bar title="¿Buscás a alguien en particular?"></search-bar>
        <div v-for="i in 3" :key="i">
          <!--hay que poner bien que el key sea el id, y que el id esté en data-->
          <router-link style="text-decoration: none; color: inherit;" to="/profile/1">
            <CommunityProfileButton
              variant="large"
              display-name="Arnold Schwarzenegger"
              description="Body Builder"
              profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
          </router-link>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-col class="mr-16 alignmentToTheRight">
        <h2 class="align-self-start">Recomendados</h2>
        <CommunityProfileButton
          variant="small"
          display-name="Arnold Schwarzenegger"
          :profile-pic="Abdos"
        />
        <div v-for="i in 3" :key="i">
          <router-link style="text-decoration: none; color: inherit;" to="/profile/1">
            <CommunityProfileButton
              variant="small"
              display-name="Arnold Schwarzenegger"
              profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import CommunityProfileButton from "../components/CommunityProfileButton.vue";
import abdos from "../assets/abdominallateral.jpg";
import SearchBar from "../components/SearchBar.vue";
export default {
  components: {
    CommunityProfileButton,
    SearchBar,
  },
  data() {
    return {
      Abdos: abdos,
    };
  },
};
</script>

<style>
.alignmentToTheRight {
  align-items: end;
  display: flex;
  flex-direction: column;
}
</style>
