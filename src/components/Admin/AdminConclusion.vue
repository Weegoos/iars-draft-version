<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const allConclusion = ref("");
const getAllConclusion = async () => {
  try {
    const response = await axios.get(`${serverUrl}admin/allConclusions`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    allConclusion.value = response.data;
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
