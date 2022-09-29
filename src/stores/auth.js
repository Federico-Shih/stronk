import { defineStore } from "pinia";

export const Popup = { REGISTER: "register", LOGIN: "login" };

export const usePopupStore = defineStore("popup", {
  state: () => ({
    show: false,
    onAuthRoute: "/",
    popupType: Popup.REGISTER,
  }),
  actions: {
    showPopup(url, type) {
      this.show = true;
      this.onAuthRoute = url;
      this.popupType = type;
    },
    hidePopup() {
      this.show = false;
    },
  },
});
