<template>
  <div>
    <q-dialog v-model="openDialogPage" persistent>
      <q-card style="width: 1200px">
        <div>
          <q-tabs v-model="tab" class="text-teal">
            <q-tab name="info" icon="info" label="Подробная информация" />
            <q-tab name="history" icon="history" label="История" />
            <q-tab name="path" icon="map" label="Путь согласования " />
          </q-tabs>

          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="info">
              <q-list>
                <q-expansion-item
                  popup
                  icon="filter_1"
                  label="Данные о документе"
                  caption="Регистрационный номер, номер УД, дата регистрации и другие связанные данные"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section>
                      <span class="infoHeadline">Регистрационный номер</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.registrationNumber }}
                      </p>
                      <span class="infoHeadline">Дата создания документа</span>
                      <p class="infoStyle">
                        {{ formattedDate }}
                      </p>
                      <span class="infoHeadline">Номер УД</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.udNumber }}
                      </p>
                      <span class="infoHeadline">Дата регистрации дела</span>
                      <p class="infoStyle">{{ formattedRegistrationDate }}</p>
                      <span class="infoHeadline">Статья УК</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.article }}
                      </p>
                      <span class="infoHeadline">Решение по делу</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.decision }}
                      </p>
                      <span class="infoHeadline">Краткая фабула</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.summary }}
                      </p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  popup
                  icon="filter_2"
                  label="Данные вызываемого"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section>
                      <span class="infoHeadline">ФИО вызываемого</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.calledPersonFullName }}
                      </p>
                      <span class="infoHeadline">ИИН вызываемого</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.calledPersonIIN }}
                      </p>
                      <span class="infoHeadline">Должность вызываемого</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.calledPersonPosition }}
                      </p>
                      <span class="infoHeadline">БИН/ИИН</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.calledPersonBIN }}
                      </p>
                      <span class="infoHeadline">Место работы</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.workPlace }}
                      </p>
                      <span class="infoHeadline">Регион</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.region.name }}
                      </p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  popup
                  icon="filter_3"
                  label="Данные защитника"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section>
                      <span class="infoHeadline">ИИН защитника</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.defenseAttorneyIIN }}
                      </p>
                      <span class="infoHeadline">ФИО защитника</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.defenseAttorneyFullName }}
                      </p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  popup
                  icon="filter_4"
                  label="Остальные данные"
                  caption="Статус по делу вызываемого, дата и время проведения, место проведения, отношение вызывающего к событию и субъекту и другие данные"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section>
                      <span class="infoHeadline"
                        >Планируемые следственные действия</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionInfo.plannedInvestigativeActions }}
                      </p>
                      <span class="infoHeadline">Дата и время проведения</span>
                      <p class="infoStyle">
                        {{ formattedEventDateTime }}
                      </p>
                      <span class="infoHeadline">Место проведения</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.eventPlace }}
                      </p>
                      <span class="infoHeadline">Следователь</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.investigatorIIN }}
                      </p>
                      <span class="infoHeadline"
                        >Статус по делу вызываемого</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionInfo.status }}
                      </p>
                      <span class="infoHeadline"
                        >Отношение вызывающего к событию и субъекту</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionInfo.relationToEvent }}
                      </p>
                      <span class="infoHeadline"
                        >Виды планируемого следствия</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionInfo.investigationTypes }}
                      </p>
                      <span class="infoHeadline">Относится ли к бизнесу</span>
                      <p class="infoStyle">
                        {{ props.conclusionInfo.relatesToBusiness }}
                      </p>
                      <span class="infoHeadline"
                        >Обоснование и необходимость участия
                        предпринимателя</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionInfo.justification }}
                      </p>
                      <span class="infoHeadline"
                        >Результат от планируемого следственного действия</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionInfo.result }}
                      </p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="history">
              <q-input
                v-model="goal"
                type="text"
                label="Причины и цели повторного вызова"
              />

              <div class="q-mt-sm" v-show="isCalledHistory">
                <span class="infoHeadline">Статус предыдущего вызова</span>
                <p class="infoStyle">
                  {{ history.prevCall }}
                </p>
                <span class="infoHeadline">Статус согласования</span>
                <p class="infoStyle">
                  {{ history.status }}
                </p>
                <span class="infoHeadline">Время прихода</span>
                <p class="infoStyle">
                  {{ formattedCameTime }}
                </p>
                <span class="infoHeadline">Время ухода</span>
                <p class="infoStyle">
                  {{ formattedLeaveTime || "Не указано" }}
                </p>
                <span class="infoHeadline"
                  >Причины и цели повторного вызова</span
                >
                <p class="infoStyle">
                  {{ history.goal }}
                </p>
              </div>
              <q-btn
                no-caps
                color="primary"
                label="Получить историю"
                @click="showHistory"
              />
            </q-tab-panel>
            <q-tab-panel name="path">
              <span class="infoHeadline">Должность</span>
              <p class="infoStyle">
                {{ pathCall.jobTitle }}
              </p>
              <span class="infoHeadline">ФИО</span>
              <p class="infoStyle">
                {{ pathCall.fullName }}
              </p>
              <span class="infoHeadline">Статус согласования</span>
              <p class="infoStyle">
                {{ pathCall.status }}
              </p>
              <span class="infoHeadline">Дата и время согласования</span>
              <p class="infoStyle">
                {{ formattedPathCallDate || "Не указано" }}
              </p>
              <span class="infoHeadline"
                >Причины отправки на доработку/отказ/без рассмотрения</span
              >
              <p class="infoStyle">
                {{ pathCall.reason }}
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-card-actions align="center">
          <div
            class="q-mr-sm"
            v-if="props.conclusionInfo.status == 'Согласовано'"
          >
            <q-btn color="green-4" no-caps label="Скачать" @click="download" />
          </div>
          <q-btn
            color="green-4"
            no-caps
            label="Согласовать"
            @click="
              openDesicionPage(
                'Согласовано',
                'Согласовать',
                'green-4',
                'Документ успешно согласован'
              )
            "
          />
          <q-btn
            color="red-4"
            no-caps
            label="Отказать"
            @click="
              openDesicionPage(
                'Отказано',
                'Отказать',
                'red-4',
                'Документу успешно отказано'
              )
            "
          />
          <q-btn
            color="blue-4"
            no-caps
            label="Оставить"
            @click="
              openDesicionPage(
                'Оставлено без рассмотрения',
                'Оставить без рассмотрения',
                'blue-4',
                'Документу успешно оставлен без рассмотрения'
              )
            "
          />
          <q-btn
            color="blue-4"
            no-caps
            label="Доработать"
            @click="
              openDesicionPage(
                'Отправлено на доработку',
                'Отправить на доработку',
                'blue-4',
                'Документу успешно отправлен на доработку'
              )
            "
          />
          <q-btn
            color="red-4"
            flat
            no-caps
            label="Закрыть"
            @click="closeWindow"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <DesicionPage
      :openRefusedDialogPage="openRefusedDialogPage"
      @closeRefusedDialog="closeRefusedDialog"
      :docsStatus="docsStatus"
      :buttonLabel="buttonLabel"
      :buttonColor="buttonColor"
      :logAnswer="logAnswer"
      :informationForRefusedComponent="informationForRefusedComponent"
    />
  </div>
</template>

<script setup>
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import DesicionPage from "../Status/DecisionPage.vue";
import HistoryPage from "../../pages/HistoryPage.vue";
import { computed, ref, watch, getCurrentInstance, onMounted } from "vue";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useUserStore } from "src/stores/getApi-store";

const tab = ref("info");
const javascriptStore = useJavaScriptFunction();
const notifyStore = useNotifyStore();
const userStore = useUserStore();
const $q = useQuasar();
const { proxy } = getCurrentInstance();
const webUrl = proxy.$webUrl;
const serverUrl = proxy.$serverUrl;

const openRefusedDialogPage = ref(false);
const buttonLabel = ref("");
const docsStatus = ref("");
const buttonColor = ref("");
const logAnswer = ref("");

const closeRefusedDialog = () => {
  openRefusedDialogPage.value = false;
};

const props = defineProps({
  isOpenDetailedWindow: {
    type: Boolean,
    required: true,
  },
  conclusionInfo: {
    type: Object,
    required: true,
  },
});
const openDialogPage = ref(props.isOpenDetailedWindow);

watch(
  () => props.isOpenDetailedWindow,
  (newVal) => {
    openDialogPage.value = newVal;
    getAgreement();
  }
);

const informationForRefusedComponent = ref("");
const openDesicionPage = (status, label, color, log) => {
  openRefusedDialogPage.value = true;
  docsStatus.value = status;
  buttonLabel.value = label;
  buttonColor.value = color;
  logAnswer.value = log;
  informationForRefusedComponent.value = props.conclusionInfo;
};

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};

const history = ref("");
const isCalledHistory = ref(false);
const getHistory = async (calledPersonIIN, investigatorIIN, goal) => {
  try {
    notifyStore.loading($q, "Подождите, история загружается...", QSpinnerGears);
    const response = await axios.get(
      `${serverUrl}history?iinOfCalled=${calledPersonIIN}&iinUser=${investigatorIIN}&goal=${goal}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    $q.loading.hide();
    history.value = response.data;
    isCalledHistory.value = true;
    notifyStore.nofifySuccess($q, "История успешно загружена");
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при получении данных пользователя:", error);
    notifyStore.notifyError(
      $q,
      `Ошибка при получении данных пользователя: ${error}`
    );
    throw error;
  }
};

const pathCall = ref("");
const getAgreement = async () => {
  try {
    if (
      !props.conclusionInfo.registrationNumber ||
      !props.conclusionInfo.investigatorIIN
    ) {
      console.warn("registrationNumber или investigatorIIN отсутствуют");
      return;
    }

    const response = await axios.get(
      `${serverUrl}usersAgreements?IIN=${props.conclusionInfo.investigatorIIN}&regNum=${props.conclusionInfo.registrationNumber}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    pathCall.value = response.data;
  } catch (error) {
    console.error("Error fetching agreements:", error);
  }
};

const download = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    await userStore.getUserInfo();
    const data = userStore.userInfo;
    const iin = data.iin;

    if (!iin) {
      console.error("IIN не найден!");
      return;
    }
    const response = await axios.get(
      `${serverUrl}pdfConclusion?registerNumber=${props.conclusionInfo.registrationNumber}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
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
    $q.loading.hide();
    notifyStore.nofifySuccess($q, `PDF успешно загружен.`);
  } catch (error) {
    $q.loading.hide();
    console.error("Ошибка при загрузке PDF:", error);
    notifyStore.notifyError($q, `Ошибка при загрузке PDF:", ${error}`);
  }
};

const goal = ref("");
const showHistory = () => {
  getHistory(
    props.conclusionInfo.calledPersonIIN,
    props.conclusionInfo.investigatorIIN,
    goal.value
  );
};

const formattedDate = computed(() =>
  javascriptStore.formatDate(props.conclusionInfo.creationDate)
);

const formattedRegistrationDate = computed(() =>
  javascriptStore.formatDate(props.conclusionInfo.registrationDate)
);

const formattedEventDateTime = computed(() =>
  javascriptStore.formatDate(props.conclusionInfo.eventDateTime)
);

const formattedCameTime = computed(() =>
  javascriptStore.formatDate(history.value.came)
);

const formattedLeaveTime = computed(() =>
  javascriptStore.formatDate(history.value.leave)
);
</script>

<style></style>
