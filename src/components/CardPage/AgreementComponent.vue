<template>
  <div>
    <q-dialog v-model="openAgreementPage" persistent>
      <q-card>
        <q-card-section class="q-gutter-sm">
          <q-select
            v-model="post"
            :options="postOptions"
            label="Должность"
            filled
          />
          <q-select
            v-model="fcs"
            :options="fcsOptions"
            label="ФИО согласующего"
            filled
          />
          <q-select
            v-model="approvalStatus"
            :options="approvalStatusOptions"
            label="Статус согласования"
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

const post = ref("");
const fcs = ref("");
const approvalStatus = ref("");

const postOptions = ref(["Аналитик", "Начальник отдела"]);
const fcsOptions = ref(["Ашим Батыр", "Хайруллин Алишер"]);
const approvalStatusOptions = ref(["Доработка"]);
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
