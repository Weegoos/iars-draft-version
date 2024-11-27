<template>
  <div>
    <section class="q-gutter-md" align="right">
      <q-btn
        color="primary"
        no-caps
        label="Скачать в формате pdf"
        @click="downloadPdf"
      />
      <q-btn
        color="primary"
        no-caps
        label="Скачать в формате excel"
        @click="downloadExcel"
      />
    </section>
    <section class="q-mt-md">
      <AdminConclusion />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AdminConclusion from "../components/Admin/AdminConclusion.vue";
import { useRouter } from "vue-router";
import axios from "axios";

import { getCurrentInstance } from "vue";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { QSpinnerGears, useQuasar } from "quasar";

const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;
const userStore = useUserStore();
const notifyStore = useNotifyStore();

const accessToken = localStorage.getItem("accessToken");

onMounted(() => {
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  }
});

const downloadPdf = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const iin = data.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    const response = await axios.get(
      `${serverUrl}pdf?IIN=${iin}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `User_${iin}.pdf`;
    link.click();

    $q.loading.hide();
    notifyStore.nofifySuccess($q, "PDF успешно загружен");
  } catch (error) {
    $q.loading.hide();
    notifyStore.notifyError($q, `Ошибка при загрузке PDF: ${error}`);
  }
};

const downloadExcel = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const iin = data.iin;
    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    const response = await axios.get(`${serverUrl}excel?IIN=${iin}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob",
      withCredentials: true,
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `User_${iin}.xlsx`;
    link.click();

    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Excel успешно загружен");
  } catch (error) {
    $q.loading.hide();
    notifyStore.notifyError($q, `Ошибка при загрузке Excel: ${error}`);
  }
};
</script>

<style scoped></style>
