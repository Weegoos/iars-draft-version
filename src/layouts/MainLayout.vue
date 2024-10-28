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
        :width="200"
        :breakpoint="500"
        content-class="bg-grey-3"
      >
        <q-list bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="bluetooth" />
            </q-item-section>
            <q-item-section>Icon as avatar</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);
</script>

<style></style>
