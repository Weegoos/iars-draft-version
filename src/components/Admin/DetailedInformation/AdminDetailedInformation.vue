<template>
  <div>
    <q-dialog v-model="openAdminDetailedInformation" persistent>
      <q-card style="width: 800px">
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="closeAdminDialogPage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpenAdminDialogPage: {
    type: Boolean,
    required: true,
  },
});
const openAdminDetailedInformation = ref(props.isOpenAdminDialogPage);

watch(
  () => props.isOpenAdminDialogPage,
  (newVal) => {
    openAdminDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeAdminDialogPage"]);
const closeAdminDialogPage = () => {
  emit("closeAdminDialogPage");
};
</script>

<style></style>
