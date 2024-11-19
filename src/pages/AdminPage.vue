<template>
  <div>
    <section class="text-center q-gutter-md">
      <q-btn
        color="primary"
        no-caps
        label="Все пользователи"
        @click="pushToAdminUser"
      />
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
        @click="onClick"
      />
    </section>
    <section>
      <AdminConclusion />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AdminConclusion from "../components/Admin/AdminConclusion.vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const pushToAdminUser = () => {
  router.push("/admin-user");
};

const getInfo = async () => {
  try {
    const response = await axios.get("http://localhost:5002/getInfo", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных о пользователе:", error);
    throw error;
  }
};

const downloadPdf = async () => {
  try {
    // Получение данных о пользователе
    const data = await getInfo();
    const iin = data?.iin; // Извлечение IIN (проверьте точное название поля в данных)

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    // Запрос на сервер для создания и загрузки PDF
    const response = await axios.get(
      `http://localhost:5002/pdf?IIN=${iin}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Добавить токен
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
        responseType: "blob", // Получение файла в формате blob
        withCredentials: true,
      }
    );

    // Создание ссылки для загрузки файла
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `User_${iin}.pdf`;
    link.click();

    console.log("PDF успешно загружен.");
  } catch (error) {
    console.error("Ошибка при загрузке PDF:", error);
  }
};
</script>

<style></style>
