<template lang="">
    <article class="dependence-received" v-if="dataDependence.state==''">
        <nav class="dependence-received__nav">
            <p class="dependence-received__nav__title">
                {{$t('dependence')}}
            </p>
            <Button :dataButton="dataDependence.dataButtonNewDependence"/>
        </nav>
        <TableDependence :dataTableDependence="dataDependence.dataTableDependence"/>
    </article>

    <article v-if="dataDependence.state=='viewNewFile'" class="dependence-received-file">
        <nav class="dependence-received-file__container-header">
            <h2 class="dependence-received-file__container-header__title">{{$t('welcome_to_the_dependence_module')}}</h2>
            <ol class="dependence-received-file__container-header__content-process">

                <li :class="'dependence-received-file__container-header__content-process__line dependence-received-file__container-header__content-process__line--' + (dataDependence.stateViewFile =='step12' ? 'step12' :(dataDependence.stateViewFile =='step123' ? 'step1234' :(dataDependence.stateViewFile =='step1234' ? 'step1234' : '')))">
                </li>

                <li :class="'dependence-received-file__container-header__content-process__pointer dependence-received-file__container-header__content-process__pointer--'+(dataDependence.stateViewFile.includes('step1') ? 'focused' :'')">
                    1
                </li>

                <li :class="'dependence-received-file__container-header__content-process__pointer dependence-received-file__container-header__content-process__pointer--'+(dataDependence.stateViewFile.includes('step12') ? 'focused' :'')">
                    2
                </li>
                <!-- <li :class="'dependence-received-file__container-header__content-process__pointer dependence-received-file__container-header__content-process__pointer--'+(dataDependence.stateViewFile.includes('step123') ? 'focused' :'')">
                    3
                </li>
                <li :class="'dependence-received-file__container-header__content-process__pointer dependence-received-file__container-header__content-process__pointer--'+(dataDependence.stateViewFile.includes('step1234') ? 'focused' :'')">
                    4
                </li> -->
            </ol>
        </nav>
        <section class="dependence-received-file__container">
            <section v-if="dataDependence.stateViewFile === 'step1'" class="dependence-received-file__container__main">
                <p>{{$t('please_select')}}</p>
                <nav>
                    <Button :dataButton="dataDependence.dataButtonRedirectToCreateDependence"/>
                </nav>
            </section>
            <CreateDependenceForm v-if="dataDependence.stateViewFile === 'step123'" :dataCreateDependenceForm="dataDependence.dataCreateDependenceForm" :dataDependence="dataDependence.dataTableDependence.data"  />
        </section>

        <nav class="dependence-received-file__buttons-nav">
            <Button :dataButton="dataDependence.dataButtonGoToBack" :class="'dependence-received-file__buttons-nav__button dependence-received-file__buttons-nav__button--'+(dataDependence.stateViewFile!='step1' && dataDependence.stateViewFile!='step12' ? 'in-line': '')"/>
            <Button v-if="dataDependence.stateViewFile!='step1' && dataDependence.stateViewFile!='step12' && !dataDependence.dataRadicationFlow.stateResponseFiling" :dataButton="dataDependence.dataButtonGoToNext"/>
        </nav>
    </article>
    <ModalConfirmation :dataModalConfirmation="dataDependence.dataModalConfirmation"/>
    <ModalAlert :dataModalAlert="dataDependence.dataModalAlert"/>
 
</template>

<script setup lang="ts">
import TableDependence from "../../organisms/table-dependence/TableDependence.organism.vue";
import CreateDependenceForm from "../../organisms/create-dependence-form/CreateDependenceForm.organism.vue";
import ModalAlert from "../../molecules/modals/alert/ModalAlert.molecule.vue";
import ModalConfirmation from "../../molecules/modals/confirmation/ModalConfirmation.molecule.vue";
import Button from "../../atoms/button/Button.atom.vue";

defineProps(["dataDependence"]);
const emits = defineEmits([]);

</script>

<style scoped lang="scss" src="./Dependences.template.scss"></style>