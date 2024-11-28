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
        <q-input v-model="iinOfCalled" type="text" label="ИИН вызываемого" />
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
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="viewDetailedInformation"
    />

    <DetailedInformation
      :isOpenDetailedWindow="isOpenDetailedWindow"
      @closeWindow="closeWindow"
      :conclusionInfo="conclusionInfo"
    />
  </div>
</template>

<script setup>
import DetailedInformation from "../components/AnalyticsPage/DetailedInformation.vue";
import RefusedPage from "../components/Status/RefusedPage.vue";

import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const webUrl = proxy.$webUrl;
const $q = useQuasar();
const notifyStore = useNotifyStore();
const userStore = useUserStore();

const columns = [
  {
    name: "id",
    required: true,
    label: "Порядковый номер",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "creationDate",
    align: "center",
    label: "Дата создания документа",
    field: "creationDate",
    sortable: true,
  },
  {
    name: "registrationNumber",
    align: "center",
    label: "Регистрационный номер",
    field: "registrationNumber",
    sortable: true,
  },
  {
    name: "udNumber",
    align: "center",
    label: "Номер УД",
    field: "udNumber",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Статус документа",
    field: "status",
    sortable: true,
  },
  {
    name: "calledPersonFullName",
    align: "center",
    label: "ФИО вызываемого",
    field: "calledPersonFullName",
    sortable: true,
  },
  {
    name: "defenseAttorneyFullName",
    align: "center",
    label: "ФИО согласующего",
    field: "defenseAttorneyFullName",
    sortable: true,
  },
];

const downloadPdf = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const iin = data.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }
    const response = await axios.get(`${serverUrl}pdf?IIN=${iin}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
      responseType: "blob",
      withCredentials: true,
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `User_${iin}.pdf`;
    link.click();
    $q.loading.hide();
    notifyStore.nofifySuccess($q, `PDF успешно загружен.`);
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при загрузке PDF:", error);
    notifyStore.notifyError($q, `Ошибка при загрузке PDF:", ${error}`);
  }
};

const downloadExcel = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const iin = data.iin;

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

    $q.loading.hide();
    notifyStore.nofifySuccess($q, `Excel успешно загружен.`);
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при загрузке Excel:", error);
    notifyStore.notifyError($q, `Ошибка при загрузке Excel:", ${error}`);
  }
};
const rows = ref([]);
const getUserDocs = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;

    const response = await axios.get(`${serverUrl}usersDocs?IIN=${data.iin}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    rows.value = response.data.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  } catch (error) {
    console.error("Ошибка при получении документов:", error);
    throw error;
  }
};
getUserDocs();

const statusOfDocuments = ref("");
const documentsOptions = ref("");
const registrationNumber = ref("");
const region = ref("");
const regionList = ref("");
const startDate = ref("2019/05/05");
const endDate = ref("2024/03/03");
const iinOfCalled = ref("");
const idNumber = ref("");
const idNumberList = ref();
const fcsConcordant = ref("");
const concordantList = ref("");
const conclusions = ref("");
const filteredConclusion = ref(rows.value);

watch(
  () => conclusions.value,
  (newVal) => {
    filteredConclusion.value = newVal;
  }
);

const filter = async () => {
  try {
    notifyStore.loading($q, "Подождите, фильтрация в обработке", QSpinnerGears);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token is missing");
      notifyStore.notifyError($q, "Access token is missing");
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
      params.append("ud", idNumber.value);
    }
    if (statusOfDocuments.value) {
      params.append("status", statusOfDocuments.value);
    }
    if (region.value) {
      params.append("region", region.value);
    }
    if (fcsConcordant.value) {
      params.append("fullName", fcsConcordant.value);
    }
    if (fcsConcordant.value) {
      params.append("fullName", fcsConcordant.value);
    }
    if (iinOfCalled.value) {
      params.append("iinOfCalled", iinOfCalled.value);
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

    filteredConclusion.value = sortedConclusions.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    rows.value = filteredConclusion.value;
    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Документы загружены с помощью фильтрации");
  } catch (error) {
    console.error("Error during filter request:", error);
  }
};

const defineList = async () => {
  try {
    notifyStore.loading(
      $q,
      "Подождите, данные из базы загружаются...",
      QSpinnerGears
    );
    await userStore.getAllNames();
    concordantList.value = userStore.allNames;

    await userStore.getAllStatus();
    documentsOptions.value = userStore.allStatus;

    await userStore.getAllUD();
    idNumberList.value = userStore.allUD;

    await userStore.getAllRegions();
    regionList.value = userStore.allRegions;
    notifyStore.nofifySuccess($q, "Данные из базы успешно загружены");
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    console.log(error);
    notifyStore.notifyError($q, `Ошибка при получении данных: ${error}`);
  }
};

onMounted(() => {
  defineList();
});

// Conclusion
const router = useRouter();

const redirectToKeycloakLogin = () => {
  router.push("/authorization");
  window.location.href = `${webUrl}authorization`;
};
onBeforeMount(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    redirectToKeycloakLogin();
    window.location.reload();
  }
});

const isOpenDetailedWindow = ref(false);

const conclusionInfo = ref("");
const viewDetailedInformation = (evt, row, index) => {
  isOpenDetailedWindow.value = true;
  conclusionInfo.value = row;
};

const closeWindow = () => {
  isOpenDetailedWindow.value = false;
};
</script>

<style scoped>
.activeDocs {
  border: 1px solid green;
}
</style>
