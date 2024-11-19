<template>
  <div>
    <section>
      <q-card
        class="q-my-md"
        v-for="(items, index) in allConclusion"
        :key="index"
      >
        <section class="row" style="align-items: stretch">
          <div class="col">
            <q-card-section>
              <span class="infoHeadline">№ (порядковый)</span>
              <p class="infoStyle text-capitalize">{{ index + 1 }}</p>
              <span class="infoHeadline">Дата создания документа</span>
              <p class="infoStyle text-capitalize">
                {{ items.creationDate || "Не указано" }}
              </p>
            </q-card-section>
          </div>
          <div class="col">
            <q-card-section>
              <span class="infoHeadline">Регистрационный номер</span>
              <p class="infoStyle text-capitalize">
                {{ items.registrationNumber || "Не указано" }}
              </p>
              <span class="infoHeadline">Номер УД</span>
              <p class="infoStyle text-capitalize">
                {{ items.udNumber || "Не указано" }}
              </p>
            </q-card-section>
          </div>

          <div class="col">
            <q-card-section>
              <span class="infoHeadline">ФИО вызываемого</span>
              <p class="infoStyle text-capitalize">
                {{ items.calledPersonFullName || "Не указано" }}
              </p>
              <span class="infoHeadline">ФИО согласующего</span>
              <p class="infoStyle text-capitalize">
                {{ items.defenseAttorneyFullName || "Не указано" }}
              </p>
            </q-card-section>
          </div>
        </section>
        <q-card-actions align="center" class="row">
          <q-btn
            color="primary"
            no-caps
            label="Просмотреть"
            @click="viewDetailedInformation(items)"
          />
        </q-card-actions>
      </q-card>
    </section>
    <AdminDetailedInformation
      :isOpenAdminDialogPage="isOpenAdminDialogPage"
      @closeAdminDialogPage="closeAdminDialogPage"
      :conclusionDetailedInformation="conclusionDetailedInformation"
    />
  </div>
</template>

<script setup>
import AdminDetailedInformation from "./DetailedInformation/AdminDetailedInformation.vue";

import axios from "axios";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const isOpenAdminDialogPage = ref(false);
const conclusionDetailedInformation = ref("");
const viewDetailedInformation = (item) => {
  isOpenAdminDialogPage.value = true;
  conclusionDetailedInformation.value = item;
  console.log(item);
};

const closeAdminDialogPage = () => {
  isOpenAdminDialogPage.value = false;
};

const allConclusion = ref("");
const getAllConclusion = async () => {
  try {
    const response = await axios.get(`${serverUrl}admin/allConclusions`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    allConclusion.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении всех документов:", error);
    throw error;
  }
};

onMounted(() => {
  getAllConclusion();
});
</script>

<style></style>
