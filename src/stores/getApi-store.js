// stores/userStore.js
import { defineStore } from "pinia";
import axios from "axios";

// stores/userStore.js
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    role: null,
    allNames: null,
    allStatus: null,
    allUD: null,
    allRegions: null,
    allDepartments: null,
    allActions: null,
    serverUrl: "http://localhost:5002/",
  }),
  actions: {
    async getUserInfo() {
      try {
        const response = await axios.get(`${this.serverUrl}getInfo`, {
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
        localStorage.clear();
      }
    },
    async getAllNames() {
      try {
        const response = await axios.get(`${this.serverUrl}allNames`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });

        this.allNames = response.data;
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    },
    async getAllStatus() {
      try {
        const response = await axios.get(`${this.serverUrl}allStatus`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });
        this.allStatus = response.data;
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    },
    async getAllUD() {
      try {
        const response = await axios.get(`${this.serverUrl}allUD`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });
        this.allUD = response.data;
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    },
    async getAllRegions() {
      try {
        const response = await axios.get(`${this.serverUrl}allRegions`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });
        this.allRegions = response.data;
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    },
    async getAllDepartments() {
      try {
        const response = await axios.get(`${this.serverUrl}allDepartments`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });
        this.allDepartments = response.data;
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    },
    async getAllActions() {
      try {
        const response = await axios.get(`${this.serverUrl}allActions`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });
        this.allActions = response.data;
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    },
  },
  getters: {
    getRole: (state) => state.role,
  },
});
