<template>
  <div
    class="q-pa-md relative-position"
    style="height: 280px; max-height: 80vh"
  >
    <q-btn
      v-morph:btn:mygroup:300.resize="morphGroupModel"
      class="absolute-bottom-left q-ma-md"
      fab
      color="primary"
      size="lg"
      icon="add"
      @click="nextMorph"
    />

    <q-card
      v-morph:card1:mygroup:500.resize="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 500px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Раздел `Создание Карточек`
      </q-card-section>

      <q-card-section class="text-subtitle1">
        Этот раздел предназначен для создание заключений со статусом `В работе`
        и `На согласовании`
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Next" @click="nextMorph" />
      </q-card-actions>
    </q-card>

    <q-card
      v-morph:card2:mygroup:500.tween="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 500px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Создание заключений со статусом `В работе`</q-card-section
      >

      <q-card-section class="q-py-xl text-center text-subtitle2">
        Заполняете все необходимые поля и нажимаете на кнопку `Сохранить`
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Next" @click="nextMorph" />
      </q-card-actions>
    </q-card>

    <q-card
      v-morph:card3:mygroup:500.resize="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 550px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Создание заключений со статусом `На согласовании`</q-card-section
      >

      <q-card-section class="q-py-xl text-center text-subtitle2">
        Заполняете все необходимые поля и нажимаете на кнопку `На согласование`
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" @click="nextMorph" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Текущая модель морфинга
const morphGroupModel = ref("btn");

// Логика переключения состояния
const nextMorphStep = {
  btn: "card1",
  card1: "card2",
  card2: "card3",
  card3: "btn",
};

const nextMorph = () => {
  morphGroupModel.value = nextMorphStep[morphGroupModel.value];
};
</script>
