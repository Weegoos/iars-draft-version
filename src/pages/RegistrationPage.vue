<template>
  <div class="fixed-center">
    <q-card class="my-card" style="width: 50vw">
      <q-card-section align="center">
        <p class="text-h5">Регистрация</p>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="name"
              type="text"
              label="Напишите имя"
              hint="Например: Айсултан"
            />
          </div>
          <div class="col">
            <q-input
              v-model="secondName"
              type="text"
              label="Напишите фамилию"
              hint="Например: Хаббасов"
            />
          </div>
        </div>
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
              hint="Не менее 6 символов"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-select
              v-model="department"
              :options="departmentList"
              label="Введите департамент"
            />
          </div>
          <div class="col">
            <q-input v-model="iin" type="number" label="Напишите ИИН" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="region"
          :options="regionList"
          v-show="isRegionVisible"
          label="Введите регион"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="positive"
          no-caps
          label="Зарегистрироваться"
          @click="registration"
        />
        <q-btn
          color="primary"
          no-caps
          label="Есть аккаунт?"
          @click="pushToAuthorization"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const secondName = ref("");
const email = ref("");
const password = ref("");
const department = ref("");
const iin = ref("");
const region = ref("");
const $q = useQuasar();

const departmentList = ref("");
const regionList = ref("");
const isRegionVisible = ref(false);

watch(
  () => department.value,
  (newVal) => {
    if (newVal.length > 0) {
      getAllRegions(newVal);
      isRegionVisible.value = true;
    }
  }
);

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const registration = async () => {
  try {
    const data = {
      email: email.value,
      name: name.value,
      secondName: secondName.value,
      password: password.value,
      department: department.value,
      region: region.value,
      iin: iin.value,
    };

    const jsonData = JSON.stringify(data);

    const response = await axios.post(`${serverUrl}register`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Пользователь успешно зарегистрирован", response.data);
    $q.notify({
      message: `Пользователь успешно зарегистрирован`,
      color: "positive",
      icon: "check",
    });
    router.push("/authorization");
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    $q.notify({
      message: `Ошибка при регистрации: ${error.response.data}`,
      color: "negative",
      icon: "error",
    });
  }
};

const router = useRouter();
const pushToAuthorization = () => {
  router.push("/authorization");
};

const getAllDepartments = async () => {
  try {
    const response = await axios.get(`${serverUrl}allDepartments`);
    departmentList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

const getAllRegions = async (department) => {
  try {
    const response = await axios.get(`${serverUrl}regInDep?dep=${department}`);
    regionList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

onMounted(() => {
  getAllDepartments();
});
</script>

<style></style>
