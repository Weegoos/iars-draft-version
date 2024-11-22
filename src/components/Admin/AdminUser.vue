<template>
  <div>
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
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
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const $q = useQuasar();
const notifyStore = useNotifyStore();

const columns = [
  {
    name: "id",
    label: "№",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "name",
    label: "Имя",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "surname",
    label: "Фамилия",
    align: "left",
    field: "secondName",
    sortable: true,
  },
  {
    name: "email",
    label: "Почта",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "iin",
    label: "ИИН",
    align: "left",
    field: "iin",
    sortable: true,
  },
  {
    name: "registrationDate",
    label: "Дата регистрации",
    align: "left",
    field: "registrationDate",
    sortable: true,
  },
  {
    name: "department",
    label: "Департамент",
    align: "left",
    field: (user) => user.department.name,
    sortable: true,
  },
  {
    name: "region",
    label: "Регион",
    align: "left",
    field: (user) => user.department.region,
    sortable: true,
  },
  {
    name: "jobTitle",
    label: "Должность",
    align: "left",
    field: (user) => user.jobTitle.name,
    sortable: true,
  },
  {
    name: "conclusions",
    label: "Количество документов",
    align: "center",
    field: (user) => user.conclusions.length,
    sortable: true,
  },
];

const rows = ref([]);
const isOpenAdminDialogPage = ref(false);
const conclusionDetailedInformation = ref("");

const getAllUsers = async () => {
  notifyStore.loading($q, "Данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverUrl}allUsers`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    rows.value = response.data.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    $q.loading.hide();
  } catch (error) {
    console.error("Ошибка при получении всех пользователей:", error);
    throw error;
  }
};

onMounted(() => {
  getAllUsers();
});

const promoteUser = async (item) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${serverUrl}admin/promote?IIN=${item.iin}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("IIN:", item.iin);
    console.log("Ответ сервера:", response.data);

    $q.notify({
      message: `Пользователь ${item.name} ${item.secondName} успешно повышен в должности`,
      icon: "check",
      color: "positive",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка при повышении:", error.response || error);
  }
};

const viewDetailedInformation = (evt, row, index) => {
  console.log(row);
};

const closeAdminDialogPage = () => {
  isOpenAdminDialogPage.value = false;
};
</script>

<style scoped></style>
