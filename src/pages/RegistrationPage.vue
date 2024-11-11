<template>
  <div class="fixed-center">
    <q-card class="my-card" style="width: 70vw">
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="name"
              type="text"
              label="Напишите имя"
              hint="Например: Айсултан"
            />
          </div>
          <div class="col">
            <q-input
              v-model="secondName"
              type="text"
              label="Напишите фамилию"
              hint="Например: Хаббасов"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="email"
              type="email"
              label="Напишите почту"
              hint="Например: example@gmail.com"
            />
          </div>
          <div class="col">
            <q-input
              v-model="password"
              type="password"
              label="Напишите пароль"
              hint="Не менее 6 символов"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="department"
              type="text"
              label="Напишите департамент"
            />
          </div>
          <div class="col">
            <q-input v-model="iin" type="text" label="Напишите ИИН" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="region" type="text" label="Напишите регион" />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="positive"
          no-caps
          label="Зарегистрироваться"
          @click="registration"
        />
        <q-btn color="primary" no-caps label="Есть аккаунт?" @click="onClick" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const registration = async () => {};
</script>

<style></style>
