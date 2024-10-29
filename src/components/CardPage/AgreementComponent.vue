<template>
  <div>
    <q-dialog v-model="openAgreementPage" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >You are currently not connected to any network.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            no-caps
            label="Закрыть"
            color="negative"
            @click="closeAgreementWindow"
          />
          <q-btn no-caps label="Отправить на согласование" color="positive" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpenAgreementPage: {
    type: Boolean,
    required: true,
  },
});
const openAgreementPage = ref(props.isOpenAgreementPage);
watch(
  () => props.isOpenAgreementPage,
  (newVal) => (openAgreementPage.value = newVal)
);

const emit = defineEmits(["closeAgreementWindow"]);
const closeAgreementWindow = () => {
  emit("closeAgreementWindow");
};
</script>

<style></style>
