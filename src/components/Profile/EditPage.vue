<template>
  <div>
    <q-dialog v-model="openEditPage" persistent>
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn no-caps label="Сохранить" color="positive" />
          <q-btn
            no-caps
            label="Закрыть"
            color="negative"
            @click="closeEditDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  editDialog: {
    type: Boolean,
    required: true,
  },
});
const openEditPage = ref(props.editDialog);
watch(
  () => props.editDialog,
  (newVal) => {
    openEditPage.value = newVal;
  }
);

const emit = defineEmits(["closeEditDialog"]);
const closeEditDialog = () => {
  emit("closeEditDialog");
};
</script>

<style></style>
