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
    <q-card
      class="q-mb-md"
      v-for="(items, index) in analyticsDosc"
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
          no-caps
          label="Согласовать"
          @click="viewAgreementComponent"
        />
      </q-card-actions>
    </q-card>
    <DetailedInformation
      :isOpenDetailedWindow="isOpenDetailedWindow"
      @closeWindow="closeWindow"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import DetailedInformation from "../components/AnalyticsPage/DetailedInformation.vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const analyticsDosc = ref("");
const $q = useQuasar();

const getInfo = async () => {
  try {
    const response = await axios.get(`${serverUrl}getInfo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data.iin);
    getUserDocs(response.data.iin);
    getAllConclusionByIIN(response.data.iin);
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

const getUserDocs = async (userIIN) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${serverUrl}usersDocs?IIN=${userIIN}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);

    analyticsDosc.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении документов:", error);
    throw error;
  }
};

onMounted(() => {
  getInfo();
});

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
const conclusions = ref("");

const getAllConclusionByIIN = async (iin) => {
  try {
    $q.loading.show({
      message: "Подождите данные загружаются...",
      spinner: QSpinnerGears,
      messageColor: "white",
      backgroundColor: "black",
    });
    const response = await axios.get(`${serverUrl}temps?IIN=${iin}`, {
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
const viewDetailedInformation = () => {
  isOpenDetailedWindow.value = true;
};

const closeWindow = () => {
  isOpenDetailedWindow.value = false;
};
</script>

<style></style>
