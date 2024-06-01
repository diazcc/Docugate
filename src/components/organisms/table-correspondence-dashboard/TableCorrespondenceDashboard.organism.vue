<template>
  <section class="table-correspondence-dashboard-title">
    <article class="table-correspondence-dashboard-title__block">
      <TitleAtom :dataTitle="dataTableCorrespondenceDashboard.dataTitle"></TitleAtom>
      <TextAtom :dataText="dataTableCorrespondenceDashboard.dataText"></TextAtom>
    </article>

  </section>
  <section class="table-correspondence-dashboard-content">

    <article class="flex-table">
      <ul class="flex-table__row" v-if="dataTableCorrespondenceDashboard.data.lists.length < 1">
        <li class="flex-table__row__cell loading-component"></li>
        <li class="flex-table__row__cell loading-component"></li>
        <li class="flex-table__row__cell loading-component"></li>
      </ul>

      <ul class="flex-table__row" v-for="element in dataTableCorrespondenceDashboard.data.lists" :key="element.id">
        <li class="flex-table__row__cell flex-table__row__cell--document">
          {{ $t('name') }}: {{ element?.subject }}
        </li>
        <li class="flex-table__row__cell flex-table__row__cell--document">
          {{ $t('remitter') }}: {{ element?.remitter }}
        </li>

        <li class="flex-table__row__cell flex-table__row__cell--document">
          #: {{ element?.radication }}
        </li>
        <li class="flex-table__row__cell flex-table__row__cell--document">
          {{ $t('type') }}: {{ element?.type }}
        </li>
      </ul>
    </article>
  </section>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

import TitleAtom from "../../atoms/title/Title.atom.vue";
import TextAtom from "../../atoms/text/Text.atom.vue";
defineProps(["dataTableCorrespondenceDashboard"]);

</script>

<style scoped src="./TableCorrespondenceDashboard.organism.scss"></style>