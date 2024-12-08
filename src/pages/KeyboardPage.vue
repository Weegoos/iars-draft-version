<template>
  <div></div>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

function show(grid) {
  $q.bottomSheet({
    dark: true,
    message: "Горячие клавиши",
    grid,
    actions: [
      {
        label: "Регистрация",
        icon: "filter_1",
      },
      {
        label: "Создать аккаунт (Enter)",
        icon: "keyboard_command",
      },
      {},
      {
        label: "Авторизация",
        icon: "filter_2",
      },
      {
        label: "Авторизоваться (Enter)",
        icon: "keyboard_command",
      },
      {},
      {
        label: "Главная страница",
        icon: "filter_3",
      },
      {
        label: "Фильтрация (Enter)",
        icon: "keyboard_command",
      },
      {
        label: "Очистить поля фильтрации (Backspace + Shift)",
        icon: "keyboard_command",
      },
      {},
      {
        label: "Редактирование",
        icon: "filter_4",
      },
      {
        label: "Редактировать (Enter)",
        icon: "keyboard_command",
      },
      {},
      {
        label: "Допольнительно",
        icon: "filter_5",
      },
      {
        label: "Показать подсказку горячих клавиш (Alt + Shift)",
        icon: "keyboard_command",
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

defineExpose({ show });
</script>

<style></style>
