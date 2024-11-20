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
              <div class="row q-gutter-sm">
                <div class="col">
                  <span class="infoHeadline">Регистрационный номер</span>
                  <p class="infoStyle">
                    {{ props.conclusionInfo.registrationNumber }}
                  </p>
                </div>
                <div class="col">
                  <span class="infoHeadline">Номер УД</span>
                  <p class="infoStyle">
                    {{ props.conclusionInfo.udNumber }}
                  </p>
                </div>
              </div>
              <span class="infoHeadline">Дата создания документа</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.creationDate }}
              </p>

              <span class="infoHeadline">Дата регистрации дела</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.registrationDate }}
              </p>
              <span class="infoHeadline">Статья УК</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.article }}
              </p>
              <span class="infoHeadline">Решение по делу</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.summary }}
              </p>
              <span class="infoHeadline">Краткая фабула</span>
              <p class="infoStyle">
                <!-- {{ props.conclusionInfo.summary }} -->
              </p>
              <span class="infoHeadline">ИИН вызываемого</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.calledPersonIIN || "Не указан" }}
              </p>
              <span class="infoHeadline">ФИО вызываемого</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.calledPersonFullName || "Не указан" }}
              </p>
              <span class="infoHeadline">Должность вызываемого</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.calledPersonPosition || "Не указан" }}
              </p>
              <span class="infoHeadline">БИН/ИИН</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.calledPersonBIN || "Не указан" }}
              </p>
              <span class="infoHeadline">Место работы</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.workPlace || "Не указан" }}
              </p>
              <span class="infoHeadline">Регион</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.region.name || "Не указан" }}
              </p>
              <span class="infoHeadline"
                >Планируемые следственные действия</span
              >
              <p class="infoStyle">
                {{
                  props.conclusionInfo.plannedInvestigativeActions ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Дата и время проведения</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.eventDateTime || "Не указан" }}
              </p>
              <span class="infoHeadline">Место проведения</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.eventPlace || "Не указан" }}
              </p>
              <span class="infoHeadline">Следователь</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.investigator.name || "Не указан" }}
                {{
                  props.conclusionInfo.investigator.secondName || "Не указан"
                }}
              </p>
              <span class="infoHeadline">Статус по делу вызываемого</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.status || "Не указан" }}
              </p>
              <span class="infoHeadline"
                >Отношение вызывающего к событию и субъекту</span
              >
              <p class="infoStyle">
                {{ props.conclusionInfo.relationToEvent || "Не указан" }}
              </p>
              <span class="infoHeadline">Виды планируемого следствия</span>
              <p class="infoStyle">
                {{ props.conclusionInfo.justification || "Не указан" }}
              </p>
              <span class="infoHeadline">ИИН защитника </span>
              <p class="infoStyle">
                {{ props.conclusionInfo.defenseAttorneyIIN || "Не указан" }}
              </p>
              <span class="infoHeadline">ИИН защитника </span>
              <p class="infoStyle">
                {{ props.conclusionInfo.defenseAttorneyIIN || "Не указан" }}
              </p>
              <span class="infoHeadline">ФИО защитника </span>
              <p class="infoStyle">
                {{
                  props.conclusionInfo.defenseAttorneyFullName || "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Обоснование и необходимость участия предпринимателя
              </span>
              <p class="infoStyle">
                {{
                  props.conclusionInfo.defenseAttorneyFullName || "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Результат от планируемого следственного действия
              </span>
              <p class="infoStyle">
                {{ props.conclusionInfo.result || "Не указан" }}
              </p>
            </q-tab-panel>

            <q-tab-panel name="history">
              <HistoryPage />
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-card-actions align="right">
          <q-btn color="negative" flat label="Закрыть" @click="closeWindow" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import HistoryPage from "../../pages/HistoryPage.vue";
import { ref, watch } from "vue";

const tab = ref("info");

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
</script>

<style></style>
