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
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import CardPage from "../pages/CardPage.vue";
import AnalyticsPage from "../pages/AnalyticsPage.vue";
import AdminPage from "../pages/AdminPage.vue";
import { useNotifyStore } from "src/stores/notify-store";
import { QSpinnerGears, useQuasar } from "quasar";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;
const notifyStore = useNotifyStore();
const $q = useQuasar();

const role = ref("");

const getInfo = async () => {
  try {
    notifyStore.loading(
      $q,
      "Подождите данные о пользователе загружаются...",
      QSpinnerGears
    );
    const response = await axios.get(`${serverUrl}getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data.job.name);
    role.value = response.data.job.name;
    localStorage.setItem("role", role.value);
    $q.loading.hide();
  } catch (error) {
    notifyStore.notifyError(
      $q,
      `Ошибка при получении данных пользователя: ${error}`
    );
    $q.loading.hide();
    console.error("Ошибка при получении данных пользователя:", error);
    localStorage.clear();
    window.location.reload();
    throw error;
  }
};

const accessToken = localStorage.getItem("accessToken");
onMounted(() => {
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  } else {
    getInfo();
  }
});
</script>

<style></style>
