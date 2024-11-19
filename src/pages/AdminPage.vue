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
        @click="downloadExcel"
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
    const data = await getInfo();
    const iin = data?.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    const response = await axios.get(
      `http://localhost:5002/pdf?IIN=${iin}`,

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

    console.log("PDF успешно загружен.");
  } catch (error) {
    console.error("Ошибка при загрузке PDF:", error);
  }
};

const downloadExcel = async () => {
  try {
    const data = await getInfo();
    const iin = data?.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    const response = await axios.get(`http://localhost:5002/excel?IIN=${iin}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME для Excel
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

    console.log("Excel успешно загружен.");
  } catch (error) {
    console.error("Ошибка при загрузке Excel:", error);
  }
};
</script>

<style></style>
