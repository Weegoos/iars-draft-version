<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
      v-model:pagination="pagination"
    />

    <AdminDetailedInformation
      :isOpenAdminDialogPage="isOpenAdminDialogPage"
      @closeAdminDialogPage="closeAdminDialogPage"
      :conclusionDetailedInformation="conclusionDetailedInformation"
    />
  </div>
</template>

<script setup>
import AdminDetailedInformation from "./DetailedInformation/AdminDetailedInformation.vue";

import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const $q = useQuasar();
const notifyStore = useNotifyStore();
const javascriptFunction = useJavaScriptFunction();

const pagination = ref({ rowsPerPage: 0 });
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
    format: (val) => javascriptFunction.formatDate(val),
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
const isOpenAdminDialogPage = ref(false);
const conclusionDetailedInformation = ref("");

const viewDetailedInformation = (evt, row, index) => {
  isOpenAdminDialogPage.value = true;
  conclusionDetailedInformation.value = row;
};

const closeAdminDialogPage = () => {
  isOpenAdminDialogPage.value = false;
};

const getAllConclusion = async () => {
  notifyStore.loading($q, "Подождите, документы загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverUrl}admin/allConclusions`, {
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
    notifyStore.nofifySuccess($q, "Все заключении успешно загружены");
    $q.loading.hide();
  } catch (error) {
    console.error("Ошибка при получении всех документов:", error);
    throw error;
  }
};

onMounted(() => {
  getAllConclusion();
});
</script>

<style></style>
