<template>
  <div>
    <q-dialog v-model="openRefusedDialog" persistent>
      <q-card style="width: 800px">
        <q-card-section>
          <q-input
            v-model="reason"
            type="text"
            label="Напишите причину"
            autogrow
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :color="props.buttonColor"
            no-caps
            :label="props.buttonLabel"
            @click="refuseButton"
          />
          <q-btn
            flat
            no-caps
            label="Закрыть"
            color="primary"
            @click="closeRefusedDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { ref, watch } from "vue";

import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const userStore = useUserStore();
const notifyStore = useNotifyStore();

const $q = useQuasar();

const props = defineProps({
  openRefusedDialogPage: {
    type: Boolean,
    required: true,
  },
  informationForRefusedComponent: {
    type: Object,
    required: true,
  },
  docsStatus: {
    type: String,
    required: true,
  },
  logAnswer: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  buttonColor: {
    type: String,
    required: true,
  },
});

const openRefusedDialog = ref(props.openRefusedDialogPage);
watch(
  () => props.openRefusedDialogPage,
  (newVal) => {
    openRefusedDialog.value = newVal;
  }
);

const emit = defineEmits(["closeRefusedDialog"]);
const closeRefusedDialog = () => {
  emit("closeRefusedDialog");
};

const reason = ref("");

const refuseButton = async () => {
  try {
    await userStore.getUserInfo();
    const iinofInvestigator = userStore.userInfo.iin;

    const data = {
      registrationNumber:
        props.informationForRefusedComponent.registrationNumber,
      status: props.docsStatus,
      reason: reason.value,
      iin: iinofInvestigator,
    };

    console.log(props.informationForRefusedComponent.registrationNumber);

    const response = await axios.post(`${serverUrl}decision`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    notifyStore.nofifySuccess($q, props.logAnswer);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    notifyStore.notifyError(
      $q,
      `Ошибка при создании события: ${error.response || error}`
    );
    console.error("Ошибка при создании события:", error.response || error);
  }
};
</script>

<style></style>
