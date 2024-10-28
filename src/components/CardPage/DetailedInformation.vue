<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Закрыть" color="primary" @click="closeWindow" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const confirm = ref(props.isOpen);
watch(
  () => props.isOpen,
  (newVal) => {
    confirm.value = newVal;
  }
);

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};
</script>

<style></style>
