<template>
  <div>
    <section v-for="(items, index) in allusers" :key="index" class="q-mt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col">
              <span class="infoHeadline">ФИО</span>
              <p class="infoStyle">{{ items.name }} {{ items.secondName }}</p>
            </div>
            <div class="col">
              <span class="infoHeadline">Почта</span>
              <p class="infoStyle">{{ items.email }}</p>
            </div>
            <div class="col">
              <span class="infoHeadline">ИИН</span>
              <p class="infoStyle">{{ items.iin }}</p>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <span class="infoHeadline">Дата регистрации</span>
              <p class="infoStyle">{{ items.registrationDate }}</p>
            </div>
            <div class="col">
              <span class="infoHeadline">Департамент</span>
              <p class="infoStyle">{{ items.department.name }}</p>
            </div>
            <div class="col">
              <span class="infoHeadline">Регион</span>
              <p class="infoStyle">{{ items.department.region }}</p>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <span class="infoHeadline">Должность</span>
              <p class="infoStyle">{{ items.jobTitle.name }}</p>
            </div>
            <div class="col">
              <span class="infoHeadline">Количество документов</span>
              <p class="infoStyle">{{ items.conclusions.length }}</p>
            </div>
            <div class="col">
              <span class="infoHeadline">Полученные документы</span>
              <p class="infoStyle">{{ items.receivedConclusionDtos.length }}</p>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            color="blue-13"
            no-caps
            label="Повышение"
            @click="promoteUser(items)"
          />
          <q-btn
            color="negative"
            no-caps
            label="Удалить пользователя"
            @click="onClick"
          />
        </q-card-actions>
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

const promoteUser = async (item) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${serverUrl}admin/promote?IIN=${item.iin}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("IIN:", item.iin);
    console.log("Ответ сервера:", response.data);

    $q.notify({
      message: `Пользователь ${item.name} ${item.secondName} успешно повышен в должности`,
      icon: "check",
      color: "positive",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка при повышении:", error.response || error);
  }
};
</script>

<style></style>
