<template>
  <div>
    <q-dialog v-model="changePasswordDialog" persistent>
      <q-card style="width: 300px">
        <q-card-section align="center">
          <p class="text-h6">Смена пароля</p>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="email"
            type="email"
            label="Напишите электронную почту"
          />
          <q-input v-model="oldPassword" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="newPassword"
            :type="isPwdNewPassword ? 'password' : 'text'"
            hint="Не менее 6 символов"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdNewPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdNewPassword = !isPwdNewPassword"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="positive"
            no-caps
            label="Сохранить"
            @click="savePassword"
          />
          <q-btn
            label="Закрыть"
            no-caps
            color="negative"
            @click="closeChangePasswordDialog"
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
const isPwd = ref(true);
const isPwdNewPassword = ref(true);

const props = defineProps({
  changePasswordStatus: {
    type: Boolean,
    required: true,
  },
});
const changePasswordDialog = ref(props.changePasswordStatus);
watch(
  () => props.changePasswordStatus,
  (newVal) => {
    changePasswordDialog.value = newVal;
  }
);
const emit = defineEmits(["closeDialog"]);
const closeChangePasswordDialog = () => {
  emit("closeDialog");
};

const email = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const $q = useQuasar();
const savePassword = async () => {
  try {
    const data = {
      email: email.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    };
    const jsonData = JSON.stringify(data);
    const response = await axios.put(`${serverUrl}password`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Пароль успешно изменен", response.data);
    $q.notify({
      message: `Пароль успешно изменен`,
      color: "positive",
      icon: "check",
    });
    email.value = "";
    oldPassword.value = "";
    newPassword.value = "";
    changePasswordDialog.value = false;
  } catch (error) {
    console.error("Ошибка при изменении пароля", error);
    $q.notify({
      message: `Ошибка при изменении пароля: ${error.response.data}`,
      color: "negative",
      icon: "error",
    });
  }
};
</script>

<style></style>
