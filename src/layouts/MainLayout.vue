<template>
  <div>
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-header reveal elevated>
        <q-toolbar class="bg-white text-black">
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
          <q-toolbar-title> IARS </q-toolbar-title>
          <q-btn flat round dense icon="person" />
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        bordered
        :width="230"
        :breakpoint="500"
        content-class="bg-grey-3"
      >
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="(items, id) in navigationButtons"
            :key="id"
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
import { ref } from "vue";

const drawer = ref(true);
const navigationButtons = ref([
  {
    name: "Журнал заключений",
    link: "/card",
    icon: "phone",
  },
]);
</script>

<style></style>
