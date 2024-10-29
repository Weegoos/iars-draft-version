<template>
  <div>
    <q-input
      v-model="statusOfDocuments"
      type="text"
      label="Статус документа"
      list="documentsList"
    />
    <datalist id="documentsList">
      <div v-for="(item, index) in documentsOptions" :key="index">
        <option :value="item.name"></option>
      </div>
    </datalist>
    <div class="col" align="right">
      <q-btn
        color="primary"
        class="q-mb-md"
        icon="download"
        label="Скачать"
        @click="download"
      />
    </div>
    <q-card class="q-mb-xl">
      <section class="row" style="align-items: stretch">
        <div class="col">
          <q-card-section>
            <span class="infoHeadline">№ (порядковый)</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Регистрационный номер</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Дата создания документа</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">ИИН вызываемого</span>
            <p class="infoStyle text-capitalize"></p>
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section>
            <span class="infoHeadline">ФИО вызываемого</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Номер УД</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Статья УК</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Время прихода</span>
            <p class="infoStyle text-capitalize"></p>
          </q-card-section>
        </div>

        <div class="col">
          <q-card-section>
            <span class="infoHeadline">Место работы</span>
            <p class="infoStyle text-capitalize"></p>
            <div class="row q-gutter-sm">
              <section class="col">
                <span class="infoHeadline">Должность</span>
                <p class="infoStyle text-capitalize"></p>
              </section>
              <section class="col">
                <span class="infoHeadline">Относится ли к бизнесу</span>
                <p class="infoStyle text-capitalize"></p>
              </section>
            </div>
            <span class="infoHeadline">Регион</span>
            <p class="infoStyle text-capitalize"></p>

            <span class="infoHeadline">ФИО согласующего</span>
            <p class="infoStyle text-capitalize"></p>
          </q-card-section>
        </div>
      </section>
      <q-card-actions align="center" class="row">
        <q-btn
          color="primary"
          no-caps
          label="Просмотреть"
          @click="viewDetailedInformation"
        />
        <q-btn
          color="positive"
          no-caps
          label="Согласовать"
          @click="viewAgreementComponent"
        />
      </q-card-actions>
    </q-card>
    <DetailedInformation :isOpen="isOpen" @closeWindow="closeWindow" />
    <AgreementComponent
      :isOpenAgreementPage="isOpenAgreementPage"
      @closeAgreementWindow="closeAgreementWindow"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import DetailedInformation from "../components/CardPage/DetailedInformation.vue";
import AgreementComponent from "../components/CardPage/AgreementComponent.vue";

const isOpen = ref(false);
const viewDetailedInformation = () => {
  isOpen.value = true;
};

const closeWindow = () => {
  isOpen.value = false;
};

const download = () => {
  console.log("Download");
};

const isOpenAgreementPage = ref(false);
const viewAgreementComponent = () => {
  isOpenAgreementPage.value = true;
};

const closeAgreementWindow = () => {
  isOpenAgreementPage.value = false;
};

const statusOfDocuments = ref("");
const documentsOptions = ref([
  {
    name: "На рассмотрении",
  },
  {
    name: "На согласовании",
  },
]);
</script>

<style></style>
