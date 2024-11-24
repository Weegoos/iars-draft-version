<template>
  <div>
    <q-dialog v-model="openUserDetailedInformation" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-list>
            <q-expansion-item
              popup
              icon="person"
              default-opened
              label="Персональные данные"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">ФИО</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.secondName }}
                    {{ props.conclusionDetailedInformation.name }}
                  </p>
                  <span class="infoHeadline">ИИН</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.iin }}
                  </p>
                  <span class="infoHeadline">Электронная почта</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.email }}
                  </p>
                  <span class="infoHeadline">Дата регистрации</span>
                  <p class="infoStyle">
                    {{ formattedRegistrationDate }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item popup icon="send" label="Outbox" caption="Empty">
              <q-separator />
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              icon="drafts"
              label="Draft"
              caption="Draft a new email"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            color="green-4"
            no-caps
            label="Повышение"
            @click="promoteUser(props.conclusionDetailedInformation)"
          />
          <q-btn
            flat
            no-caps
            label="Закрыть"
            color="red-4"
            @click="closeAdminDialogPage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { computed, ref, watch } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const serverUrl = proxy.$serverUrl;

const $q = useQuasar();
const props = defineProps({
  isOpenAdminDialogPage: {
    type: Boolean,
    required: true,
  },
  conclusionDetailedInformation: {
    type: Object,
    requied: true,
  },
});
const openUserDetailedInformation = ref(props.isOpenAdminDialogPage);
watch(
  () => props.isOpenAdminDialogPage,
  (newVal) => {
    openUserDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeAdminDialogPage"]);
const closeAdminDialogPage = () => {
  emit("closeAdminDialogPage");
};

const promoteUser = async (item) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(
      `${serverUrl}admin/promote?IIN=${item.iin}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Ответ сервера:", response.data);

    $q.notify({
      message: `Пользователь ${item.name} ${item.secondName} успешно повышен в должности`,
      icon: "check",
      color: "positive",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Ошибка при повышении:", error.response || error);
  }
};

function formatDate(inputDate) {
  if (!inputDate) return "Не указано";
  const date = new Date(inputDate);
  const yy = String(date.getFullYear()).slice(0);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `Дата: ${yy}-${mm}-${dd} Время: ${hours}:${minutes}`;
}
const formattedRegistrationDate = computed(() =>
  formatDate(props.conclusionDetailedInformation.registrationDate)
);
</script>

<style></style>
