<template>
  <div>
    <q-dialog v-model="openRefusedDialog" persistent>
      <q-card style="width: 800px">
        <q-card-section>
          <q-input
            v-model="reason"
            type="text"
            label="Напишите причину отказа"
            autogrow
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="negative"
            no-caps
            label="Отказать"
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
import { ref, watch } from "vue";

import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

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

const getInfo = async () => {
  try {
    const response = await axios.get(`${serverUrl}getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

getInfo();

const reason = ref("");

const refuseButton = async () => {
  try {
    const userData = await getInfo();
    const iinofInvestigator = userData?.iin;

    const data = {
      registrationNumber:
        props.informationForRefusedComponent.registrationNumber,
      status: "Отказано",
      reason: reason.value,
      iin: iinofInvestigator,
    };

    const response = await axios.post("http://localhost:5002/decision", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Убедитесь, что токен есть
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Успешно создано:", response.data);
    $q.notify({
      message: "Документу было отказано",
      icon: "check",
      color: "positive",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка при создании события:", error.response || error);
  }
};
</script>

<style></style>
