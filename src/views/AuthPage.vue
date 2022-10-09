<template>
  <div></div>
</template>

<script>
import { useProfileStore } from "../stores/profile";
import { Popup, usePopupStore } from "../stores/auth";

export default {
  created() {
    const profile = useProfileStore();
    if (!profile.getToken) {
      const login = usePopupStore();
      login.showPopup(this.$route.query.to || "/", Popup.LOGIN);
    } else {
      this.$router.replace(`${this.$route.query.to}` || "/");
    }
  }
};
</script>
