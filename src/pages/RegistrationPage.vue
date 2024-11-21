<template>
  <div class="fixed-center" style="display: flex; height: 100vh; width: 100vw">
    <!-- Левая половина с видео -->
    <div style="flex: 1; position: relative; overflow: hidden">
      <video
        src="../assets/video/background.mp4"
        autoplay
        muted
        loop
        playsinline
        style="width: 100%; height: 100%; object-fit: cover"
      ></video>

      <!-- Надпись -->
      <div class="carouselClass">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <q-icon name="terrain" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <!-- Правая половина с текстом -->
    <div
      style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.8);
      "
    >
      <q-card class="my-card" style="width: 90%">
        <q-card-section align="center">
          <p class="text-h5">Регистрация</p>
        </q-card-section>
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
              <q-select
                v-model="department"
                :options="departmentList"
                label="Введите департамент"
              />
            </div>
            <div class="col">
              <q-input v-model="iin" type="number" label="Напишите ИИН" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="region"
            :options="regionList"
            v-show="isRegionVisible"
            label="Введите регион"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            color="positive"
            no-caps
            label="Зарегистрироваться"
            @click="registration"
          />
          <q-btn
            color="primary"
            no-caps
            label="Есть аккаунт?"
            @click="pushToAuthorization"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const slide = ref("style");
const slides = ["style", "tv", "layers", "map"];
let slideIndex = 0;
const lorem = ref("Batyr");
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    slide.value = slides[slideIndex];
  }, 3000);
});

onBeforeMount(() => {
  clearInterval(interval);
});

const name = ref("");
const secondName = ref("");
const email = ref("");
const password = ref("");
const department = ref("");
const iin = ref("");
const region = ref("");
const $q = useQuasar();

const departmentList = ref("");
const regionList = ref("");
const isRegionVisible = ref(false);

watch(
  () => department.value,
  (newVal) => {
    if (newVal.length > 0) {
      getAllRegions(newVal);
      isRegionVisible.value = true;
    }
  }
);

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

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

    const jsonData = JSON.stringify(data);

    const response = await axios.post(`${serverUrl}register`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Пользователь успешно зарегистрирован", response.data);
    $q.notify({
      message: `Пользователь успешно зарегистрирован`,
      color: "positive",
      icon: "check",
    });
    router.push("/authorization");
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    $q.notify({
      message: `Ошибка при регистрации: ${error.response.data}`,
      color: "negative",
      icon: "error",
    });
  }
};

const router = useRouter();
const pushToAuthorization = () => {
  router.push("/authorization");
};

const getAllDepartments = async () => {
  try {
    const response = await axios.get(`${serverUrl}allDepartments`);
    departmentList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

const getAllRegions = async (department) => {
  try {
    const response = await axios.get(`${serverUrl}regInDep?dep=${department}`);
    regionList.value = response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
};

onMounted(() => {
  getAllDepartments();
});
</script>

<style scoped>
.carouselClass {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  justify-content: center;
  align-items: center;
}
</style>
