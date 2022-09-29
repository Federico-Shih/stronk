<template>
  <v-card shaped elevation="2" class="community-profile-long align-end"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          :elevation="hover ? 5 : 2"
        :class="variants.boxSizes[variant]">
    <v-list-item>
      <v-list-item-avatar :size="(variant==='large')? 75:50"><v-img :src="profilePic" class="rounded-circle "></v-img></v-list-item-avatar>
      <div>
        <v-card-title :class="variants.fontSizes[variant]">{{displayName}}</v-card-title>
        <v-card-subtitle v-show="variant==='large'"> {{description}}</v-card-subtitle>
      </div>
      <v-icon right large class="ml-auto">mdi-chevron-right</v-icon>
    </v-list-item>

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
      variants:{
        boxSizes: {
          large: "community-profile-button-large",
          small: "community-profile-button-small"
        },
        fontSizes: {
          large: "community-profile-font-large",
          small: "community-profile-font-small",
        },
      }

    }
  }

};

</script>
<style scoped>

.community-profile-button-large{
  width: 550px;
  height: 100px;
  margin: 10px 5px;
}
.community-profile-button-small{
  width: 400px;
  height: 75px;
  margin:10px 5px;

}
.community-profile-font-large{
  font-size: 1.8em;
}
.community-profile-font-small{
  font-size: 1.2em;
}
</style>

