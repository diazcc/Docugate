<template lang="">
    <section class="table-role">
        <nav class="table-role__nav-options">
            <select v-model="selectedFilter" class="table-role__nav-options__select">
                <option value="" selected disabled>{{$t('quick_actions')}}</option>
                <option value="all">{{$t('all')}}</option>
                <option value="finaliced">{{$t('status_completed')}}</option>
                <option value="process">{{$t('status_in_process')}}</option>
                <option value="radicated">{{$t('status_filing')}}</option>
                <option value="Radicación anónimo">{{$t('anonymous_filing')}}</option> 
            </select>
            <InputSearch :dataInputSearch="dataTableRole.dataInputSearch"/>
        </nav>
        <div class="flex-table" >
            <div class="flex-table__header">
                <div class="flex-table__header__cell">{{$t('name')}}</div>
               
            </div>
            <div class="flex-table__row " v-if="dataTableRole.data.length<1">
              <div class="flex-table__row__cell loading-component"></div>

            </div>

            <div v-else class="flex-table__row" v-for="data in dataTableRole.data" :key="data.id">
                <div class="flex-table__row__cell">{{ data?.name }}</div>
                </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import InputSearch from "../../molecules/input-search/InputSearch.molecule.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["dataTableRole"]);
const selectedFilter = ref("");


// Método para filtrar por estado
const filteredData = computed(() => {
  if (!selectedFilter.value || selectedFilter.value == "all") {
    return props.dataTableRole.data;
  } else {
    return props.dataTableRole.data.filter((item: any) => {
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


<style scoped src="./TableRole.organism.scss"></style>