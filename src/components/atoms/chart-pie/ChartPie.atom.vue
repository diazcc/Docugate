<!-- 
  TODO
  This component must be improved

docu: https://vue-chart-3.netlify.app/
uninstall with : npm uninstall vue-chart-3


-->

<template>
  <PieChart ref="doughnutRef" :chartData="testData" :options="options" :height="180" :width="250" />
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useI18n } from 'vue-i18n';

Chart.register(...registerables);

const { t } = useI18n();
const dataPie = ref([60, 30]);
const doughnutRef = ref();

const options = reactive({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Doughnut Chart",
    // },
  },
});

const testData = computed(() => ({
  labels: [t("completed"), t("unfinished")],
  datasets: [
    {
      data: dataPie.value,
      backgroundColor: ["#006cd8", "#dbdbdb", "#fafafa"],
    },
  ],
}));
</script>

<style scoped src="./ChartPie.atom.scss"></style>