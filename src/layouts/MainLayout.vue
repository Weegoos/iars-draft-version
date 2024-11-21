<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const webUrl = proxy.$webUrl;
const accessToken = localStorage.getItem("accessToken");

onMounted(() => {
  if (!accessToken) {
    window.location.href = `${webUrl}authorization`;
  }
});
</script>

<style></style>
