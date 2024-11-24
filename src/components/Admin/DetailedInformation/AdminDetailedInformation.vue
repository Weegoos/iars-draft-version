<template>
  <div>
    <q-dialog v-model="openAdminDetailedInformation" persistent>
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
                    {{ props.conclusionDetailedInformation.registrationNumber }}
                  </p>
                </div>
                <div class="col">
                  <span class="infoHeadline">Номер УД</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.udNumber }}
                  </p>
                </div>
              </div>
              <span class="infoHeadline">Дата создания документа</span>
              <p class="infoStyle">
                {{ props.conclusionDetailedInformation.creationDate }}
              </p>

              <span class="infoHeadline">Дата регистрации дела</span>
              <p class="infoStyle">
                {{ props.conclusionDetailedInformation.registrationDate }}
              </p>
              <span class="infoHeadline">Статья УК</span>
              <p class="infoStyle">
                {{ props.conclusionDetailedInformation.article }}
              </p>
              <span class="infoHeadline">Решение по делу</span>
              <p class="infoStyle">
                {{ props.conclusionDetailedInformation.summary }}
              </p>
              <span class="infoHeadline">Краткая фабула</span>
              <p class="infoStyle">
                <!-- {{ props.conclusionInfo.summary }} -->
              </p>
              <span class="infoHeadline">ИИН вызываемого</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.calledPersonIIN ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">ФИО вызываемого</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.calledPersonFullName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Должность вызываемого</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.calledPersonPosition ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">БИН/ИИН</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.calledPersonBIN ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Место работы</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.workPlace || "Не указан"
                }}
              </p>
              <span class="infoHeadline">Регион</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.region.name || "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Планируемые следственные действия</span
              >
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation
                    .plannedInvestigativeActions || "Не указан"
                }}
              </p>
              <span class="infoHeadline">Дата и время проведения</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.eventDateTime ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Место проведения</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.eventPlace || "Не указан"
                }}
              </p>
              <!-- <span class="infoHeadline">Следователь</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.investigator.name ||
                  "Не указан"
                }}
                {{
                  props.conclusionDetailedInformation.investigator.secondName ||
                  "Не указан"
                }}
              </p> -->
              <span class="infoHeadline">Статус по делу вызываемого</span>
              <p class="infoStyle">
                {{ props.conclusionDetailedInformation.status || "Не указан" }}
              </p>
              <span class="infoHeadline"
                >Отношение вызывающего к событию и субъекту</span
              >
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.relationToEvent ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Виды планируемого следствия</span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.justification ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">ИИН защитника </span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.defenseAttorneyIIN ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">ИИН защитника </span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.defenseAttorneyIIN ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">ФИО защитника </span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.defenseAttorneyFullName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Обоснование и необходимость участия предпринимателя
              </span>
              <p class="infoStyle">
                {{
                  props.conclusionDetailedInformation.defenseAttorneyFullName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Результат от планируемого следственного действия
              </span>
              <p class="infoStyle">
                {{ props.conclusionDetailedInformation.result || "Не указан" }}
              </p>
            </q-tab-panel>

            <q-tab-panel name="history">
              <p>История будет храниться здесь</p>
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <q-card-actions align="right">
          <q-btn
            color="negative"
            flat
            label="Закрыть"
            @click="closeAdminDialogPage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const tab = ref("info");
const props = defineProps({
  isOpenAdminDialogPage: {
    type: Boolean,
    required: true,
  },
  conclusionDetailedInformation: {
    type: Object,
    required: true,
  },
});
const openAdminDetailedInformation = ref(props.isOpenAdminDialogPage);

watch(
  () => props.isOpenAdminDialogPage,
  (newVal) => {
    openAdminDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeAdminDialogPage"]);
const closeAdminDialogPage = () => {
  emit("closeAdminDialogPage");
};
</script>

<style></style>
