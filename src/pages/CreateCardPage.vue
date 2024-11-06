<template>
  <div class="q-px-xl q-py-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="idNumber" type="text" label="Номер УД" />
          </div>
          <div class="col">
            <q-input v-model="iin" type="text" label="ИИН вызываемого" />
          </div>
          <div class="col">
            <q-input v-model="binAndIin" type="text" label="БИН/ИИН" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="positionTheCalledPerson"
              type="text"
              label="Должность вызываемого"
            />
          </div>
          <div class="col">
            <q-input v-model="region" type="text" label="Регион" />
          </div>
          <div class="col">
            <q-input
              v-model="plannedInvestigateActions"
              type="text"
              label="Планируемые следственные действия"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="date">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="locationOfTheEvent"
              type="text"
              label="Место проведения"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const idNumber = ref("");
const iin = ref("");
const binAndIin = ref("");
const positionTheCalledPerson = ref("");
const region = ref("");
const plannedInvestigateActions = ref("");
const date = ref("Дата и время проведения");
const locationOfTheEvent = ref("");
</script>

<style></style>
