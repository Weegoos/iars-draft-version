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
import axios from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";

const name = ref("");
const secondName = ref("");
const email = ref("");
const password = ref("");
const department = ref("");
const iin = ref("");
const region = ref("");
const $q = useQuasar();

const registration = async () => {
  try {
    const data = {
      email: email.value,
      name: name.value,
      secondName: secondName.value,
      password: password.value,
      department: department.value,
      region: region.value,
      iin: iin.value,
    };

    console.log(data);

    const jsonData = JSON.stringify(data);

    const response = await axios.post(
      "http://localhost:5002/register",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Registration successful:", response.data);
    $q.notify({
      message: `Registration successful`,
      color: "positive",
      icon: "check",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    $q.notify({
      message: `Error during registration: ${error}`,
      color: "negative",
      icon: "error",
    });
  }
};
</script>

<style></style>
