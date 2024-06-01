<template lang="">

    <section class="table-correspondence-received">
        <nav class="table-correspondence-received__nav-options">
            <select v-model="selectedFilter" class="table-correspondence-received__nav-options__select">
                <option value="" selected disabled>{{$t('quick_actions')}}</option>
                <option value="all">{{$t('all')}}</option>
                <option value="finaliced">{{$t('status_completed')}}</option>
                <option value="process">{{$t('status_in_process')}}</option>
                <option value="filing">{{$t('status_filing')}}</option>
                <option value="Radicación anónimo">{{$t('anonymous_filing')}}</option> 
            </select>
            <InputSearch :dataInputSearch="dataTableCorrespondenceReceived.dataInputSearch"/>
        </nav>
        <div class="flex-table" @scroll="handleScroll">
            <div class="flex-table__header">
                <div class="flex-table__header__cell">{{$t('subject')}}</div>
                <div class="flex-table__header__cell">{{$t('filing_number')}}</div>
                <div class="flex-table__header__cell">{{$t('remitter')}}</div>
                <div class="flex-table__header__cell">{{$t('type_of_person')}}</div>
                <div class="flex-table__header__cell">{{$t('email')}}</div>
                <div class="flex-table__header__cell">{{$t('date_of_filing')}}</div>
                <div class="flex-table__header__cell">{{$t('state')}}</div>
                <div class="flex-table__header__cell">{{$t('actions')}}</div>
            </div>
            <div class="flex-table__row " v-if="dataTableCorrespondenceReceived.data.length<1">
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
                <div class="flex-table__row__cell loading-component"></div>
            </div>
            <div v-else class="flex-table__row" v-for="(data, index) in searchedData" :key="index" @click="validateMenuOpen(data)">
                <div class="flex-table__row__cell">{{ data?.filings[0].subject }}</div>
                <div class="flex-table__row__cell"><span>{{ data?.filings[data?.filings.length - 1].filing_code }}</span></div>
                <div class="flex-table__row__cell flex-table__row__cell--document">
                    {{ data.remitter!=null ? (data.remitter.contact_name!=null?data.remitter.contact_name:data.remitter.first_name + ' ' + (data?.remitter.middle_name??'') + ' ' + data?.remitter.second_last_name) : $t('anonymous_person')  }}
                </div>
                <div class="flex-table__row__cell">{{ $t((data.remitter!=null? data.remitter.person_type.label : 'N/A')) }}</div>
                <div class="flex-table__row__cell">{{ data?.email || 'No especifico' }}</div>
                <div class="flex-table__row__cell"><span v-for="filing in data?.filings">{{ filing?.filing_date }}</span></div>
                <div class="flex-table__row__cell">{{ $t(data?.status.label || 'null') }}</div>
                <div class="flex-table__row__cell">
                    <button :class="['flex-table__row__cell__button', {'flex-table__row__cell__button--focused': data.isMenuOpen}]" @click="toggleMenu(data, $event, index)">


                        <img src="/icon-arrow-item-menu-padre-white.svg">
                        
                    </button>
                    <ul v-if="data.isMenuOpen" class="flex-table__row__cell__menu" :id="'flex-table__row__cell__menu-'+index">
                        <li @click=" dataTableCorrespondenceReceived.optionsMenu.moveFiling">{{$t('move')}}</li>
                        <li @click=" dataTableCorrespondenceReceived.optionsMenu.assignFiling(data.id)">{{$t('assign')}}</li>
                        <li @click=" dataTableCorrespondenceReceived.optionsMenu.responseFiling(data)">{{$t('reply')}}</li>
                    </ul>
                </div>
            </div>

        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import IconVerSvg from "../../../assets/svg/icon-ver.svg.vue";
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps(['dataTableCorrespondenceReceived']);
const emits = defineEmits(['codeFiling']);//Emit the event when all pages are rendered.
const selectedFilter = ref('');
const filter = ref("");
const search = ref("");
onMounted(() => {
    document.addEventListener("click", outSideArea);
});

onUnmounted(() => {
    document.removeEventListener("click", outSideArea);
});

const handleScroll = () => {
    props.dataTableCorrespondenceReceived.data.forEach((data: any) => {
        data.isMenuOpen = false;
    })
};
const outSideArea = (event: any) => {
    if (!event.target.closest('.flex-table__row__cell__menu')) {
        closeMenus();
    }
};

const toggleMenu = (item: any, event: any, index: any) => {
    if (props.dataTableCorrespondenceReceived.data.some((data: any) => data.isMenuOpen)) {
        props.dataTableCorrespondenceReceived.data.forEach((data: any) => {
            data.isMenuOpen = false;
        })
    }

    item.isMenuOpen = !item.isMenuOpen
    emits("codeFiling", item.filings[0].filing_code);
    event.stopPropagation(); // Evitar que el clic se propague al documento y cierre el menú
    nextTick(() => {
        checkMenuOverflow(index);
    });
};

const closeMenus = () => {
    for (const data of props.dataTableCorrespondenceReceived.data) {
        data.isMenuOpen = false;
    }
};

const checkMenuOverflow = (index: any) => {
    const elementMenu: any = document.getElementById(`flex-table__row__cell__menu-${index}`);
    const flexTable: any = document.querySelector('.flex-table');

    if (elementMenu && flexTable) {
        const menuRect = elementMenu.getBoundingClientRect();
        const flexTableRect = flexTable.getBoundingClientRect();

        // Verifica si el menú se desborda verticalmente
        if (menuRect.bottom > flexTableRect.bottom) {
            // Calcula la cantidad de desbordamiento
            const overflowAmount = menuRect.bottom - flexTableRect.bottom;
            console.log(`El menú se desborda ${overflowAmount}px del área visible del flex-table.`);

            // Ajusta la posición del menú restando la cantidad de desbordamiento de la propiedad top
            elementMenu.style.top = `calc(0% - ${overflowAmount + 10}px)`;
        }
    }
};


// Método para filtrar por estado
const filteredData = computed(() => {
    if (!selectedFilter.value || selectedFilter.value == 'all') {
        return props.dataTableCorrespondenceReceived.data;
    } else {
        return props.dataTableCorrespondenceReceived.data.filter((item: any) => {
            if (selectedFilter.value === 'finaliced') {
                return item.state === 'finaliced';
            } else if (selectedFilter.value === 'process') {
                return item.state === 'process';
            } else if (selectedFilter.value === 'filing') {
                return item.state === 'filing';
            } else if (selectedFilter.value === 'rdPerson') {
                return item.remitter !== null && item.remitter.person_type.label === 'Radicacion persona';
            } else if (selectedFilter.value === 'Radicación anónimo') {
                return item.type_of_filing?.label === 'Radicación anónimo';
            }
            return false; // Si no coincide con ninguna opción, no se filtra nada
        });
    }
});

// Método para buscar por término
const searchedData = computed(() => {
    if (!props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model) {
        return filteredData.value;
    } else {
        return filteredData.value.filter((item: any) =>
            item.subject.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase()) ||
            item.filing_code.includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase()) ||
            (item.remitter && item.remitter.contact_name && item.remitter.contact_name.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase())) ||
            (item.remitter && item.remitter.first_name && item.remitter.first_name.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase())) ||
            (item.remitter && item.remitter.second_last_name && item.remitter.second_last_name.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase())) ||
            (item.remitter && item.remitter.middle_name && item.remitter.middle_name.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase())) ||
            (item.email && item.email.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase())) ||
            item.filing_date.includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase()) ||
            (item.document && item.document.name.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase())) ||
            (item.state && item.state.toLowerCase().includes(props.dataTableCorrespondenceReceived.dataInputSearch.dataInput.model.toLowerCase()))
        );
    }
});
function validateMenuOpen(data: any) {
    if (!data.isMenuOpen) {
        router.push('/home/filing/' + data.id);
    }
}
</script>
<style scoped src="./TableCorrespondenceReceived.organism.scss"></style>