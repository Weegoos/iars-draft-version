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
              <div class="row q-gutter-sm">
                <div class="col">
                  <span class="infoHeadline">Регистрационный номер</span>
                  <p class="infoStyle">
                    {{
                      props.detialedInformation.registrationNumber ||
                      "Не указан"
                    }}
                  </p>
                </div>
                <div class="col">
                  <span class="infoHeadline">Номер УД</span>
                  <p class="infoStyle">
                    {{ props.detialedInformation.udNumber || "Не указан" }}
                  </p>
                </div>
              </div>
              <span class="infoHeadline">Дата создания документа</span>
              <p class="infoStyle">
                {{ props.detialedInformation.creationDate || "Не указан" }}
              </p>

              <span class="infoHeadline">Дата регистрации дела</span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].registrationDate || "Не указан"
                }}
              </p>
              <span class="infoHeadline">Статья УК</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].article || "Не указан" }}
              </p>
              <span class="infoHeadline">Решение по делу</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].summary || "Не указан" }}
              </p>
              <span class="infoHeadline">Краткая фабула</span>
              <p class="infoStyle"></p>
              <span class="infoHeadline">ИИН вызываемого</span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].calledPersonIIN || "Не указан"
                }}
              </p>
              <span class="infoHeadline">ФИО вызываемого</span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].calledPersonFullName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Должность вызываемого</span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].calledPersonPosition ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">БИН/ИИН</span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].calledPersonBIN || "Не указан"
                }}
              </p>
              <span class="infoHeadline">Место работы</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].workPlace || "Не указан" }}
              </p>
              <span class="infoHeadline">Регион</span>
              <p class="infoStyle">
                {{ props.conclusions.region.name || "Не указан" }}
              </p>
              <span class="infoHeadline"
                >Планируемые следственные действия</span
              >
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].plannedInvestigativeActions ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Дата и время проведения</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].eventDateTime || "Не указан" }}
              </p>
              <span class="infoHeadline">Место проведения</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].eventPlace || "Не указан" }}
              </p>
              <span class="infoHeadline">Следователь</span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].investigator.name || "Не указан"
                }}
                {{
                  props.detialedInformation[0].investigator.secondName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline">Статус по делу вызываемого</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].status || "Не указан" }}
              </p>
              <span class="infoHeadline"
                >Отношение вызывающего к событию и субъекту</span
              >
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].relationToEvent || "Не указан"
                }}
              </p>
              <span class="infoHeadline">Виды планируемого следствия</span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].justification || "Не указан" }}
              </p>
              <span class="infoHeadline">ИИН защитника </span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].defenseAttorneyIIN || "Не указан"
                }}
              </p>
              <span class="infoHeadline">ИИН защитника </span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].defenseAttorneyIIN || "Не указан"
                }}
              </p>
              <span class="infoHeadline">ФИО защитника </span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].defenseAttorneyFullName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Обоснование и необходимость участия предпринимателя
              </span>
              <p class="infoStyle">
                {{
                  props.detialedInformation[0].defenseAttorneyFullName ||
                  "Не указан"
                }}
              </p>
              <span class="infoHeadline"
                >Результат от планируемого следственного действия
              </span>
              <p class="infoStyle">
                {{ props.detialedInformation[0].result || "Не указан" }}
              </p>
            </q-tab-panel>

            <q-tab-panel name="history">
              <p>История будет храниться здесь</p>
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
import { ref, watch } from "vue";

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

watch(
  () => props.conclusions,
  (newVal) => {
    console.log(newVal);
  }
);

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};

const tab = ref("info");
</script>

<style></style>
