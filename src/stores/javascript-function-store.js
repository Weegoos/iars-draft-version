import { defineStore } from "pinia";

export const useJavaScriptFunction = defineStore("javascript", {
  actions: {
    formatDate(inputDate) {
      if (!inputDate) return "Не указано";
      const date = new Date(inputDate);
      const yy = String(date.getFullYear()).slice(0);
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `Дата: ${yy}-${mm}-${dd} Время: ${hours}:${minutes}`;
    },
  },
});
