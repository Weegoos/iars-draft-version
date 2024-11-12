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
          <q-input
            v-model="oldPassword"
            type="password"
            label="Напишите старый пароль"
          />
          <q-input
            v-model="newPassword"
            type="password"
            label="Напишите новый пароль"
            hint="Не менее 6 символов"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="positive" no-caps label="Сохранить" @click="onClick" />
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
import { ref, watch } from "vue";

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
</script>

<style></style>
