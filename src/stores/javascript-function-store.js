import { defineStore } from "pinia";

export const useJavaScriptFunction = defineStore("javascript", {
  actions: {
    formatDate(inputDate) {
      if (!inputDate) return "Не указано";

      const date = new Date(inputDate);

      // Названия месяцев
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];

      const day = String(date.getDate()).padStart(2, "0");
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `Дата: ${day} ${month} ${year} года. Время: ${hours}:${minutes}`;
    },
  },
});
