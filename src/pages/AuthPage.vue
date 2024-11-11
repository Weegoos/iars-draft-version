<template>
  <div class="fixed-center">
    <q-card class="my-card" style="width: 50vw">
      <q-card-section align="center">
        <p class="text-h5">Авторизация</p>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="email"
              type="email"
              label="Напишите почту"
              hint="Например: example@gmail.com"
            />
          </div>
          <div class="col">
            <q-input
              v-model="password"
              type="password"
              label="Напишите пароль"
              hint="Не менее 8 символов"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="positive" no-caps label="Войти" @click="login" />
        <q-btn
          no-caps
          color="primary"
          label="Нету аккаунта?"
          @click="pushToRegistrationPage"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const $q = useQuasar();
const login = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value,
    };

    console.log(data);

    const jsonData = JSON.stringify(data);

    const response = await axios.post("http://localhost:5002/login", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(
      "The user has successfully logged in",
      response.data.accessToken
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    $q.notify({
      message: `The user has successfully logged in`,
      color: "positive",
      icon: "check",
    });
    setTimeout(() => {
      router.push("/");
    }, 2500);
  } catch (error) {
    console.error("Error during registration:", error);
    $q.notify({
      message: `Error during authorization: ${error.response.data.error}`,
      color: "negative",
      icon: "error",
    });
  }
};

const router = useRouter();
const pushToRegistrationPage = () => {
  router.push("/registration");
};
</script>

<style></style>
