import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    profile: {},
  }),
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
  },
  getters: {
    hasProfile() {
      return Object.keys(this.profile).length !== 0;
    },
  },
});
