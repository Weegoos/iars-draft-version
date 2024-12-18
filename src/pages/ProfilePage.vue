<template>
  <div class="fixed-center" v-if="isVisible == true">
    <q-card class="my-card" style="width: 550px">
      <q-card-section align="center">
        <q-img
          v-if="userImg"
          :src="userImg"
          :ratio="16 / 9"
          spinner-color="primary"
          spinner-size="82px"
          @click="imgClick"
        />
        <div v-else>
          <q-img
            src="../assets/img/profile.jpg"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            @click="imgClick"
          />
        </div>
        <div class="text-h5">{{ name }} - {{ job.name }}</div>
      </q-card-section>
      <q-card-section align="center">
        <p class="text-h6">
          <span class="text-bold">Электронная почта:</span>
          {{ userEmail }}
        </p>
        <p class="text-h6">
          <span class="text-bold">Дата регистрации:</span>
          {{ formattedDate }}
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
    <ChangeProfileImg
      :openChangeImg="openChangeImg"
      @close="close"
      :iin="iin"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";

import ChangePassword from "../components/Profile/ChangePassword.vue";
import EditPage from "../components/Profile/EditPage.vue";
import ChangeProfileImg from "../components/Profile/ChangeProfileImg.vue";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { useJavaScriptFunction } from "src/stores/javascript-function-store";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;
const $q = useQuasar();
const userStore = useUserStore();
const notifyStore = useNotifyStore();
const javascriptStore = useJavaScriptFunction();
const accessToken = Cookies.get("access_token");

const name = ref("");
const department = ref("");
const userEmail = ref("");
const job = ref("");
const registrationDate = ref("");
const formattedDate = computed(() =>
  javascriptStore.formatDate(registrationDate.value)
);
const isVisible = ref(false);
const openChangeImg = ref(false);

const imgClick = () => {
  openChangeImg.value = true;
};

const close = () => {
  openChangeImg.value = false;
};

const iin = ref("");
const getProfile = async () => {
  try {
    if (Cookies.get("access_token")) {
      notifyStore.loading(
        $q,
        "Подождите, данные загружаются...",
        QSpinnerGears
      );
    }

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

    getImg(response.data.profileImage);
    iin.value = response.data.iin;

    if (response.data) {
      userEmail.value = response.data.email;
      name.value = `${response.data.name} ${response.data.secondName}`;
      department.value = response.data.department || "Не указано";
      job.value = response.data.jobTitle || "Не указано";
      registrationDate.value = response.data.registrationDate;
      isVisible.value = true;
      notifyStore.nofifySuccess($q, "Данные успешно загружены");
    } else {
      notifyStore.notifyError($q, "Профиль пуст");
    }
  } catch (error) {
    console.error("Ошибка при получении данных профиля:", error);
    notifyStore.notifyError(
      $q,
      `Ошибка при загрузке профиля. Попробуйте снова. ${error}`
    );
  } finally {
    $q.loading.hide();
  }
};

const userImg = ref("");
const getImg = async (field) => {
  try {
    const response = await axios.get(`${serverUrl}image/${field}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "arraybuffer",
      withCredentials: true,
    });

    const blob = new Blob([response.data], { type: "image/webp" });
    const objectUrl = URL.createObjectURL(blob);

    userImg.value = objectUrl;
  } catch (error) {
    console.error("Ошибка при загрузке изображения:", error);
  }
};
onMounted(() => {
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  } else {
    getProfile();
  }
});

const logout = () => {
  Cookies.remove("access_token");
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
