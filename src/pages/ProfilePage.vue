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
          {{ userEmail }}
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
import { useUserStore } from "src/stores/getApi-store";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;
const $q = useQuasar();
const userStore = useUserStore();
const accessToken = localStorage.getItem("accessToken");

const name = ref("");
const department = ref("");
const userEmail = ref("");
const job = ref("");
const registrationDate = ref("");
const isVisible = ref(false);

const getProfile = async () => {
  console.log(accessToken);
  try {
    $q.loading.show({
      message: "Подождите, данные загружаются...",
      spinner: QSpinnerGears,
      messageColor: "white",
      backgroundColor: "black",
    });

    await userStore.getUserInfo();
    const userInfo = userStore.userInfo;

    const response = await axios.get(
      `${serverUrl}profile?IIN=${userInfo.iin}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data) {
      console.log(response.data);
      userEmail.value = response.data.email;
      name.value = `${response.data.name} ${response.data.secondName}`;
      department.value = response.data.department || "Не указано";
      job.value = response.data.jobTitle || "Не указано";

      registrationDate.value = response.data.registrationDate || "Не указано";
      isVisible.value = true;
    } else {
      console.error("Профиль пуст.");
    }
  } catch (error) {
    console.error("Ошибка при получении данных профиля:", error);
    $q.notify({
      type: "negative",
      message: "Ошибка при загрузке профиля. Попробуйте снова.",
    });
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  getProfile();
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  }
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
