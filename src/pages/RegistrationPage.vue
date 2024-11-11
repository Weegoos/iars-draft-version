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
              type="text"
              label="Напишите почту"
              hint="Например: example@gmail.com"
            />
          </div>
          <div class="col">
            <q-input v-model="email" type="text" label="Напишите почту" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
