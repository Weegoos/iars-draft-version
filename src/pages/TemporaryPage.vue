<template>
  <div class="q-pa-md">
    <p class="text-h5 text-bold text-center">Временные заключении</p>
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
    />
    <DetailedInformation
      :isOpenDialog="isOpenDialog"
      :conclusionDetailedInformation="conclusionDetailedInformation"
      @closeAdminDialogPage="closeAdminDialogPage"
    />
  </div>
</template>

<script setup>
import { event, QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, onMounted, ref } from "vue";

import DetailedInformation from "../components/TemporaryConclusion/DetailedInformation.vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const userStore = useUserStore();
const notifyStore = useNotifyStore();
const $q = useQuasar();

const isOpenDialog = ref(false);
const conclusionDetailedInformation = ref("");
const viewDetailedInformation = (evt, row, index) => {
  isOpenDialog.value = true;
  conclusionDetailedInformation.value = row;
};

const closeAdminDialogPage = () => {
  isOpenDialog.value = false;
};

const columns = [
  {
    name: "id",
    required: true,
    label: "Порядковый номер",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "creationDate",
    align: "center",
    label: "Дата создания документа",
    field: "creationDate",
    sortable: true,
  },
  {
    name: "registrationNumber",
    align: "center",
    label: "Регистрационный номер",
    field: "registrationNumber",
    sortable: true,
  },
  {
    name: "udNumber",
    align: "center",
    label: "Номер УД",
    field: "udNumber",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Статус документа",
    field: "status",
    sortable: true,
  },
  {
    name: "calledPersonFullName",
    align: "center",
    label: "ФИО вызываемого",
    field: "calledPersonFullName",
    sortable: true,
  },
  {
    name: "defenseAttorneyFullName",
    align: "center",
    label: "ФИО согласующего",
    field: "defenseAttorneyFullName",
    sortable: true,
  },
];

const rows = ref([]);
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

    rows.value = response.data.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    notifyStore.nofifySuccess($q, "Временные заключении успешно загружены");
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    console.error(error);
    notifyStore.notifyError($q, `Ошибка при получении заключении: ${error}`);
  }
};

onMounted(() => {
  if (localStorage.getItem("accessToken")) {
    getTemporaryConclusion();
  } else {
    localStorage.clear();
    window.location.href = "http://localhost:9000/#/authorization";
  }
});
</script>

<style></style>
