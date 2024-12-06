<template>
  <div class="text-white edit">
    <q-card class="my-card fixed-center text-white" style="width: 1000px">
      <q-card-section class="text-white">
        <div class="row q-gutter-md">
          <section class="col">
            <q-select
              v-model="idNumber"
              label-color="white"
              label="Номер УД "
              color="white"
              :hint="currentIdNumber"
              input-class="input"
              dark
              :options="listOfUD"
            />
          </section>
          <section class="col">
            <q-input
              v-model="iinOfCalled"
              label-color="white"
              label="ИИН вызываемого"
              color="white"
              :hint="currentIINOfCalled"
              input-class="input"
              dark
              mask="############"
            />
          </section>
          <section class="col">
            <q-input
              v-model="bin"
              label-color="white"
              label="БИН/ИИН"
              color="white"
              :hint="currentBin"
              input-class="input"
              dark
              mask="############"
            />
          </section>
        </div>
        <div class="row q-gutter-md">
          <section class="col">
            <q-input
              v-model="jobTitle"
              label-color="white"
              label="Должность вызываемого"
              color="white"
              :hint="currentJobTitle"
              input-class="input"
              dark
            />
          </section>
          <section class="col">
            <q-select
              v-model="region"
              label-color="white"
              label="Регион"
              color="white"
              :hint="currentRegion"
              input-class="input"
              dark
              :options="listOfRegion"
            />
          </section>
          <section class="col">
            <q-input
              v-model="plannedAction"
              label-color="white"
              label="Планируемые следственные действия"
              color="white"
              :hint="currentPlannedAction"
              input-class="input"
              dark
            />
          </section>
        </div>
        <div class="row q-gutter-md">
          <section class="col">
            <q-input
              v-model="formattedDate"
              dark
              label-color="white"
              color="white"
              :hint="currentDateTime"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date"
                      mask="YYYY-MM-DD HH:mm"
                      @update:model-value="updateFormattedDate"
                    >
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="date"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                      @update:model-value="updateFormattedDate"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </section>
          <section class="col">
            <q-select
              v-model="eventPlace"
              label-color="white"
              label="Место проведения"
              color="white"
              :hint="currentEventPlace"
              input-class="input"
              dark
              :options="listOfRegion"
            />
          </section>
          <section class="col">
            <q-input
              v-model="relation"
              dark
              label-color="white"
              label="Отношение вызывающего к событию и субъекту"
              color="white"
              :hint="currentRelation"
            />
          </section>
        </div>
        <div class="row q-gutter-md">
          <section class="col">
            <q-select
              v-model="investigationType"
              dark
              label-color="white"
              label="Виды планируемого следствия"
              color="white"
              :hint="currentInvestigationType"
              :options="listOfInvestigationType"
            />
          </section>
          <section class="col">
            <q-select
              v-model="relatesToBusiness"
              dark
              label-color="white"
              label="Относится ли к бизнесу"
              color="white"
              :hint="currentRelatesToBusiness"
              :options="listOfRelatesToBusiness"
            />
          </section>
          <section class="col">
            <q-input
              v-model="iinDefender"
              type="text"
              label="ИИН защитника"
              dark
              label-color="white"
              color="white"
              :hint="currentIinDefender"
            />
          </section>
        </div>
      </q-card-section>
      <q-card-actions vertical align="center">
        <q-btn
          flat
          no-caps
          color="orange-4"
          label="Редактировать"
          @click="clickToEditButton"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { QSpinnerGears, useQuasar } from "quasar";
import { useUserStore } from "src/stores/getApi-store";
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted, ref, watch } from "vue";
import { getCurrentInstance } from "vue";

const userStore = useUserStore();
const notifyStore = useNotifyStore();
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const $q = useQuasar();

const hash = window.location.hash;
const registrationNumber = ref("");
if (hash.includes("?")) {
  const queryString = hash.split("?")[1];

  const urlParams = new URLSearchParams(queryString);

  registrationNumber.value = urlParams.get("registrationNumber");

  // console.log(registrationNumber);
} else {
  console.log("Нет параметров в хэше");
}

const current = "Текущий";
const currentIdNumber = ref("");
const currentIINOfCalled = ref("");
const currentBin = ref("");
const currentJobTitle = ref("");
const currentRegion = ref("");
const currentPlannedAction = ref("");
const currentDateTime = ref("");
const currentEventPlace = ref("");
const currentRelation = ref("");
const currentInvestigationType = ref("");
const currentRelatesToBusiness = ref("");
const currentIinDefender = ref("");
const getInformationBasedOnRegistrationNumber = async () => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(
      `http://localhost:5002/fullTempConclusion?regNumber=${registrationNumber.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    currentIdNumber.value = `${current} номер УД: ${response.data.udNumber}`;
    currentIINOfCalled.value = `${current} ИИН вызываемого: ${response.data.calledPersonIIN}`;
    currentBin.value = `${current} БИН/ИИН: ${response.data.calledPersonBIN}`;
    currentJobTitle.value = `${current} должность вызываемого: ${response.data.calledPersonPosition}`;
    currentRegion.value = `${current} регион: ${response.data.region.name}`;
    currentPlannedAction.value = `${current} планируемые следственные действия: ${response.data.plannedInvestigativeActions}`;
    currentDateTime.value = `${current} дата и время проведения: ${response.data.eventDateTime}`;
    currentEventPlace.value = `${current} место проведения: ${response.data.eventPlace}`;
    currentRelation.value = `${current} отношение вызывающего: ${response.data.relationToEvent}`;
    currentInvestigationType.value = `${current} вид планируемого следствия: ${response.data.investigationTypes}`;
    currentRelatesToBusiness.value = `Текушее отношение к бизнесу: ${response.data.relatesToBusiness}`;
    currentIinDefender.value = `${current} ИИН защитника: ${response.data.defenseAttorneyIIN}`;

    console.log(response.data);
    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Данные успешно загружены");
  } catch (error) {
    $q.loading.hide();
    console.error(error.data);
    notifyStore.notifyError($q, `Ошибка при получении данных: ${error.data}`);
  }
};

getInformationBasedOnRegistrationNumber();

const idNumber = ref("");
const iinOfCalled = ref("");
const bin = ref("");
const jobTitle = ref("");
const region = ref("");
const plannedAction = ref("");
const date = ref("");
const formattedDate = ref("Дата и время проведения");
const eventPlace = ref("");
const relation = ref("");
const investigationType = ref("");
const relatesToBusiness = ref("");

function updateFormattedDate(newValue) {
  date.value = newValue;
  formattedDate.value = newValue.replace(" ", "T");
}

watch(date, (newVal) => {
  formattedDate.value = newVal.replace(" ", "T");
});

const editTemporaryConclusion = async () => {
  try {
    notifyStore.loading($q, "Редактирование в процессе...", QSpinnerGears);
    await userStore.getUserInfo();
    const userInfo = userStore.userInfo;
    const params = new URLSearchParams();

    params.append("registrationNumber", registrationNumber.value);
    if (idNumber.value) params.append("UD", idNumber.value);
    if (iinOfCalled.value) params.append("iinOfCalled", iinOfCalled.value);
    if (bin.value) params.append("BIN", bin.value);
    if (jobTitle.value) params.append("jobTitle", jobTitle.value);
    if (region.value) params.append("region", region.value);
    if (plannedAction.value)
      params.append("plannedActions", plannedAction.value);
    params.append("iinOfInvestigator", userInfo.iin);
    if (date.value) params.append("eventDateTime", formattedDate.value);
    if (eventPlace.value) params.append("eventPlace", eventPlace.value);
    if (relation.value) params.append("relation", relation.value);
    if (investigationType.value)
      params.append("investigationType", investigationType.value);
    if (relatesToBusiness.value)
      params.append("relatesToBusiness", relatesToBusiness.value);

    const response = await axios.put(
      `${serverUrl}edit?${params.toString()}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Заключение было успешно отредактировано");
    setTimeout(() => {
      location.reload();
    }, 1500);
  } catch (error) {
    $q.loading.hide();
    console.error(error);
    notifyStore.notifyError($q, `Ошибка во время редактирование: ${error}`);
  }
};

const listOfUD = ref("");
const listOfRegion = ref("");
const listOfInvestigationType = ref("");
const listOfRelatesToBusiness = ref("");
const getNeccessaryAPI = async () => {
  try {
    notifyStore.loading(
      $q,
      "Подождите, данные с базы загружаются...",
      QSpinnerGears
    );
    await userStore.getAllUD();
    const allUD = userStore.allUD;

    await userStore.getAllRegions();
    const allRegions = userStore.allRegions;

    await userStore.getAllActions();
    const allInvestigationType = userStore.allActions;

    await userStore.getAllBusiness();
    listOfRelatesToBusiness.value = userStore.allBusiness;

    listOfUD.value = allUD;
    listOfRegion.value = allRegions;
    listOfInvestigationType.value = allInvestigationType;

    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Данные успешно загружены с базы данных");
  } catch (error) {
    console.log(error);
    notifyStore.notifyError($q, `Ошибка: ${error}`);
  }
};

const clickToEditButton = () => {
  editTemporaryConclusion();
};

onMounted(() => {
  getNeccessaryAPI();
});
</script>

<style scoped>
.edit {
  background-image: url("https://images.unsplash.com/photo-1559242550-bdfaa5081d95?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: white;
}

.my-card {
  background-color: #0e1012;
}

.input {
  color: white;
}
</style>
