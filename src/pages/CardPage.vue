<template>
  <div>
    <div class="row q-gutter-sm">
      <div class="col">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="statusOfDocuments"
              type="text"
              label="Статус документа"
              list="documentsList"
            />
            <datalist id="documentsList">
              <div v-for="(item, index) in documentsOptions" :key="index">
                <option :value="item"></option>
              </div>
            </datalist>
          </div>
          <div class="col">
            <q-input
              v-model="fcsConcordant"
              type="text"
              label="ФИО согласующего"
              list="concordant"
            />
            <datalist id="concordant">
              <div v-for="(items, index) in concordantList" :key="index">
                <option :value="items"></option>
              </div>
            </datalist>
          </div>
        </div>
      </div>
      <div class="col">
        <q-input
          v-model="registrationNumber"
          type="text"
          label="Регистрационный номер"
        />
      </div>
      <div class="col">
        <q-input v-model="region" type="text" label="Регион" list="region" />
        <datalist id="region">
          <div v-for="(items, index) in regionList" :key="index">
            <option :value="items"></option>
          </div>
        </datalist>
      </div>
    </div>
    <div class="row q-gutter-sm">
      <div class="col">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="startDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="startDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input v-model="endDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="endDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="col">
        <q-input v-model="iin" type="text" label="ИИН вызываемого" />
      </div>
      <div class="col">
        <q-input
          v-model="idNumber"
          type="text"
          label="Номер УД"
          list="idNumberList"
        />
        <datalist id="idNumberList">
          <div v-for="(items, index) in idNumberList" :key="index">
            <option :value="items"></option>
          </div>
        </datalist>
      </div>
    </div>
    <div class="col q-gutter-md" align="right">
      <q-btn
        color="primary"
        no-caps
        label="Фильтровать"
        class="q-mb-md"
        @click="filter"
      />
      <q-btn
        color="primary"
        class="q-mb-md"
        icon="download"
        label="Скачать в формате pdf"
        @click="downloadPdf"
      />
      <q-btn
        color="primary"
        class="q-mb-md"
        icon="download"
        label="Скачать в формате excel"
        @click="downloadExcel"
      />
    </div>
    <section
      class="text-h6 text-bold text-center"
      v-if="conclusions.length === 0"
    >
      Документы отсутствуют
    </section>
    <q-card
      class="q-mb-xl"
      v-for="(items, index) in filteredConclusion"
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
          @click="viewDetailedInformation"
        />
        <q-btn
          color="positive"
          R
          no-caps
          label="Согласовать"
          @click="viewAgreementComponent"
        />
      </q-card-actions>
    </q-card>
    <DetailedInformation
      :isOpen="isOpen"
      @closeWindow="closeWindow"
      :conclusions="conclusions"
    />
    <AgreementComponent
      :isOpenAgreementPage="isOpenAgreementPage"
      @closeAgreementWindow="closeAgreementWindow"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import DetailedInformation from "../components/CardPage/DetailedInformation.vue";
import AgreementComponent from "../components/CardPage/AgreementComponent.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { QSpinnerGears, useQuasar } from "quasar";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";

const $q = useQuasar();
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;
const userStore = useUserStore();
const notifyStore = useNotifyStore();

const isOpen = ref(false);
const viewDetailedInformation = () => {
  isOpen.value = true;
};

const closeWindow = () => {
  isOpen.value = false;
};

const isOpenAgreementPage = ref(false);
const viewAgreementComponent = () => {
  isOpenAgreementPage.value = true;
};

const closeAgreementWindow = () => {
  isOpenAgreementPage.value = false;
};

const statusOfDocuments = ref("");
const documentsOptions = ref("");

const registrationNumber = ref("");

const region = ref("");
const regionList = ref("");

const startDate = ref("2019/05/05");
const endDate = ref("2024/03/03");
const iin = ref("");

const idNumber = ref("");
const idNumberList = ref();

const fcsConcordant = ref("");

const concordantList = ref("");
const conclusions = ref("");

const getAllConclusionByIIN = async () => {
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    notifyStore.loading($q, "Подождите данные загружаются...", QSpinnerGears);
    const response = await axios.get(`${serverUrl}usersDocs?IIN=${data.iin}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const sortedConclusions = response.data.sort((a, b) => {
      // Сортировка по убыванию (новые сверху)
      return new Date(b.creationDate) - new Date(a.creationDate);
    });

    conclusions.value = sortedConclusions;
    console.log(response.data);

    $q.loading.hide();
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

getAllConclusionByIIN();

const filteredConclusion = ref(conclusions.value);
watch(
  () => conclusions.value,
  (newVal) => {
    filteredConclusion.value = newVal;
  }
);

const filter = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }
    const params = new URLSearchParams();
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const iin = data.iin;

    if (registrationNumber.value) {
      params.append("registrationNumber", registrationNumber.value);
    }

    if (idNumber.value) {
      params.append("idNumber", idNumber.value); // Используем уникальный параметр
    }

    if (statusOfDocuments.value) {
      params.append("status", statusOfDocuments.value);
    }

    params.append("iin", iin);

    const response = await axios.get(
      `${serverUrl}filter?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    const sortedConclusions = response.data.sort((a, b) => {
      return new Date(b.creationDate) - new Date(a.creationDate);
    });

    filteredConclusion.value = sortedConclusions;
  } catch (error) {
    console.log("Error during filter request:", error);
  }
};

const concordantListAPI = `${serverUrl}allNames`;
const getAllNames = async () => {
  try {
    const response = await axios.get(concordantListAPI, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    concordantList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

const documentOptionsAPI = `${serverUrl}allStatus`;
const getAllDocuments = async () => {
  try {
    const response = await axios.get(documentOptionsAPI, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    documentsOptions.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

const regionListAPI = `${serverUrl}allRegions`;
const getAllRegions = async () => {
  try {
    const response = await axios.get(regionListAPI, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    regionList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

const UDAPI = `${serverUrl}allUD`;
const getAllUD = async () => {
  try {
    const response = await axios.get(UDAPI, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    idNumberList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

getAllDocuments();
getAllRegions();
getAllNames();
getAllUD();

// Conclusion

const downloadPdf = async () => {
  try {
    const data = await getInfo();
    const iin = data?.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    const response = await axios.get(
      `${serverUrl}pdf?IIN=${iin}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `User_${iin}.pdf`;
    link.click();

    console.log("PDF успешно загружен.");
  } catch (error) {
    console.error("Ошибка при загрузке PDF:", error);
  }
};

const downloadExcel = async () => {
  try {
    const data = await getInfo();
    const iin = data?.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }

    const response = await axios.get(`${serverUrl}excel?IIN=${iin}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME для Excel
      },
      responseType: "blob",
      withCredentials: true,
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `User_${iin}.xlsx`;
    link.click();

    console.log("Excel успешно загружен.");
  } catch (error) {
    console.error("Ошибка при загрузке Excel:", error);
  }
};

const router = useRouter();

const redirectToKeycloakLogin = () => {
  router.push("/authorization");
  window.location.href = `${webUrl}authorization`;
};
console.log("Batyr");

onBeforeMount(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    redirectToKeycloakLogin();
    window.location.reload();
  }
});
</script>

<style></style>
