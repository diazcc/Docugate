<template>
    <article class="files">
        <header class="files__header">
            <h1>{{$t('files')}}</h1>
            <Button :dataButton="dataFiles.dataButtonNewFiles" />
        </header>
        <nav class="files__nav">
            <select name="" id="" class="files__filter">
                <option value="">hola</option>
                <option value="">hola</option>
                <option value="">hola</option>
            </select>
            <InputSearch :dataInputSearch="dataFiles.dataInputSearch" />
        </nav>
        <section class="files__table">
            <ul class="files__table__column--header">
                <li class="files__table__row--header">
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
            <ul class="files__table__column files__table__column--load loading-component"
                v-if="dataFiles.data.length < 1">
                <li class="files__table__row">

                </li>
                <li>

                </li>
                <li>

                </li>
                <li>

                </li>
            </ul>
            <ul class="files__table__column" v-else v-for="data in dataFiles.data" @click="dataFiles.getFile(data)">
                <li class="files__table__row">
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
    <ModalPdfViewer :dataModalPdfViewer="dataFiles.dataModalPdfViewer"/>
    <ModalAlert :dataModalAlert="dataFiles.dataModalAlert"/>
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';
import ModalPdfViewer from '../../molecules/modals/modal-pdf-viewer/ModalPdfViewer.molecule.vue';
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
defineProps(['dataFiles']);

</script>
<style scoped src="./Files.template.scss"></style>
