<template>

  <v-container style="{width: 100%;}">
    <v-row class="mt-4">
      <v-col class="ml-auto pr-8" >
        <h1>Comunidad</h1>
        <v-text-field placeholder="¿Buscás a alguien en particular?" append-icon="mdi-magnify" background-color="#D1d0d6"  outlined class="rounded-lg"></v-text-field>
        <CommunityProfileButton variant="large" display-name="Arnold Schwarzenegger" description="Body Builder" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <CommunityProfileButton variant="large" display-name="Arnold Schwarzenegger" description="Body Builder" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <CommunityProfileButton variant="large" display-name="Arnold Schwarzenegger" description="Body Builder" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      </v-col>
      <v-divider
          vertical
      ></v-divider>
      <v-col class="mr-auto pl-8">
        <h2>Recomendados</h2>
        <CommunityProfileButton variant="small" display-name="Arnold Schwarzenegger" :profile-pic="Abdos" />
        <CommunityProfileButton variant="small" display-name="Arnold Schwarzenegger" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <CommunityProfileButton variant="small" display-name="Arnold Schwarzenegger" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        <CommunityProfileButton variant="small" display-name="Arnold Schwarzenegger" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      </v-col>
    </v-row>
  </v-container>

</template>


<script>
import CommunityProfileButton from "../components/CommunityProfileButton.vue";
import abdos from "../assets/abdominallateral.jpg"
export default {
  components: {
    CommunityProfileButton
  },
  data() {
    return {
      Abdos: abdos,
    };

  },
};
</script>