<template lang="">
    <article class="correspondence-received" v-if="dataCorrespondenceSent.state==''">
        <nav class="correspondence-received__nav">
            <p class="correspondence-received__nav__title">
                {{$t('sents')}}
            </p>
            <Button :dataButton="dataCorrespondenceSent.dataButtonNewFile"/>
        </nav>
        <TableCorrespondenceReceived :dataTableCorrespondenceReceived="dataCorrespondenceSent.dataTableCorrespondenceReceived" @codeFiling = "showPdf" />
    </article>
    <article v-if="dataCorrespondenceSent.state=='viewNewFile'" class="correspondence-received-file">
        <nav class="correspondence-received-file__container-header">
            <h2 class="correspondence-received-file__container-header__title">Bienvenido al modulo de Radicacion</h2>
            <ol class="correspondence-received-file__container-header__content-process">
                <li :class="'correspondence-received-file__container-header__content-process__line correspondence-received-file__container-header__content-process__line--' + (dataCorrespondenceSent.stateViewFile =='step12' ? 'step12' :(dataCorrespondenceSent.stateViewFile =='step123' ? 'step123' :(dataCorrespondenceSent.stateViewFile =='step1234' ? 'step1234' : '')))">
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceSent.stateViewFile.includes('step1') ? 'focused' :'')">
                    1
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceSent.stateViewFile.includes('step12') ? 'focused' :'')">
                    2
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceSent.stateViewFile.includes('step123') ? 'focused' :'')">
                    3
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceSent.stateViewFile.includes('step1234') ? 'focused' :'')">
                    4
                </li>
            </ol>
        </nav>
        <section class="correspondence-received-file__container"> 
            <section v-if="dataCorrespondenceSent.stateViewFile=='step1'" class="correspondence-received-file__container__main">
                    <p>Por favor selecciona la accion que deseas realizar.</p>
                    <nav>
                        <Button :dataButton="dataCorrespondenceSent.dataButtonRedirectToSearchRemitter"/>
                        <Button :dataButton="dataCorrespondenceSent.dataButtonRedirectToCreateRemitter"/>
                        <Button :dataButton="dataCorrespondenceSent.dataButtonRedirectToCreateFileAnonimous"/>
    
                    </nav>
            </section>
            <TableSearchRemitter class="correspondence-received-file__container__search-remitter"  v-if="dataCorrespondenceSent.stateViewFile=='step12'" :dataTableRemitters="dataCorrespondenceSent.dataTableRemitters" @user="getUser"/>
            <CreateRemitterForm v-if="dataCorrespondenceSent.stateViewFile=='step123'" :dataCreateRemitterForm="dataCorrespondenceSent.dataCreateRemitterForm"/>
            <FilingFlow v-if="dataCorrespondenceSent.stateViewFile=='step1234'" :dataFilingFlow="dataCorrespondenceSent.dataFilingFlow" @fileFiling="getFile"  @emitDocSelected = "emitDocSelected"/>
        </section>
        <nav  class="correspondence-received-file__buttons-nav">
            <Button :dataButton="dataCorrespondenceSent.dataButtonGoToBack" :class="'correspondence-received-file__buttons-nav__button correspondence-received-file__buttons-nav__button--'+(dataCorrespondenceSent.stateViewFile!='step1' && dataCorrespondenceSent.stateViewFile!='step12' ? 'in-line': '')"/>
            <Button v-if="dataCorrespondenceSent.stateViewFile!='step1' && dataCorrespondenceSent.stateViewFile!='step12' && !dataCorrespondenceSent.dataFilingFlow.stateResponseFiling" :dataButton="dataCorrespondenceSent.dataButtonGoToNext"/>
        </nav>
    </article> 
    <ModalPdfViewer :dataModalPdfViewer="dataCorrespondenceSent.dataModalPdfViewer"  />
    <ModalConfirmation :dataModalConfirmation="dataCorrespondenceSent.dataModalConfirmation"/>
    <ModalAlert :dataModalAlert="dataCorrespondenceSent.dataModalAlert"/>
    <!-- <ModalAssignFiling :dataModalAssignFiling="dataCorrespondenceSent.dataModalAssignFiling" @dataEditor="dataEditor" @sendDataEditor="getSendDataEditor"/>
    <ModalResponseFiling :dataModalResponseFiling="dataCorrespondenceSent.dataModalResponseFiling"/> -->

</template>

<script setup lang="ts">


import TableCorrespondenceReceived from '../../organisms/table-correspondence-received/TableCorrespondenceReceived.organism.vue';
import CreateRemitterForm from '../../organisms/create-remitter-form/CreateRemitterForm.organism.vue';
import ModalPdfViewer from '../../molecules/modals/modal-pdf-viewer/ModalPdfViewer.molecule.vue';
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';
import Img from '../../atoms/img/Img.atom.vue';
import Button from '../../atoms/button/Button.atom.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';
import TableSearchRemitter from '../../organisms/table-search-remitter/TableSearchRemitter.organism.vue';
import FilingFlow from '../../organisms/filing-flow/FilingFlow.organism.vue';
import ModalAssignFiling from "../../molecules/modals/modal-assign-filing/ModalAssignFiling.molecule.vue";
import ModalResponseFiling from "../../molecules/modals/modal-response-filing/ModalResponseFiling.molecule.vue";

defineProps(['dataCorrespondenceSent']);
const emits = defineEmits(['codeFiling', 'user', 'fileFiling', 'emitDocs', 'emitDocSelected', 'dataEditor', 'sendDataEditor']);
function showPdf(codeFiling: any) {
    emits('codeFiling', codeFiling);
}
function getUser(user: any) {
    emits('user', user.id);
}

function getFile(file: any) {
    emits('fileFiling', file);
}

function emitDocSelected(file: any) {
    emits('emitDocSelected', file);
}

function dataEditor(file: any) {
    emits('dataEditor', file);
}

function getSendDataEditor(data: any) {
    emits('sendDataEditor', data)
}

</script>

<style scoped lang="scss" src="./CorrespondenceSent.template.scss"></style>
../../organisms/filing-flow/FilingFlow.organism.vue