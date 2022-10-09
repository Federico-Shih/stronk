import { defineStore } from "pinia";

export const useExPopupStore = defineStore("expopup", {
    state: () => ({
        show: false,
    }),
    actions: {
        showExPopup() {
            this.show = true;
        },
        hideExPopup() {
            this.show = false;
        },
    },
});
