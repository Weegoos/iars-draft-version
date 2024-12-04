<template>
  <div class="q-px-xl q-py-md">
    <p class="text-h5 text-center">Страница для создание заключений</p>
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="idNumber"
              type="text"
              label="Номер УД"
              list="allUd"
            />
            <datalist id="allUd">
              <section v-for="(items, index) in udOptions" :key="index">
                <option :value="items"></option>
              </section>
            </datalist>
          </div>
          <div class="col">
            <q-input
              v-model="iinOfCalled"
              type="text"
              label="ИИН вызываемого"
              mask="############"
              hint="Маска : ############"
            />
          </div>
          <div class="col">
            <q-input v-model="binAndIin" type="text" label="БИН/ИИН" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="positionTheCalledPerson"
              type="text"
              label="Должность вызываемого"
            />
          </div>
          <div class="col">
            <q-input
              v-model="region"
              type="text"
              label="Регион"
              list="region"
            />
            <datalist id="region">
              <div v-for="(item, index) in regions" :key="index">
                <option :value="item">{{ item }}</option>
              </div>
            </datalist>
          </div>
          <div class="col">
            <q-input
              v-model="plannedInvestigateActions"
              type="text"
              label="Планируемые следственные действия"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="formattedDate">
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
          </div>
          <div class="col">
            <q-input
              v-model="locationOfTheEvent"
              type="text"
              label="Место проведения"
            />
          </div>
          <div class="col">
            <q-input
              v-model="relationshipOfTheCaller"
              type="text"
              label="Отношение вызывающего к событию и субъекту"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="typesOfPlannedInvestigation"
              type="text"
              label="Виды планируемого следствия"
            />
          </div>
          <div class="col">
            <q-input
              v-model="isApplyToBusiness"
              type="text"
              label="Относится ли к бизнесу"
            />
          </div>
          <div class="col">
            <q-input
              v-model="iinOfTheDefender"
              type="text"
              label="ИИН защитника"
              mask="############"
              hint="Маска : ############"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="entrepreneurParticipation"
              type="text"
              label="Обоснование и необходимость участия предпринимателя"
            />
          </div>
          <div class="col">
            <q-input
              v-model="results"
              type="text"
              label="Результат от планируемого следственного действия"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" no-caps label="Сохранить" @click="saveEvent" />
        <q-btn
          color="positive"
          no-caps
          label="На согласование"
          @click="createEvent"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

import { getCurrentInstance } from "vue";
import { useNotifyStore } from "src/stores/notify-store";
import { useUserStore } from "src/stores/getApi-store";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const $q = useQuasar();
const notifyStore = useNotifyStore();
const userStore = useUserStore();

const idNumber = ref("");
const iinOfCalled = ref(null);
const binAndIin = ref("");
const positionTheCalledPerson = ref("");
const region = ref("");
const plannedInvestigateActions = ref("");
const date = ref("");
const formattedDate = ref("Дата и время проведения");
const locationOfTheEvent = ref("");
const relationshipOfTheCaller = ref("");
const typesOfPlannedInvestigation = ref("");
const isApplyToBusiness = ref("");
const applyBusinessOptions = ref(["true", "false"]);
const iinOfTheDefender = ref(null);
const entrepreneurParticipation = ref("");
const results = ref("");

function updateFormattedDate(newValue) {
  date.value = newValue;
  formattedDate.value = newValue.replace(" ", "T"); // Заменяем пробел на 'T'
}

// Следим за изменениями и сразу форматируем
watch(date, (newVal) => {
  formattedDate.value = newVal.replace(" ", "T");
});

const createEvent = async () => {
  try {
    notifyStore.loading(
      $q,
      "Подождите, заключение создается...",
      QSpinnerGears
    );
    await userStore.getUserInfo();
    const userData = userStore.userInfo;
    const iinofInvestigator = userData.iin;

    const data = {
      jobTitle: positionTheCalledPerson.value,
      region: region.value,
      plannedActions: plannedInvestigateActions.value,
      eventDateTime: formattedDate.value,
      eventPlace: locationOfTheEvent.value,
      relation: relationshipOfTheCaller.value,
      investigationType: typesOfPlannedInvestigation.value,
      relatesToBusiness: isApplyToBusiness.value,
      justification: entrepreneurParticipation.value,
      result: results.value,
      ud: idNumber.value,
      iindefender: iinOfTheDefender.value,
      iinofCalled: iinOfCalled.value,
      bin_IIN: binAndIin.value,
      iinofInvestigator: iinofInvestigator,
    };

    const response = await axios.post(`${serverUrl}create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    notifyStore.nofifySuccess($q, "Документ успешно создан");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    $q.loading.hide();
  } catch (error) {
    console.error(error);
    notifyStore.notifyError(
      $q,
      `Ошибка при создании события: ${error.response.data || error}`
    );
    $q.loading.hide();
  }
};

const saveEvent = async () => {
  try {
    notifyStore.loading(
      $q,
      "Подождите, временное заключение создается...",
      QSpinnerGears
    );
    await userStore.getUserInfo();
    const userData = userStore.userInfo;
    const iinofInvestigator = userData.iin;
    console.log(iinofInvestigator);

    const data = {
      jobTitle: positionTheCalledPerson.value,
      region: region.value,
      plannedActions: plannedInvestigateActions.value,
      eventDateTime: formattedDate.value,
      eventPlace: locationOfTheEvent.value,
      relation: relationshipOfTheCaller.value,
      investigationType: typesOfPlannedInvestigation.value,
      relatesToBusiness: isApplyToBusiness.value,
      justification: entrepreneurParticipation.value,
      result: results.value,
      ud: idNumber.value,
      iindefender: iinOfTheDefender.value,
      iinofCalled: iinOfCalled.value,
      bin_IIN: binAndIin.value,
      iinofInvestigator: iinofInvestigator,
    };

    const response = await axios.post(`${serverUrl}save`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    notifyStore.nofifySuccess(
      $q,
      "Документ успешно сохранен в странице `Временные заключении`"
    );
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    $q.loading.hide();
  } catch (error) {
    notifyStore.notifyError(
      $q,
      `Ошибка при создании события: ${error.response || error}`
    );
    console.error(`Ошибка при создании события: ${error.response || error}`);

    $q.loading.hide();
  }
};

const udOptions = ref("");
const getAllUd = async () => {
  try {
    notifyStore.loading(
      $q,
      "Подождите, номер УД загружаются...",
      QSpinnerGears
    );

    await userStore.getAllUD();
    udOptions.value = userStore.allUD;
    notifyStore.nofifySuccess($q, "Номер УД успешно загружен");
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при запросе:", error);
  }
};

const regions = ref("");
const getAllRegions = async () => {
  try {
    notifyStore.loading($q, "Подождите, регионы загружаются...", QSpinnerGears);
    await userStore.getAllRegions();
    regions.value = userStore.allRegions;
    notifyStore.nofifySuccess($q, "Регионы успешно загружен");
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при запросе:", error);
  }
};

onMounted(() => {
  getAllUd();
  getAllRegions();
});
</script>

<style></style>
