<template>
        <article class="central-files">
                <header class="central-files__header">
                        <h1>{{ $t('central_files') }}</h1>
                        <Button :dataButton="dataCentralFiles.dataButtonNewFiles" />
                </header>
                <nav class="central-files__nav">
                        <select name="" id="" class="central-files__filter">
                                <option value="">hola</option>
                                <option value="">hola</option>
                                <option value="">hola</option>
                        </select>
                        <InputSearch :dataInputSearch="dataCentralFiles.dataInputSearch" />
                </nav>
                <section class="central-files__table">
                        <ul class="central-files__table__column--header">
                                <li class="central-files__table__row--header">
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
                        <ul class="central-files__table__column central-files__table__column--load loading-component"
                                v-if="dataCentralFiles.data.length < 1">
                                <li class="central-files__table__row">

                                </li>
                                <li>

                                </li>
                                <li>

                                </li>
                                <li>

                                </li>
                        </ul>
                        <ul class="central-files__table__column" v-else v-for="data in dataCentralFiles.data"
                                @click="dataCentralFiles.getFile(data)">
                                <li class="central-files__table__row">
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
        <ModalPdfViewer :dataModalPdfViewer="dataCentralFiles.dataModalPdfViewer" />
        <ModalAlert :dataModalAlert="dataCentralFiles.dataModalAlert" />
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';
import ModalPdfViewer from '../../molecules/modals/modal-pdf-viewer/ModalPdfViewer.molecule.vue';
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
defineProps(['dataCentralFiles']);
</script>


<style scoped src="./CentralFiles.template.scss"></style>
