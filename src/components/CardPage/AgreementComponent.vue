<template>
  <div>
    <q-dialog v-model="openAgreementPage" persistent>
      <q-card>
        <q-card-section>
          <q-select
            v-model="select"
            :options="options"
            label="Standard"
            filled
          />
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

const select = ref("Выберите согласующего");
const options = ref(["Аналитик"]);
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
