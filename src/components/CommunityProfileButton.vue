<template>
  <v-card shaped elevation="2" class="community-profile-long align-end"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          :elevation="hover ? 5 : 2" >
    <v-list-item>
      <v-list-item-avatar size="75"><v-img :src="profilePic" class="rounded-circle" ></v-img></v-list-item-avatar>
      <div>
        <v-card-title>{{displayName}}</v-card-title>
        <v-card-subtitle> {{description}}</v-card-subtitle>
      </div>
    </v-list-item>
    <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>



<script>
export default {
  name: "CommunityProfileButton",
  props: {
    variant: String,
    displayName: String,
    description: String,
    profilePic: String,
    profileId: String,
  },
  data(){
    return{
      hover: false,


    }
  }

};

</script>
<style scoped>

.community-profile-long{
  width: 500px;
  height: 100px;
  margin: 10px 5px;
}
</style>

