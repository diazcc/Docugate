<template lang="">
    <article class="correspondence-received" v-if="dataCorrespondenceReceived.state==''">
        <nav class="correspondence-received__nav">
            <p class="correspondence-received__nav__title">
                {{$t('receiveds')}}
            </p>
            <Button :dataButton="dataCorrespondenceReceived.dataButtonNewFile"/>
        </nav>
        <TableCorrespondenceReceived :dataTableCorrespondenceReceived="dataCorrespondenceReceived.dataTableCorrespondenceReceived" @codeFiling = "showPdf" />
    </article>
    <article v-if="dataCorrespondenceReceived.state" class="correspondence-received-file">
        <nav class="correspondence-received-file__container-header">
            <h2 class="correspondence-received-file__container-header__title">{{$t('welcome_to_the_radicacion_module')}}</h2>
            <ol class="correspondence-received-file__container-header__content-process">
                <li :class="'correspondence-received-file__container-header__content-process__line correspondence-received-file__container-header__content-process__line--' + (dataCorrespondenceReceived.stateViewFile =='step12' ? 'step12' :(dataCorrespondenceReceived.stateViewFile =='step123' ? 'step123' :(dataCorrespondenceReceived.stateViewFile =='step1234' ? 'step1234' : '')))">
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceReceived.stateViewFile.includes('step1') ? 'focused' :'')">
                    1
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceReceived.stateViewFile.includes('step12') ? 'focused' :'')">
                    2
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceReceived.stateViewFile.includes('step123') ? 'focused' :'')">
                    3
                </li>
                <li :class="'correspondence-received-file__container-header__content-process__pointer correspondence-received-file__container-header__content-process__pointer--'+(dataCorrespondenceReceived.stateViewFile.includes('step1234') ? 'focused' :'')">
                    4
                </li>
            </ol>
        </nav>
        <section class="correspondence-received-file__container"> 
            <section v-if="dataCorrespondenceReceived.stateViewFile=='step1'" class="correspondence-received-file__container__main">
                    <p>Por favor selecciona la accion que deseas realizar.</p>
                    <nav>
                        <Button :dataButton="dataCorrespondenceReceived.dataButtonRedirectToSearchRemitter"/>
                        <Button :dataButton="dataCorrespondenceReceived.dataButtonRedirectToCreateRemitter"/>
                        <Button :dataButton="dataCorrespondenceReceived.dataButtonRedirectToCreateFileAnonimous"/>
    
                    </nav>
            </section>
            <TableSearchRemitter class="correspondence-received-file__container__search-remitter"  v-if="dataCorrespondenceReceived.stateViewFile=='step12'" :dataTableRemitters="dataCorrespondenceReceived.dataTableRemitters" @user="getUser"/>
            <CreateRemitterForm v-if="dataCorrespondenceReceived.stateViewFile=='step123'" :dataCreateRemitterForm="dataCorrespondenceReceived.dataCreateRemitterForm"/>
            <FilingFlow v-if="dataCorrespondenceReceived.stateViewFile=='step1234'" :dataFilingFlow="dataCorrespondenceReceived.dataFilingFlow" @fileFiling="getFile" @emitDocSelected = "emitDocSelected"/>
        </section>
        <nav  class="correspondence-received-file__buttons-nav">
            <Button :dataButton="dataCorrespondenceReceived.dataButtonGoToBack" :class="'correspondence-received-file__buttons-nav__button correspondence-received-file__buttons-nav__button--'+(dataCorrespondenceReceived.stateViewFile!='step1' && dataCorrespondenceReceived.stateViewFile!='step12' ? 'in-line': '')"/>
            <Button v-if="dataCorrespondenceReceived.stateViewFile!='step1' && dataCorrespondenceReceived.stateViewFile!='step12' || dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling " :dataButton="dataCorrespondenceReceived.dataButtonGoToNext"/>
        </nav>
    </article> 
    <ModalPdfViewer :dataModalPdfViewer="dataCorrespondenceReceived.dataModalPdfViewer"  />
    <ModalConfirmation :dataModalConfirmation="dataCorrespondenceReceived.dataModalConfirmation"/>
    <ModalAlert :dataModalAlert="dataCorrespondenceReceived.dataModalAlert"/>
    <ModalAssignFiling :dataModalAssignFiling="dataCorrespondenceReceived.dataModalAssignFiling"  @sendDataEditorModalAssignFiling="sendDataEditorModalAssignFiling" />
    <ModalResponseFiling :dataModalResponseFiling="dataCorrespondenceReceived.dataModalResponseFiling"/>
    <ModalResponseEditor :dataModalResponseEditor="dataCorrespondenceReceived.dataModalResponseEditor" @sendDataEditorModalResponseEditor="sendDataEditorModalResponseEditor"/>
    
    
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
import ModalResponseEditor from "../../molecules/modals/modal-response-editor/ModalResponseEditor.molecule.vue";

defineProps(['dataCorrespondenceReceived']);
const emits = defineEmits(['codeFiling', 'user', 'fileFiling', 'emitDocs', 'emitDocSelected', 'dataEditor', 'sendDataEditorModalAssignFiling', 'sendDataEditorModalResponseEditor']);
function showPdf(codeFiling: any) {
  emits("codeFiling", codeFiling);
}
function getUser(user: any) {
  emits("user", user.id);
}

function getFile(file: any) {
    emits('fileFiling', file);
}

function emitDocSelected(file: any) {
  emits("emitDocSelected", file);
}

function sendDataEditorModalAssignFiling(data: any) {
    emits('sendDataEditorModalAssignFiling', data)
}

function sendDataEditorModalResponseEditor(data: any) {
  emits("sendDataEditorModalResponseEditor", data);
}


</script>

<style scoped lang="scss" src="./CorrespondenceReceived.template.scss"></style>