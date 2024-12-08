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
        <p class="text-body1">«Автоматизация повесток и вызовов»</p>
      </div>
    </div>
    <div class="content">
      <q-card class="my-card" style="width: 50vw">
        <q-card-section align="center">
          <p class="text-h5">Авторизация</p>
        </q-card-section>
        <q-card-section class="q-px-xl">
          <q-input
            v-model="email"
            type="email"
            label="Напишите почту"
            hint="Например: example@gmail.com"
          />

          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Введите пароль"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions vertical class="q-px-xl">
          <q-btn color="positive" no-caps label="Войти" @click="login" />
          <q-btn
            no-caps
            flat
            color="primary"
            label="Нету аккаунта? "
            @click="pushToRegistrationPage"
          />
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
const password = ref("");
const isPwd = ref(true);

const login = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    const data = {
      email: email.value,
      password: password.value,
    };

    const jsonData = JSON.stringify(data);
    const response = await axios.post(`${serverUrl}login`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    Cookies.set("access_token", response.data.accessToken);
    Cookies.set("refresh_token", response.data.refreshToken);

    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Пользователь успешно вошел в систему");

    setTimeout(() => {
      router.push("/");
    }, 2500);
  } catch (error) {
    console.error("Error during registration:", error);
    $q.loading.hide();
    notifyStore.notifyError($q, `Ошибка при авторизации: ${error}`);
  }
};

const handleKeydown = (event) => {
  if (event.key === "Enter") {
    login();
  }
};

const pushToRegistrationPage = () => {
  router.push("/registration");
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
