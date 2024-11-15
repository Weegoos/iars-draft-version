<template>
  <div class="fixed-center" v-if="isVisible == true">
    <q-card class="my-card" style="width: 550px">
      <q-card-section align="center">
        <q-icon name="person" size="100px" />
        <div class="text-h5">{{ name }} - {{ job.name }}</div>
      </q-card-section>
      <q-card-section align="center">
        <p class="text-h6">
          <span class="text-bold">Электронная почта:</span>
          {{ email }}
        </p>
        <p class="text-h6">
          <span class="text-bold">Дата регистрации:</span>
          {{ registrationDate }}
        </p>
        <p class="text-h6">
          <span class="text-bold">Департамент:</span> {{ department.name }}
        </p>
        <p class="text-h6">
          <span class="text-bold">Регион:</span> {{ department.region }}
        </p>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="orange-13"
          icon="edit"
          no-caps
          label="Редактирование"
          @click="openEditDialog"
        />
        <q-btn
          color="deep-orange"
          no-caps
          icon="password"
          label="Сменить пароль"
          @click="openDialog"
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
    <ChangePassword
      :changePasswordStatus="changePasswordStatus"
      @closeDialog="closeDialog"
    />
    <EditPage :editDialog="editDialog" @closeEditDialog="closeEditDialog" />
  </div>
</template>

<script setup>
import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

import ChangePassword from "../components/Profile/ChangePassword.vue";
import EditPage from "../components/Profile/EditPage.vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const name = ref("");
const department = ref("");
const email = ref("");
const job = ref("");
const registrationDate = ref("");
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
    const response = await axios.get(`${serverUrl}getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log(response.data);
    name.value = `${response.data.name} ${response.data.secondName}`;
    const departmentString = response.data.department;

    department.value = departmentString;

    email.value = response.data.email;
    job.value = response.data.job;
    registrationDate.value = response.data.registrationDate;
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

const changePasswordStatus = ref(false);
const openDialog = () => {
  changePasswordStatus.value = true;
};

const closeDialog = () => {
  changePasswordStatus.value = false;
};

const editDialog = ref(false);
const openEditDialog = () => {
  editDialog.value = true;
};

const closeEditDialog = () => {
  editDialog.value = false;
};
</script>

<style></style>
