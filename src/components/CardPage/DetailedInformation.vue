<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 1200px">
        <div>
          <q-tabs v-model="tab" class="text-teal">
            <q-tab name="info" icon="info" label="Подробная информация" />
            <q-tab name="history" icon="history" label="История" />
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
                        {{ props.detialedInformation.registrationNumber }}
                      </p>
                      <span class="infoHeadline">Дата создания документа</span>
                      <p class="infoStyle">
                        {{ formattedDate }}
                      </p>
                      <span class="infoHeadline">Номер УД</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.udNumber }}
                      </p>
                      <span class="infoHeadline">Дата регистрации дела</span>
                      <p class="infoStyle">{{ formattedRegistrationDate }}</p>
                      <span class="infoHeadline">Статья УК</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.article }}
                      </p>
                      <span class="infoHeadline">Решение по делу</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.decision }}
                      </p>
                      <span class="infoHeadline">Краткая фабула</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.summary }}
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
                        {{ props.detialedInformation.calledPersonFullName }}
                      </p>
                      <span class="infoHeadline">ИИН вызываемого</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.calledPersonIIN }}
                      </p>
                      <span class="infoHeadline">Должность вызываемого</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.calledPersonPosition }}
                      </p>
                      <span class="infoHeadline">БИН/ИИН</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.calledPersonBIN }}
                      </p>
                      <span class="infoHeadline">Место работы</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.workPlace }}
                      </p>
                      <span class="infoHeadline">Регион</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.region.name }}
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
                        {{ props.detialedInformation.defenseAttorneyIIN }}
                      </p>
                      <span class="infoHeadline">ФИО защитника</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.defenseAttorneyFullName }}
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
                        {{
                          props.detialedInformation.plannedInvestigativeActions
                        }}
                      </p>
                      <span class="infoHeadline">Дата и время проведения</span>
                      <p class="infoStyle">
                        {{ formattedEventDateTime }}
                      </p>
                      <span class="infoHeadline">Место проведения</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.eventPlace }}
                      </p>
                      <span class="infoHeadline">Следователь</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.investigatorIIN }}
                      </p>
                      <span class="infoHeadline"
                        >Статус по делу вызываемого</span
                      >
                      <p class="infoStyle">
                        {{ props.detialedInformation.status }}
                      </p>
                      <span class="infoHeadline"
                        >Отношение вызывающего к событию и субъекту</span
                      >
                      <p class="infoStyle">
                        {{ props.detialedInformation.relationToEvent }}
                      </p>
                      <span class="infoHeadline"
                        >Виды планируемого следствия</span
                      >
                      <p class="infoStyle">
                        {{ props.detialedInformation.investigationTypes }}
                      </p>
                      <span class="infoHeadline">Относится ли к бизнесу</span>
                      <p class="infoStyle">
                        {{ props.detialedInformation.relatesToBusiness }}
                      </p>
                      <span class="infoHeadline"
                        >Обоснование и необходимость участия
                        предпринимателя</span
                      >
                      <p class="infoStyle">
                        {{ props.detialedInformation.justification }}
                      </p>
                      <span class="infoHeadline"
                        >Результат от планируемого следственного действия</span
                      >
                      <p class="infoStyle">
                        {{ props.detialedInformation.result }}
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
                @click="emitGoal"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-card-actions align="center">
          <div v-if="props.detialedInformation.status == 'Согласовано'">
            <q-btn color="green-4" no-caps label="Скачать" @click="download" />
          </div>

          <div
            v-if="props.detialedInformation.status == 'Отправлено на доработку'"
          >
            <q-btn
              color="orange-4"
              no-caps
              label="Редактировать"
              @click="editPage"
            />
          </div>
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
  </div>
</template>

<script setup>
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useUserStore } from "src/stores/getApi-store";
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import { useNotifyStore } from "src/stores/notify-store";
import { computed, ref, watch, getCurrentInstance, onMounted } from "vue";

const javascriptStore = useJavaScriptFunction();
const notifyStore = useNotifyStore();
const userStore = useUserStore();
const $q = useQuasar();

const { proxy } = getCurrentInstance();
const webUrl = proxy.$webUrl;
const serverUrl = proxy.$serverUrl;

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  detialedInformation: {
    type: Object,
    required: true,
  },
});

const confirm = ref(props.isOpen);
watch(
  () => props.isOpen,
  (newVal) => {
    confirm.value = newVal;
  }
);

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

const goal = ref("");
const emitGoal = () => {
  getHistory(
    props.detialedInformation.calledPersonIIN,
    props.detialedInformation.investigatorIIN,
    goal.value
  );
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
      `${serverUrl}pdfConclusion?registerNumber=${props.detialedInformation.registrationNumber}`,
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

const editPage = async () => {
  window.open(
    `${webUrl}remake-temps?registrationNumber=${props.detialedInformation.registrationNumber}`,
    "_blank"
  );
};

const tab = ref("info");

const formattedDate = computed(() =>
  javascriptStore.formatDate(props.detialedInformation.creationDate)
);

const formattedRegistrationDate = computed(() =>
  javascriptStore.formatDate(props.detialedInformation.registrationDate)
);

const formattedEventDateTime = computed(() =>
  javascriptStore.formatDate(props.detialedInformation.eventDateTime)
);

const formattedCameTime = computed(() =>
  javascriptStore.formatDate(history.value.came)
);

const formattedLeaveTime = computed(() =>
  javascriptStore.formatDate(history.value.leave)
);
</script>

<style></style>
