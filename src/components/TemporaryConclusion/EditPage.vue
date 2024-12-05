<template>
  <div>
    <q-input v-model="text" type="text" label="BIN" />
    <q-btn
      color="orange-4"
      no-caps
      label="Редактировать"
      @click="editTemporaryPage"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";

const userStore = useUserStore();
const notifyStore = useNotifyStore();

const props = defineProps({
  conclusionInformation: {
    type: Object,
    required: true,
  },
});

const editTemporaryPage = async () => {
  try {
    await userStore.getUserInfo();
    const investigatorIIN = userStore.userInfo.iin;
    console.log(investigatorIIN);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
