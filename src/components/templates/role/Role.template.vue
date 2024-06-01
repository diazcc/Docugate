<template lang="">
    <article class="role" v-if="dataRole.state==''">
        <nav class="role__nav">
            <p class="role__nav__title">
                {{$t('role')}}
            </p>
            <Button :dataButton="dataRole.dataButtonNewRole"/>
        </nav>
        <TableRole :dataTableRole="dataRole.dataTableRole"/>
    </article>

    <article v-if="dataRole.state=='viewNewFile'" class="role-file">
        <nav class="role-file__container-header">
            <h2 class="role-file__container-header__title">{{$t('welcome_to_the_role_module')}}</h2>
            <ol class="role-file__container-header__content-process">

                <li :class="'role-file__container-header__content-process__line role-file__container-header__content-process__line--' + (dataRole.stateViewFile =='step12' ? 'step12' :(dataRole.stateViewFile =='step123' ? 'step1234' :(dataRole.stateViewFile =='step1234' ? 'step1234' : '')))">
                </li>

                <li :class="'role-file__container-header__content-process__pointer role-file__container-header__content-process__pointer--'+(dataRole.stateViewFile.includes('step1') ? 'focused' :'')">
                    1
                </li>

                <li :class="'role-file__container-header__content-process__pointer role-file__container-header__content-process__pointer--'+(dataRole.stateViewFile.includes('step12') ? 'focused' :'')">
                    2
                </li>
                <!-- <li :class="'role-file__container-header__content-process__pointer role-file__container-header__content-process__pointer--'+(dataRole.stateViewFile.includes('step123') ? 'focused' :'')">
                    3
                </li>
                <li :class="'role-file__container-header__content-process__pointer role-file__container-header__content-process__pointer--'+(dataRole.stateViewFile.includes('step1234') ? 'focused' :'')">
                    4
                </li> -->
            </ol>
        </nav>
        <section class="role-file__container">
            <section v-if="dataRole.stateViewFile === 'step1'" class="role-file__container__main">
                <p>{{$t('please_select')}}</p>
                <nav>
                    <Button :dataButton="dataRole.dataButtonRedirectToCreateRole"/>
                </nav>
            </section>
            <CreateRoleForm v-if="dataRole.stateViewFile === 'step123'" :dataCreateRoleForm="dataRole.dataCreateRoleForm"/>
        </section>

        <nav class="role-file__buttons-nav">
            <Button :dataButton="dataRole.dataButtonGoToBack" :class="'role-file__buttons-nav__button role-file__buttons-nav__button--'+(dataRole.stateViewFile!='step1' && dataRole.stateViewFile!='step12' ? 'in-line': '')"/>
            <Button v-if="dataRole.stateViewFile!='step1' && dataRole.stateViewFile!='step12' && !dataRole.dataRadicationFlow.stateResponseFiling" :dataButton="dataRole.dataButtonGoToNext"/>
        </nav>
    </article>
    <ModalConfirmation :dataModalConfirmation="dataRole.dataModalConfirmation"/>
    <ModalAlert :dataModalAlert="dataRole.dataModalAlert"/>
 
</template>

<script setup lang="ts">
import TableRole from "../../organisms/table-role/TableRole.organism.vue";
import CreateRoleForm from "../../organisms/create-role-form/CreateRoleForm.organism.vue";
import ModalAlert from "../../molecules/modals/alert/ModalAlert.molecule.vue";
import ModalConfirmation from "../../molecules/modals/confirmation/ModalConfirmation.molecule.vue";
import Button from "../../atoms/button/Button.atom.vue";

defineProps(["dataRole"]);
const emits = defineEmits([]);

</script>

<style scoped lang="scss" src="./Role.template.scss"></style>