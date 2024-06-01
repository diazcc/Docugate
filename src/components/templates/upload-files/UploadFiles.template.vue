<template>
    <section class="upload-files--wrapper"
        v-if="!dataUploadFiles.stateFormUniqueFile && !dataUploadFiles.stateFormManyFiles">
        <header>
            <h1>
                {{ $t('welcome_to_files_module') }}
            </h1>
        </header>
        <nav>
            <p>Por favor selecciona la accion que deseas realizar para subir archivo.</p>
            <div>

                <Button :dataButton="dataUploadFiles.dataButtonUploadFile" />
                <Button :dataButton="dataUploadFiles.dataButtonUploadManyFiles" />
            </div>
        </nav>
    </section>
    <article class="upload-files" v-if="dataUploadFiles.stateFormUniqueFile">
        <h1 class="upload-files__title">{{ $t('upload_files') }}</h1>
        <ul class="upload-files__content">
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectDependence" required />
            </li>
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectSerie" required />
            </li>
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectSubserie" required />
            </li>
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectDocumentaryType" required />
            </li>
        </ul>
        <nav class="upload-files__nav">
            <Button :dataButton="dataUploadFiles.dataButtonBack" />
            <Button :dataButton="dataUploadFiles.dataButtonNext" />
        </nav>
    </article>
    <article class="upload-files" v-if="dataUploadFiles.stateFormManyFiles">
        <h1 class="upload-files__title">{{ $t('upload_many_files') }}</h1>
        <ul class="upload-files__content">
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectDependence" required />
            </li>
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectSerie" required />
            </li>
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectSubserie" required />
            </li>
            <li class="upload-files__content__card">
                <Select :dataSelect="dataUploadFiles.dataSelectDocumentaryType" required />
            </li>
        </ul>
        <nav class="upload-files__nav">
            <Button :dataButton="dataUploadFiles.dataButtonBack" />

            <Button :dataButton="dataUploadFiles.dataButtonNext" />
        </nav>
    </article>
    <ModalAlert :dataModalAlert="dataUploadFiles.dataModalAlert" />
    <ModalConfirmation :dataModalConfirmation="dataUploadFiles.dataModalConfirmation" />
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue'
import Select from '../../atoms/select/Select.atom.vue'
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';

defineProps(['dataUploadFiles']);

</script>


<style scoped src="./UploadFiles.template.scss"></style>