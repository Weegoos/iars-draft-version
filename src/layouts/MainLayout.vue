<template>
  <div @keydown="handle" tabindex="0">
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-drawer
        v-if="!isAuthPage"
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
            @click="nav(items.link)"
          >
            <q-item-section avatar>
              <q-icon :name="items.icon" class="drawer-icon" />
            </q-item-section>
            <q-item-section>{{ items.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <q-page-container>
        <q-page>
          <router-view />
          <KeyboardPage ref="childRef" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import KeyboardPage from "../pages/KeyboardPage.vue";

import axios from "axios";
import { useUserStore } from "src/stores/getApi-store";
import { onMounted, ref, watch, computed, onBeforeMount } from "vue";
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const webUrl = proxy.$webUrl;
const serverUrl = proxy.$serverUrl;

const accessToken = localStorage.getItem("accessToken");
const drawer = ref(true);
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const childRef = ref(null);

const callChildMethod = () => {
  childRef.value?.show();
};

const handle = (event) => {
  if (event.key === "Shift" && event.altKey) {
    callChildMethod();
    window.removeEventListener("keydown", handle);
    console.log(777);
  }
};

onMounted(() => {
  window.addEventListener("keydown", handle);
});

const isAuthPage = computed(() => {
  return (
    route.path === "/authorization" ||
    route.path === "/registration" ||
    route.path === "/edit-temps"
  );
});

const adminNavigation = [
  { name: "Панель администратора", icon: "dashboard", link: "/" },
  { name: "Управление пользователями", icon: "people", link: "/admin-user" },
  { name: "Профиль", icon: "person", link: "/profile" },
];

const employeeNavigation = [
  { name: "Журнал заключений", icon: "description", link: "/" },
  {
    name: "Временные заключении",
    icon: "description",
    link: "/temporary-conclusion",
  },
  { name: "Создание заключений", icon: "add", link: "/create-conclusion" },
  { name: "Профиль", icon: "person", link: "/profile" },
];

const role = localStorage.getItem("role");
const navigation = ref("");

const defineRole = () => {
  if (role === "Модератор") {
    navigation.value = adminNavigation;
  } else {
    navigation.value = employeeNavigation;
  }
};

onBeforeMount(() => {
  defineRole();
  // window.removeEventListener("keydown", handle);
});

const nav = (route) => {
  router.push(route);
};
</script>

<style scoped></style>
