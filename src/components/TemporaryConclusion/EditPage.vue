<template>
  <div class="text-white edit">
    <q-card class="my-card fixed-center text-white" style="width: 500px">
      <q-card-section class="text-white">
        <q-input
          v-model="idNumber"
          label-color="white"
          label="Номер УД "
          color="white"
          standout
          style="color: white"
        />
      </q-card-section>
      <q-card-actions vertical align="center">
        <q-btn
          flat
          no-caps
          color="orange-4"
          label="Редактировать"
          @click="clickToEditButton"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserStore } from "src/stores/getApi-store";
import { ref } from "vue";
import { getCurrentInstance } from "vue";

const userStore = useUserStore();
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const hash = window.location.hash;
const registrationNumber = ref("");
if (hash.includes("?")) {
  const queryString = hash.split("?")[1];

  const urlParams = new URLSearchParams(queryString);

  registrationNumber.value = urlParams.get("registrationNumber");

  // console.log(registrationNumber);
} else {
  console.log("Нет параметров в хэше");
}

const getInformationBasedOnRegistrationNumber = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5002/fullTempConclusion?regNumber=${registrationNumber.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

getInformationBasedOnRegistrationNumber();

const idNumber = ref("");
const editTemporaryConclusion = async () => {
  try {
    await userStore.getUserInfo();
    const userInfo = userStore.userInfo;
    const params = new URLSearchParams();

    params.append("registrationNumber", registrationNumber.value);
    if (idNumber.value) params.append("UD", idNumber.value);
    params.append("iinOfInvestigator", userInfo.iin);

    const response = await axios.put(
      `${serverUrl}edit?${params.toString()}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const clickToEditButton = () => {
  editTemporaryConclusion();
};
</script>

<style scoped>
.edit {
  background-image: url("https://images.unsplash.com/photo-1559242550-bdfaa5081d95?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: white;
}

.my-card {
  background-color: #0e1012;
}
</style>
