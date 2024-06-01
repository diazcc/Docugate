<template lang="">
    <section class="table-dependence">
        <nav class="table-dependence__nav-options">
            <select v-model="selectedFilter" class="table-dependence__nav-options__select">
                <option value="" selected disabled>{{$t('quick_actions')}}</option>
                <option value="all">{{$t('all')}}</option>
                <option value="finaliced">{{$t('status_completed')}}</option>
                <option value="process">{{$t('status_in_process')}}</option>
                <option value="radicated">{{$t('status_filing')}}</option>
                <option value="Radicación anónimo">{{$t('anonymous_filing')}}</option> 
            </select>
            <InputSearch :dataInputSearch="dataTableDependence.dataInputSearch"/>
        </nav>
        <div class="flex-table" >
            <div class="flex-table__header">
                <div class="flex-table__header__cell">{{$t('code')}}</div>
                <div class="flex-table__header__cell">{{$t('name')}}</div>
                <div class="flex-table__header__cell">{{$t('parent_dependence')}}</div>
                <div class="flex-table__header__cell">{{$t('state')}}</div>
            </div>
            <div class="flex-table__row " v-if="dataTableDependence.data.length<1">
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
            </div>
            <div v-else class="flex-table__row" v-for="data in dataTableDependence.data" :key="data.id">
                <div class="flex-table__row__cell">{{ data?.code }}</div>
                <div class="flex-table__row__cell">{{ data?.name }}</div>
                <div class="flex-table__row__cell">{{ data?.parent_dependency ? data.parent_dependency.name : 'N/A' }}</div>
                <div class="flex-table__row__cell">{{ data?.state ? $t('active') : $t('inactive') }}</div>
            </div>

        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import InputSearch from "../../molecules/input-search/InputSearch.molecule.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["dataTableDependence"]);
const selectedFilter = ref("");


// Método para filtrar por estado
const filteredData = computed(() => {
  if (!selectedFilter.value || selectedFilter.value == "all") {
    return props.dataTableDependence.data;
  } else {
    return props.dataTableDependence.data.filter((item: any) => {
      if (selectedFilter.value === "finaliced") {
        return item.state === "finaliced";
      } else if (selectedFilter.value === "process") {
        return item.state === "process";
      } else if (selectedFilter.value === "radicated") {
        return item.state === "radicated";
      } else if (selectedFilter.value === "rdPerson") {
        return (
          item.remitter !== null &&
          item.remitter.person_type.label === "Radicacion persona"
        );
      } else if (selectedFilter.value === "Radicación anónimo") {
        return item.type_of_filing?.label === "Radicación anónimo";
      }
      return false; // Si no coincide con ninguna opción, no se filtra nada
    });
  }
});

</script>


<style scoped src="./TableDependence.organism.scss"></style>