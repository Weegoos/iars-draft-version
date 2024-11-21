import { defineStore } from "pinia";

export const useNotifyStore = defineStore("notify", {
  actions: {
    nofifySuccess($q, message) {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: message,
      });
    },
  },
});
