<template>
  <div
    class="fixed-center"
    style="display: flex; height: 100vh; width: 100vw"
    @keydown="handleKeydown"
  >
    <div
      style="
        flex: 1;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
      "
    >
      <video
        src="../assets/video/background.mp4"
        autoplay
        muted
        loop
        playsinline
        style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        "
      ></video>

      <div class="typewriter">
        <p class="text-body1">«Проверьте почту после сброса пароля!»</p>
      </div>
    </div>
    <div class="content">
      <q-card class="my-card" style="width: 50vw">
        <q-card-section align="center">
          <p class="text-h5">Сброс пароля</p>
        </q-card-section>
        <q-card-section class="q-px-xl">
          <q-input
            v-model="email"
            type="email"
            label="Напишите почту"
            hint="Например: example@gmail.com"
          />
        </q-card-section>
        <q-card-actions vertical class="q-px-xl">
          <q-btn color="positive" no-caps label="Сброс" @click="reset" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { QSpinnerGears, useQuasar, Cookies } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { useNotifyStore } from "src/stores/notify-store";

// global variable
const { proxy } = getCurrentInstance();
const $q = useQuasar();
const serverUrl = proxy.$serverUrl;
const router = useRouter();
const notifyStore = useNotifyStore();

// login
const email = ref("");

const reset = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);

  try {
    const response = await axios.put(
      `${serverUrl}reset-password?email=${email.value}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("Ответ сервера:", response.data);
    $q.loading.hide();
    notifyStore.nofifySuccess(
      $q,
      "Ссылка для сброса пароля отправлена на почту"
    );

    setTimeout(() => {
      router.push("/");
    }, 2500);
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error);
    $q.loading.hide();
    notifyStore.notifyError(
      $q,
      `Ошибка: ${error.response?.data || error.message}`
    );
  }
};

const handleKeydown = (event) => {
  if (event.key === "Enter") {
    reset();
  }
};

const pushToRegistrationPage = () => {
  router.push("/registration");
};

const pushToResetPassword = () => {
  router.push("/reset-password");
};
</script>

<style scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
