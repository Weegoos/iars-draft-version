<template>
  <div>
    <q-dialog v-model="openEditImgPage" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-form @submit.prevent="uploadImage">
            <!-- Поле для загрузки файла -->
            <q-uploader
              v-model="file"
              label="Выберите фото"
              accept="image/*"
              outlined
              dense
              :hide-upload-button="true"
              @added="handleFileAdded"
            />

            <q-btn
              label="Загрузить"
              type="submit"
              color="primary"
              class="q-mt-md"
              :disable="loading"
              :loading="loading"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn no-caps color="red" label="Закрыть" @click="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { Cookies, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";

const notifyStore = useNotifyStore();
const $q = useQuasar();

const props = defineProps({
  openChangeImg: {
    type: Boolean,
    required: true,
  },
  iin: {
    type: Number,
    required: true,
  },
});
const openEditImgPage = ref(props.openChangeImg);

watch(
  () => props.openChangeImg,
  (newVal) => {
    openEditImgPage.value = newVal;
  }
);

watch(openEditImgPage, (newVal) => {
  emit("update:openChangeImg", newVal);
});

const emit = defineEmits(["close", "update:openChangeImg"]);
const close = () => {
  emit("close");
};

const file = ref([]);
const loading = ref(false);
const handleFileAdded = (files) => {
  console.log("Файлы добавлены:", files);
  file.value = files;
};

const uploadImage = async () => {
  if (!file.value || file.value.length === 0) {
    message.value = "Выберите файл!";
    bannerColor.value = "negative";
    return;
  }

  loading.value = true;
  const formData = new FormData();
  formData.append("iin", props.iin);
  formData.append("image", file.value[0]);

  try {
    const response = await axios.patch(
      "http://localhost:5002/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        withCredentials: true,
      }
    );

    console.log("Ответ сервера:", response.data);
    notifyStore.nofifySuccess($q, "Фото успешно обновлено");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка:", error);
    notifyStore.notifyError($q, `Ошибка при изменении фото: ${error}`);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
