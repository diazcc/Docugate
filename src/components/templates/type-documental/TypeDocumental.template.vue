<template>
    <article class="documentary-type" v-if="!dataDocumentaryType.stateFormCreate">
        <h1>Tipo de documental</h1>
        <Button :dataButton="dataDocumentaryType.dataButtonNewDocumentaryTypes" />
        <nav class="documentary-type__nav">
            <select name="" id="" class="documentary-type__filter">
                <option value="">hola</option>
                <option value="">hola</option>
                <option value="">hola</option>
            </select>
            <InputSearch :dataInputSearch="dataDocumentaryType.dataInputSearch" />
        </nav>
        <section class="documentary-type__table">
            <ul class="documentary-type__table__column--header">
                <li class="documentary-type__table__row--header">
                    Nombre
                </li>
                <li>
                    Codigo
                </li>
                <li>
                    Tipo de radicacion
                </li>
                <li>
                    Tiempo
                </li>
            </ul>
            <ul class="documentary-type__table__column" v-for="data in dataDocumentaryType.data">
                <li class="documentary-type__table__row">
                    {{ data.name_document_type || 'null' }}
                </li>
                <li>
                    {{ data.type_processing_time || 'null' }}
                </li>
                <li>
                    {{ data.type_of_filing.label || 'null' }}
                </li>
                <li>
                    {{ data.processing_time || 'null' }}

                </li>
            </ul>
        </section>
    </article>
    <article class="documentary-type--form" v-else>
        <h1 class="documentary-type--form__title">Crear tipo de documental</h1>
        <ul class="documentary-type--form__content">
            <li class="documentary-type--form__content__card">
                <input type="text" placeholder="Nombre de documento" required
                    v-model="dataDocumentaryType.dataForm.name_document_type">
            </li>
            <li class="documentary-type--form__content__card">
                <input type="number" placeholder="Tiempo del proceso" min="0" required
                    v-model="dataDocumentaryType.dataForm.processing_time">
            </li>
            <li class="documentary-type--form__content__card">
                <select name="" id="" required v-model="dataDocumentaryType.dataForm.type_processing_time">
                    <option value="" selected disabled>Seleccionar tipo de tiempo...</option>
                    <option value="001">Días hábiles</option>
                    <option value="002">Días del calendario</option>
                    <option value="003">Horas hábiles</option>
                </select>
            </li>
            <li class="documentary-type--form__content__card">

                <select name="" id="" required v-model="dataDocumentaryType.dataForm.type_of_filing">
                    <option value="" selected disabled>Seleccionar tipo de radicado...</option>
                    <option value="001">Entrada</option>
                    <option value="002">Salida</option>
                </select>
            </li>

        </ul>
        <nav class="documentary-type--form__nav">
            <Button :dataButton="dataDocumentaryType.dataButtonBack" />
            <Button :dataButton="dataDocumentaryType.dataButtonNext" />
        </nav>
    </article>
    <ModalAlert :dataModalAlert="dataDocumentaryType.dataModalAlert" />
    <ModalConfirmation :dataModalConfirmation="dataDocumentaryType.dataModalConfirmation" />
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue'
import Select from '../../atoms/select/Select.atom.vue'
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';

defineProps(['dataDocumentaryType']);

</script>
<style scoped src="./TypeDocumental.template.scss"></style>
