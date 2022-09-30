<template>
  <v-main class="px-8">
    <v-row class="ml-8 d-flex flex-row justify-space-between">
      <v-col class="mr-16">
        <h1>Comunidad</h1>
        <search-bar title="¿Buscás a alguien en particular?"></search-bar>
        <CommunityProfileButton
          variant="large"
          display-name="Arnold Schwarzenegger"
          description="Body Builder"
          profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
        <CommunityProfileButton
          variant="large"
          display-name="Arnold Schwarzenegger"
          description="Body Builder"
          profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
        <CommunityProfileButton
          variant="large"
          display-name="Arnold Schwarzenegger"
          description="Body Builder"
          profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
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
        <CommunityProfileButton
          variant="small"
          display-name="Arnold Schwarzenegger"
          profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
        <CommunityProfileButton
          variant="small"
          display-name="Arnold Schwarzenegger"
          profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
        <CommunityProfileButton
          variant="small"
          display-name="Arnold Schwarzenegger"
          profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
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
