<template>
  <div>
    <q-dialog v-model="openDialogPage" persistent>
      <q-card style="width: 1200px">
        <div>
          <q-tabs v-model="tab" class="text-teal">
            <q-tab name="info" icon="info" label="Подробная информация" />
            <q-tab name="edit" icon="edit" label="Редактировать" />
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
                        {{
                          props.conclusionDetailedInformation.registrationNumber
                        }}
                      </p>
                      <span class="infoHeadline">Дата создания документа</span>
                      <p class="infoStyle">
                        {{ formattedDate }}
                      </p>
                      <span class="infoHeadline">Номер УД</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.udNumber }}
                      </p>
                      <span class="infoHeadline">Дата регистрации дела</span>
                      <p class="infoStyle">{{ formattedRegistrationDate }}</p>
                      <span class="infoHeadline">Статья УК</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.article }}
                      </p>
                      <span class="infoHeadline">Решение по делу</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.decision }}
                      </p>
                      <span class="infoHeadline">Краткая фабула</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.summary }}
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
                        {{
                          props.conclusionDetailedInformation
                            .calledPersonFullName
                        }}
                      </p>
                      <span class="infoHeadline">ИИН вызываемого</span>
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation.calledPersonIIN
                        }}
                      </p>
                      <span class="infoHeadline">Должность вызываемого</span>
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation
                            .calledPersonPosition
                        }}
                      </p>
                      <span class="infoHeadline">БИН/ИИН</span>
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation.calledPersonBIN
                        }}
                      </p>
                      <span class="infoHeadline">Место работы</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.workPlace }}
                      </p>
                      <span class="infoHeadline">Регион</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.region.name }}
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
                        {{
                          props.conclusionDetailedInformation.defenseAttorneyIIN
                        }}
                      </p>
                      <span class="infoHeadline">ФИО защитника</span>
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation
                            .defenseAttorneyFullName
                        }}
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
                          props.conclusionDetailedInformation
                            .plannedInvestigativeActions
                        }}
                      </p>
                      <span class="infoHeadline">Дата и время проведения</span>
                      <p class="infoStyle">
                        {{ formattedEventDateTime }}
                      </p>
                      <span class="infoHeadline">Место проведения</span>
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.eventPlace }}
                      </p>
                      <span class="infoHeadline">Следователь</span>
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation.investigatorIIN
                        }}
                      </p>
                      <span class="infoHeadline"
                        >Статус по делу вызываемого</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.status }}
                      </p>
                      <span class="infoHeadline"
                        >Отношение вызывающего к событию и субъекту</span
                      >
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation.relationToEvent
                        }}
                      </p>
                      <span class="infoHeadline"
                        >Виды планируемого следствия</span
                      >
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation.investigationTypes
                        }}
                      </p>
                      <span class="infoHeadline">Относится ли к бизнесу</span>
                      <p class="infoStyle">
                        {{
                          props.conclusionDetailedInformation.relatesToBusiness
                        }}
                      </p>
                      <span class="infoHeadline"
                        >Обоснование и необходимость участия
                        предпринимателя</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.justification }}
                      </p>
                      <span class="infoHeadline"
                        >Результат от планируемого следственного действия</span
                      >
                      <p class="infoStyle">
                        {{ props.conclusionDetailedInformation.result }}
                      </p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="edit">
              <EditPage
                :conclusionInformation="props.conclusionDetailedInformation"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-card-actions align="center">
          <q-btn
            color="green-4"
            no-caps
            label="Согласовать"
            @click="turnToPermanent(props.conclusionDetailedInformation)"
          />
          <q-btn
            color="red-4"
            flat
            no-caps
            label="Закрыть"
            @click="closeAdminDialogPage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import EditPage from "./EditPage.vue";

import { QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import { useNotifyStore } from "src/stores/notify-store";
import { computed, getCurrentInstance, ref, watch } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;
const tab = ref("info");
const $q = useQuasar();
const javascriptStore = useJavaScriptFunction();
const notifyStore = useNotifyStore();

const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    required: true,
  },
  conclusionDetailedInformation: {
    type: Object,
    required: true,
  },
});
const openDialogPage = ref(props.isOpenDialog);

watch(
  () => props.isOpenDialog,
  (newVal) => {
    openDialogPage.value = newVal;
  }
);

const emit = defineEmits(["closeAdminDialogPage"]);
const closeAdminDialogPage = () => {
  emit("closeAdminDialogPage");
};

const formattedDate = computed(() =>
  javascriptStore.formatDate(props.conclusionDetailedInformation.creationDate)
);

const formattedRegistrationDate = computed(() =>
  javascriptStore.formatDate(
    props.conclusionDetailedInformation.registrationDate
  )
);

const formattedEventDateTime = computed(() =>
  javascriptStore.formatDate(props.conclusionDetailedInformation.eventDateTime)
);

const turnToPermanent = async (documentInfo) => {
  console.log(
    `${serverUrl}turn?registrationNumber=${documentInfo.registrationNumber}`
  );
  try {
    notifyStore.loading($q, "Подождите, документ в обработке", QSpinnerGears);

    const response = await axios.post(
      `${serverUrl}turn?registrationNumber=${documentInfo.registrationNumber}`,
      {},
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
    notifyStore.nofifySuccess($q, "Статус документа успешно изменен");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    $q.loading.hide();
    notifyStore.notifyError($q, `Ошибка при смене статуса документа: ${error}`);
    console.error(error);
  }
};
</script>

<style></style>
