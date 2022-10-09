import { defineStore } from "pinia";

export const useExPopupStore = defineStore("expopup", {
    state: () => ({
        show: false,
        index: 0
    }),
    actions: {
        showExPopup(index) {
            this.show = true;
            this.index = index;
        },
        hideExPopup() {
            this.show = false;
        },
    },
});
