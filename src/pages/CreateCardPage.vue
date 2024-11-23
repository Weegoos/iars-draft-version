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
            <q-input v-model="region" type="text" label="Регион" />
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
            <q-input v-model="date">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
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
        <q-btn color="primary" no-caps label="Сохранить" />
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
import { useQuasar } from "quasar";
import axios from "axios";
import { ref } from "vue";

import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const idNumber = ref("");
const iinOfCalled = ref(null);
const binAndIin = ref("");
const positionTheCalledPerson = ref("");
const region = ref("");
const plannedInvestigateActions = ref("");
const date = ref("Дата и время проведения");
const locationOfTheEvent = ref("");
const relationshipOfTheCaller = ref("");
const typesOfPlannedInvestigation = ref("");
const isApplyToBusiness = ref("");
const iinOfTheDefender = ref(null);
const entrepreneurParticipation = ref("");
const results = ref("");

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

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

getInfo();

const createEvent = async () => {
  try {
    const userData = await getInfo();
    const iinofInvestigator = userData?.iin;
    console.log(iinofInvestigator);

    const data = {
      jobTitle: positionTheCalledPerson.value,
      region: region.value,
      plannedActions: plannedInvestigateActions.value,
      eventDateTime: "2024-11-19T15:26:10.949Z",
      eventPlace: locationOfTheEvent.value,
      relation: relationshipOfTheCaller.value,
      investigationType: "string",
      relatesToBusiness: true,
      justification: "string",
      result: results.value,
      ud: idNumber.value,
      iindefender: iinOfTheDefender.value,
      iinofCalled: iinOfCalled.value,
      bin_IIN: binAndIin.value,
      iinofInvestigator: iinofInvestigator,
    };

    const response = await axios.post(`${serverUrl}create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Убедитесь, что токен есть
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Успешно создано:", response.data);
    $q.notify({
      message: "Документ успешно создан",
      icon: "check",
      color: "positive",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка при создании события:", error.response || error);
  }
};

const udOptions = ref("");
const getAllUd = async () => {
  try {
    const response = await axios.get(`${serverUrl}allUD`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    udOptions.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

getAllUd();
</script>

<style></style>
