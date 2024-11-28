<template>
  <div>
    <q-dialog v-model="openDialogPage" persistent>
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
              <p>История будет храниться здесь</p>
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-card-actions align="center">
          <q-btn
            color="green-4"
            no-caps
            label="Согласовать"
            @click="openDesicionPage"
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
    />
  </div>
</template>

<script setup>
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import DesicionPage from "../Status/DesicionPage.vue";
import HistoryPage from "../../pages/HistoryPage.vue";
import { computed, ref, watch } from "vue";

const tab = ref("info");
const javascriptStore = useJavaScriptFunction();

const openRefusedDialogPage = ref(false);

const openDesicionPage = () => {
  openRefusedDialogPage.value = true;
};

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
  }
);

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
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
</script>

<style></style>
