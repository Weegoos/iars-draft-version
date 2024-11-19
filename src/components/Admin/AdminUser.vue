<template>
  <div>
    <section v-for="(items, index) in allusers" :key="index" class="q-mt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { onMounted, ref } from "vue";

import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const $q = useQuasar();

const allusers = ref("");
const getAllUsers = async () => {
  $q.loading.show({
    message: "Данные загружаются...",
    backgroundColor: "black",
    spinner: QSpinnerGears,
  });
  try {
    const response = await axios.get(`${serverUrl}allUsers`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    allusers.value = response.data;
    $q.loading.hide();
  } catch (error) {
    console.error("Ошибка при получении всех документов:", error);
    throw error;
  }
};

onMounted(() => {
  getAllUsers();
});
</script>

<style></style>
