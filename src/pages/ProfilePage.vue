<template>
  <div class="fixed-center" v-if="isVisible == true">
    <q-card class="my-card" style="width: 550px">
      <q-card-section align="center">
        <q-icon name="person" size="100px" />
        <div class="text-h5">{{ name }}</div>
      </q-card-section>
      <q-card-section align="center">
        <p class="text-h6">Департамент: {{ department }}</p>
        <p class="text-h6">Электронная почта: {{ email }}</p>
        <!-- <p class="text-h6">Департамент: {{ department }}</p> -->
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="orange-13" icon="edit" no-caps label="Редактирование" />
        <q-btn
          color="deep-orange"
          no-caps
          icon="password"
          label="Сменить пароль"
        />
        <q-btn
          color="negative"
          no-caps
          icon="logout"
          label="Выход"
          @click="logout"
        />
      </q-card-actions>
    </q-card>
    <ChangePassword />
  </div>
</template>

<script setup>
import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import ChangePassword from "../components/Profile/ChangePassword.vue";
const name = ref("");
const department = ref("");
const email = ref("");
const $q = useQuasar();
const isVisible = ref(false);
const getInfo = async () => {
  try {
    $q.loading.show({
      message: "Подождите данные загружаются...",
      spinner: QSpinnerGears,
      messageColor: "white",
      backgroundColor: "black",
    });
    const response = await axios.get("http://localhost:5002/getInfo", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log(response.data);
    name.value = `${response.data.name} ${response.data.secondName}`;
    const departmentString = response.data.department;

    // Reformat the string to a valid JSON structure
    const formattedString = departmentString
      .replace(/=/g, ":")
      .replace(/{/g, '{"')
      .replace(/, /g, '", "')
      .replace(/:/g, '": "')
      .replace(/}/g, '"}');

    // Parse the formatted string
    const departmentParse = JSON.parse(formattedString);
    console.log(departmentParse.name);
    department.value = departmentParse.name;

    email.value = response.data.email;
    isVisible.value = true;
    $q.loading.hide();
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

onMounted(() => {
  getInfo();
});

const logout = () => {
  localStorage.clear();
  window.location.reload();
};
</script>

<style></style>
