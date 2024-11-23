<template>
  <div>
    <q-dialog v-model="openEditPage" persistent>
      <q-card style="width: 300px">
        <q-card-section align="center">
          <p class="text-h6">Редактирование</p>
          <q-input v-model="name" type="text" label="Напишите имя" />
          <q-input v-model="surname" type="text" label="Напишите фамилию" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn no-caps label="Сохранить" color="positive" @click="save" />
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
import axios from "axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { getCurrentInstance } from "vue";

const name = ref("");
const surname = ref("");
const router = useRouter();
const $q = useQuasar();

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

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

const getInfo = async () => {
  try {
    const response = await axios.get(`${serverUrl}getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    if (response.data && response.data.iin) {
      // Передаем IIN в editProfile
      await editProfile(response.data.iin);
    } else {
      console.error("ИИН не найден в данных пользователя.");
    }
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
  }
};

const editProfile = async (iin) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.log("Ошибка: Токен не найден");
    return;
  }

  try {
    // Формируем параметры URL
    const params = new URLSearchParams();
    if (name.value) params.append("name", name.value);
    if (surname.value) params.append("surname", surname.value);
    params.append("IIN", iin);

    // Отправляем PUT-запрос с параметрами в URL
    const response = await axios.put(
      `${serverUrl}editProfile?${params.toString()}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Профиль успешно обновлен:", response.data);
    $q.notify({
      message: "Профиль успешно обновлен",
      color: "positive",
      icon: "check",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    if (error.response) {
      console.error("Ошибка ответа от сервера:", error.response.data);
      $q.notify({
        message: `Ошибка ответа от сервера ${error.response.data}`,
        color: "negative",
        icon: "error",
      });
    } else if (error.request) {
      console.error("Ошибка запроса:", error.request);
      $q.notify({
        message: `Не удалось отправить запрос. Проверьте соединение.`,
        color: "negative",
        icon: "error",
      });
    } else {
      console.error("Ошибка:", error.message);
      $q.notify({
        message: `Ошибка при отправке запроса.`,
        color: "negative",
        icon: "error",
      });
    }
  }
};

const save = () => {
  getInfo();
};
</script>

<style></style>
