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
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const allConclusion = ref([]); // Изменено на массив

// Определение столбцов для таблицы
const columns = [
  {
    name: "id",
    required: true,
    label: "Порядковый номер",
    align: "left",
    field: (row) => row,
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

// Строки для таблицы, которые будут заполняться динамически
const rows = ref([]);

// Стейты для модального окна
const isOpenAdminDialogPage = ref(false);
const conclusionDetailedInformation = ref("");

// Функция для открытия модального окна с деталями
const viewDetailedInformation = (evt, row, index) => {
  isOpenAdminDialogPage.value = true;
  conclusionDetailedInformation.value = row;
  console.log(row);
};

// Функция для закрытия модального окна
const closeAdminDialogPage = () => {
  isOpenAdminDialogPage.value = false;
};

// Получение данных с сервера
const getAllConclusion = async () => {
  try {
    const response = await axios.get(`${serverUrl}admin/allConclusions`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    // Преобразуем данные в нужный формат для таблицы
    rows.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении всех документов:", error);
    throw error;
  }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  getAllConclusion();
});
</script>

<style>
/* Добавьте необходимые стили для таблицы или других компонентов */
</style>
