<template>

  <div>
    <CommunityProfileButton display-name="Arnold" description="Muscle-Builder" variant="large" profile-pic="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
  </div>


</template>


<script>
import CommunityProfileButton from "../components/CommunityProfileButton.vue";
export default {
  components: {
    CommunityProfileButton
  },
  data() {
    return {
      sources: [abs, abslat, fle, estirar],
    };

  },
};
</script>