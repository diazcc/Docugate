<!-- 
  TODO IMPORTANT: THIS COMPONENT MUST BE IMPROVE ABOUT STYLES AND STRUCTURE OF COMPONENTS

  ?ISSUES:

  *Redesign view about 

  !DON'T WORK WITH THIS COMPONENT BEFORE CHECK ALL ISSUES 
-->

<template>
  <section class="dashboard">
    <div class="dashboard__box__correspondence">
      <TableCorrespondenceDashboard :dataTableCorrespondenceDashboard="dataDashboardTemplate.dataTableCorrespondence"></TableCorrespondenceDashboard>
      <router-link to="/home/correspondence/received" class="mi-router-link">{{ $t('see_all') }}</router-link>
    </div>

    <div class="dashboard__box__job">
      <ColaborativeWork :dataColaborativeWork="dataDashboardTemplate.dataColaborativeWork"></ColaborativeWork>
      <router-link to="/home/correspondence/received" class="mi-router-link">{{ $t('search') }}</router-link>
    </div>
    <div class="dashboard__box__calendar">
      <CalendarWidget :dataCalendarWidget="dataDashboardTemplate.dataCalendarWidget"> </CalendarWidget>
    </div>
    <div class="dashboard__box__chart">
      <Statistic :dataStatistic="dataDashboardTemplate.dataStatistic"></Statistic>
    </div>
  </section>
</template>

<script setup lang="ts">
import TableCorrespondenceDashboard from "../../organisms/table-correspondence-dashboard/TableCorrespondenceDashboard.organism.vue";
import ColaborativeWork from "../../organisms/colaborative-work/ColaborativeWork.organism.vue";
import CalendarWidget from "../../organisms/calendar/CalendarWidget.organism.vue";
import Statistic from "../../organisms/statistic/Statistic.organism.vue";

defineProps(['dataDashboardTemplate'])

</script>

<style scoped src="./Dashboard.template.scss"></style>