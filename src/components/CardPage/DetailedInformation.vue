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
              <div v-for="item in props.conclusions" :key="item.id">
                {{ item }}
              </div>
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
  conclusions: {
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
