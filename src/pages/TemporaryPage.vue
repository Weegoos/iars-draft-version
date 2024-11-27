<template>
  <div>Temporary conclusion page</div>
</template>

<script setup>
import { QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const userStore = useUserStore();
const notifyStore = useNotifyStore();
const $q = useQuasar();

const getTemporaryConclusion = async () => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const response = await axios.get(`${serverUrl}temps?IIN=${data.iin}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log(response.data);
    notifyStore.nofifySuccess($q, "Временные заключении успешно загружены");
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    console.log(error);
    notifyStore.notifyError($q, `Ошибка при получении заключении: ${error}`);
  }
};

onMounted(() => {
  getTemporaryConclusion();
});
</script>

<style></style>
