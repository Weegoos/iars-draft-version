<template>
  <div></div>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

// Определяем функцию show
function show(grid) {
  $q.bottomSheet({
    dark: true,
    message: "Горячие клавиши",
    grid,
    actions: [
      {
        label: "Авторизация",
        icon: "filter_1",
      },
      {
        label: "Авторизоваться (Enter)",
        icon: "1",
      },
    ],
  })
    .onOk((action) => {
      // console.log("Action chosen:", action.id);
    })
    .onCancel(() => {
      // console.log("Dismissed");
    })
    .onDismiss(() => {
      // console.log("I am triggered on both OK and Cancel");
    });
}

// Делаем функцию show доступной для родительского компонента
defineExpose({ show });
</script>

<style></style>
