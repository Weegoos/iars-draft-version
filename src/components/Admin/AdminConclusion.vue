<template>
  <div>
    <section class="text-center">
      <q-btn
        color="primary"
        no-caps
        label="Все пользователи"
        @click="pushToAdminUser"
      />
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const pushToAdminUser = () => {
  router.push("/admin-user");
};
</script>

<style></style>
