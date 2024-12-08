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
              <p>История будет храниться здесь</p>
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
import { useJavaScriptFunction } from "src/stores/javascript-function-store";
import { computed, ref, watch, getCurrentInstance } from "vue";

const javascriptStore = useJavaScriptFunction();

const { proxy } = getCurrentInstance();
const webUrl = proxy.$webUrl;

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
</script>

<style></style>
