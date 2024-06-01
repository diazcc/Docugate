<template>
    <article class="historical-files">
        <header class="historical-files__header">
            <h1>{{$t('historical_files')}}</h1>
            <Button :dataButton="dataHistoricalFiles.dataButtonNewFiles" />
        </header>
        <nav class="historical-files__nav">
            <select name="" id="" class="historical-files__filter">
                <option value="">hola</option>
                <option value="">hola</option>
                <option value="">hola</option>
            </select>
            <InputSearch :dataInputSearch="dataHistoricalFiles.dataInputSearch" />
        </nav>
        <section class="historical-files__table">
            <ul class="historical-files__table__column--header">
                <li class="historical-files__table__row--header">
                    Nombre
                </li>
                <li>
                    Fecha
                </li>
                <li>
                    Tipo documental
                </li>
                <li>
                    Tipo de radicacion
                </li>
            </ul>
            <ul class="historical-files__table__column historical-files__table__column--load loading-component"
                v-if="dataHistoricalFiles.data.length < 1">
                <li class="historical-files__table__row">

                </li>
                <li>

                </li>
                <li>

                </li>
                <li>

                </li>
            </ul>
            <ul class="historical-files__table__column" v-else v-for="data in dataHistoricalFiles.data" @click="dataHistoricalFiles.getFile(data)">
                <li class="historical-files__table__row">
                    {{ data.document_name }}
                </li>
                <li>
                    {{ data.date }}
                </li>
                <li>
                    {{ data.documentary_type.name_document_type }}

                </li>
                <li>
                    {{ data.documentary_type.type_of_filing.label }}

                </li>
            </ul>
        </section>
    </article>
    <ModalPdfViewer :dataModalPdfViewer="dataHistoricalFiles.dataModalPdfViewer"/>
    <ModalAlert :dataModalAlert="dataHistoricalFiles.dataModalAlert"/>
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';
import ModalPdfViewer from '../../molecules/modals/modal-pdf-viewer/ModalPdfViewer.molecule.vue';
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
defineProps(['dataHistoricalFiles']);
</script>

<style scoped src="./HistoricalFiles.template.scss"></style>
