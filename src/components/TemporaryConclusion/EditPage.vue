<template>
  <div class="text-white edit">
    <q-card class="my-card fixed-center text-white" style="width: 500px">
      <q-card-section class="text-white">
        <q-input
          v-model="text"
          label-color="white"
          label="Номер УД "
          color="white"
          standout
          style="color: white"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const hash = window.location.hash;

if (hash.includes("?")) {
  const queryString = hash.split("?")[1];

  const urlParams = new URLSearchParams(queryString);

  const registrationNumber = urlParams.get("registrationNumber");

  console.log(registrationNumber);
} else {
  console.log("Нет параметров в хэше");
}
</script>

<style scoped>
.edit {
  background-image: url("https://images.unsplash.com/photo-1559242550-bdfaa5081d95?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: white;
}

.my-card {
  background-color: #0e1012;
}
</style>
