<template>
  <div>
    <section v-if="role === 'Сотрудник СУ'">
      <CardPage />
    </section>
    <section v-else-if="role === 'Аналитик СД'">
      <AnalyticsPage />
    </section>
    <section v-else-if="role === 'Модератор'">
      <AdminPage />
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import CardPage from "../pages/CardPage.vue";
import AnalyticsPage from "../pages/AnalyticsPage.vue";
import AdminPage from "../pages/AdminPage.vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const role = ref("");

const getInfo = async () => {
  try {
    const response = await axios.get(`${serverUrl}getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data.job.name);
    role.value = response.data.job.name;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

onMounted(() => {
  getInfo();
});
</script>

<style></style>
