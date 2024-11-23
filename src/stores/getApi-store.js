// stores/userStore.js
import { defineStore } from "pinia";
import axios from "axios";

// stores/userStore.js
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    role: null,
  }),
  actions: {
    async getUserInfo() {
      try {
        const response = await axios.get(`http://localhost:5002/getInfo`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });

        this.userInfo = response.data;
        this.role = response.data.job.name;
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    },
  },
  getters: {
    getRole: (state) => state.role,
  },
});
