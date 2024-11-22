<template>
  <div>
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-drawer
        v-model="drawer"
        :dark="true"
        :width="250"
        side="left"
        bordered
        :breakpoint="500"
        content-class="bg-grey-3"
      >
        <div class="q-pa-md q-my-xl">
          <q-img
            src="../assets/img/aitu-logo.png"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            class="drawer-logo"
          />
        </div>
        <q-list bordered class="drawer-list">
          <q-item
            clickable
            v-ripple
            v-for="(items, index) in navigation"
            :key="index"
            class="drawer-item"
            @click="navigation(items.link)"
          >
            <q-item-section avatar>
              <q-icon :name="items.icon" class="drawer-icon" />
            </q-item-section>
            <q-item-section>{{ items.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const webUrl = proxy.$webUrl;
const accessToken = localStorage.getItem("accessToken");
const drawer = ref(true);
onMounted(() => {
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  }
});

import { computed } from "vue";

const adminNavigation = [
  { name: "Панель администратора", icon: "dashboard" },
  { name: "Управление пользователями", icon: "people" },
];

const employeeNavigation = [
  { name: "Моя панель", icon: "dashboard" },
  { name: "Задачи", icon: "assignment" },
];

const role = "admin";

// Определение массива для отображения на основе роли
const navigation = computed(() => {
  return role === "admin" ? adminNavigation : employeeNavigation;
});
</script>

<style scoped>
.drawer-list {
  background-color: #f5f5f5;
}

/* Фон для каждого элемента списка */
.drawer-item {
  background-color: #ffffff;
  color: #000000;
}

.drawer-item:hover {
  background-color: #eeeeee;
}

/* Цвет иконок */
.drawer-icon {
  color: #3f51b5;
}

/* Логотип */
.drawer-logo {
  filter: brightness(0) invert(1);
}

.drawer-item q-item-section {
  color: #333333;
}

.drawer-item:hover q-item-section {
  color: #3f51b5;
}
</style>
