<template>
  <div>
    <q-input
      v-model="iinOfCalled"
      type="number"
      label="Напишите иин вызываемого"
    />
    <q-input v-model="reason" type="text" label="Напишите причину" autogrow />
    <div class="q-mt-md" v-for="(items, index) in history" :key="index">
      <div v-for="(item, itemIndex) in items" :key="itemIndex">
        <p class="">{{ item.reason }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const history = ref("");

const getHistory = async () => {
  try {
    const response = await axios.get(
      `${serverUrl}history?iinOfCalled=050411550617&goal=fff`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    history.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

getHistory();
</script>

<style></style>
