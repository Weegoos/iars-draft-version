<template>
  <div>
    <q-dialog v-model="openEditImgPage" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" no-caps label="Сохранить" @click="save" />
          <q-btn no-caps color="red" label="Закрыть" @click="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openChangeImg: {
    type: Boolean,
    required: true,
  },
});
const openEditImgPage = ref(props.openChangeImg);

watch(
  () => props.openChangeImg,
  (newVal) => {
    openEditImgPage.value = newVal;
  }
);

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style></style>
