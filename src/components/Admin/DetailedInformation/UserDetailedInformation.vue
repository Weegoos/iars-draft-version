<template>
  <div>
    <q-dialog v-model="openUserDetailedInformation" persistent>
      <q-card>
        <q-card-section class="row items-center">
          {{ props.conclusionDetailedInformation }}
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            color="green-4"
            no-caps
            label="OK"
            @click="promoteUser(props.conclusionDetailedInformation)"
          />
          <q-btn
            flat
            no-caps
            label="Закрыть"
            color="red-4"
            @click="closeAdminDialogPage"
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
  isOpenAdminDialogPage: {
    type: Boolean,
    required: true,
  },
  conclusionDetailedInformation: {
    type: Object,
    requied: true,
  },
});
const openUserDetailedInformation = ref(props.isOpenAdminDialogPage);
watch(
  () => props.isOpenAdminDialogPage,
  (newVal) => {
    openUserDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeAdminDialogPage"]);
const closeAdminDialogPage = () => {
  emit("closeAdminDialogPage");
};

const promoteUser = async (item) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(
      `${serverUrl}admin/promote?IIN=${item.iin}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Ответ сервера:", response.data);

    $q.notify({
      message: `Пользователь ${item.name} ${item.secondName} успешно повышен в должности`,
      icon: "check",
      color: "positive",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка при повышении:", error.response || error);
  }
};
</script>

<style></style>
