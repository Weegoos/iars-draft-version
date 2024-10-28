<template>
  <div>
    <q-card class="">
      <section class="row q-gutter-md" style="align-items: stretch">
        <div class="col-4">
          <q-card-section>
            <span class="infoHeadline">№ (порядковый)</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Регистрационный номер</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Дата создания документа</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">ИИН вызываемого</span>
            <p class="infoStyle text-capitalize"></p>
          </q-card-section>
        </div>
        <div class="col-3">
          <q-card-section>
            <span class="infoHeadline">ФИО вызываемого</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Номер УД</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Статья УК</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Время прихода</span>
            <p class="infoStyle text-capitalize"></p>
          </q-card-section>
        </div>

        <div class="col-3">
          <q-card-section>
            <span class="infoHeadline">Место работы</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Должность</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Регион</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">Относится ли к бизнесу</span>
            <p class="infoStyle text-capitalize"></p>
            <span class="infoHeadline">ФИО согласующего</span>
            <p class="infoStyle text-capitalize"></p>
          </q-card-section>
        </div>
        <div class="col">
          <q-card-actions vertical align="center" class="q-mt-lg">
            <q-btn
              color="primary"
              no-caps
              label="Просмотреть"
              class="q-mb-md"
            />
            <q-btn color="positive" no-caps label="Согласовать" />
          </q-card-actions>
        </div>
      </section>
    </q-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
