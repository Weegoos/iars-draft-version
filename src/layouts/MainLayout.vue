<template>
  <div>
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-header reveal elevated class="bg-white">
        <q-toolbar class="bg-white text-black">
          <q-btn
            flat
            round
            dense
            icon="menu"
            v-if="$q.screen.width < screenWidth"
            @click="drawer = !drawer"
          />
          <q-toolbar-title
            class="headline"
            :class="
              $q.screen.width > screenWidth ? 'configuredHeadlineClass' : ''
            "
          >
            Госуслуги
          </q-toolbar-title>
          <div
            class="row q-gutter-sm"
            v-for="(items, index) in navigationButtons"
            :key="index"
          >
            <q-btn
              no-caps
              v-if="$q.screen.width > screenWidth"
              flat
              :label="items.name"
              @click="navigation(items.link)"
            />
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-if="$q.screen.width < screenWidth"
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="250"
        :breakpoint="500"
        bordered
        behavior="desktop"
      >
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="(items, id) in navigationButtons"
            :key="id"
            @click="navigation(items.link)"
            :class="items.link == currentPath ? 'activePage' : ''"
          >
            <q-item-section avatar>
              <q-icon :name="items.icon" />
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
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const screenWidth = proxy.$screenWidth;
console.log(screenWidth);

const drawer = ref(false);
const miniState = ref(true);
const navigationButtons = ref([
  {
    name: "Журнал заключений",
    link: "/",
    icon: "phone",
  },
  {
    name: "Создание заключений",
    link: "/create",
    icon: "create",
  },
  {
    name: "Профиль",
    link: "/profile",
    icon: "person",
  },
]);

const router = useRouter();
const defineRoute = useRoute();
const currentPath = ref(defineRoute.fullPath);
watch(
  () => defineRoute.fullPath,
  (newVal) => {
    currentPath.value = newVal;
    console.log("Текущий маршрут:", newVal);
  }
);
const navigation = (route) => {
  router.push(route);
};
</script>

<style scoped>
.activePage {
  color: #779fc2;
}
.configuredHeadlineClass {
  position: relative;
  margin-left: 50px;
}
</style>
