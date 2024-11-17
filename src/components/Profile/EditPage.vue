<template>
  <div>
    <q-dialog v-model="openEditPage" persistent>
      <q-card style="width: 300px">
        <q-card-section align="center">
          <p class="text-h6">Редактирование</p>
          <q-input v-model="name" type="text" label="Напишите имя" />
          <q-input v-model="surname" type="text" label="Напишите фамилию" />
          <q-input
            v-model="email"
            type="text"
            label="Напишите электронную почту"
          />
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

const name = ref("");
const surname = ref("");
const email = ref("");
const router = useRouter();
const $q = useQuasar();

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
    const response = await axios.get(`http://localhost:5002/getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    if (response.data && response.data.iin) {
      console.log("Получен ИИН:", response.data.iin);
      await editProfile(response.data.iin);
    } else {
      console.error("ИИН не найден в данных пользователя.");
    }
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    alert("Ошибка при получении данных. Попробуйте снова.");
  }
};

const editProfile = async (iin) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("Токен:", accessToken);

  if (!accessToken) {
    alert("Ошибка: Токен не найден");
    return;
  }

  try {
    const data = {
      ...(name.value && { name: name.value }),
      ...(surname.value && { surname: surname.value }),
      ...(email.value && { email: email.value }),
      iin,
    };

    const response = await axios.put(
      "http://localhost:5002/editProfile",
      data,
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
    router.push("/profile");
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
