<template lang="">
    <article class="user-received" v-if="dataUser.state==''">
        <nav class="user-received__nav">
            <p class="user-received__nav__title">
                {{$t('user')}}
            </p>
            <Button :dataButton="dataUser.dataButtonNewUser"/>
        </nav>
        <TableUser :dataTableUser="dataUser.dataTableUser"/>
    </article>

    <article v-if="dataUser.state=='viewNewFile'" class="user-received-file">
        <nav class="user-received-file__container-header">
            <h2 class="user-received-file__container-header__title">{{$t('welcome_to_the_user_module')}}</h2>
            <ol class="user-received-file__container-header__content-process">

                <li :class="'user-received-file__container-header__content-process__line user-received-file__container-header__content-process__line--' + (dataUser.stateViewFile =='step12' ? 'step12' :(dataUser.stateViewFile =='step123' ? 'step1234' :(dataUser.stateViewFile =='step1234' ? 'step1234' : '')))">
                </li>

                <li :class="'user-received-file__container-header__content-process__pointer user-received-file__container-header__content-process__pointer--'+(dataUser.stateViewFile.includes('step1') ? 'focused' :'')">
                    1
                </li>

                <li :class="'user-received-file__container-header__content-process__pointer user-received-file__container-header__content-process__pointer--'+(dataUser.stateViewFile.includes('step12') ? 'focused' :'')">
                    2
                </li>
                <!-- <li :class="'user-received-file__container-header__content-process__pointer user-received-file__container-header__content-process__pointer--'+(dataUser.stateViewFile.includes('step123') ? 'focused' :'')">
                    3
                </li>
                <li :class="'user-received-file__container-header__content-process__pointer user-received-file__container-header__content-process__pointer--'+(dataUser.stateViewFile.includes('step1234') ? 'focused' :'')">
                    4
                </li> -->
            </ol>
        </nav>
        <section class="user-received-file__container">
            <section v-if="dataUser.stateViewFile === 'step1'" class="user-received-file__container__main">
                <p>{{$t('please_select')}}</p>
                <nav>
                    <Button :dataButton="dataUser.dataButtonRedirectToCreateUser"/>
                </nav>
            </section>
            <CreateUserForm v-if="dataUser.stateViewFile === 'step123'" :dataCreateUserForm="dataUser.dataCreateUserForm" :dataDependences="dataUser.dataDependences.data" :dataRoles="dataUser.dataRoles.data"  />
        </section>

        <nav class="user-received-file__buttons-nav">
            <Button :dataButton="dataUser.dataButtonGoToBack" :class="'user-received-file__buttons-nav__button user-received-file__buttons-nav__button--'+(dataUser.stateViewFile!='step1' && dataUser.stateViewFile!='step12' ? 'in-line': '')"/>
            <Button v-if="dataUser.stateViewFile!='step1' && dataUser.stateViewFile!='step12' && !dataUser.dataRadicationFlow.stateResponseFiling" :dataButton="dataUser.dataButtonGoToNext"/>
        </nav>
    </article>
    <ModalConfirmation :dataModalConfirmation="dataUser.dataModalConfirmation"/>
    <ModalAlert :dataModalAlert="dataUser.dataModalAlert"/>
 
</template>

<script setup lang="ts">
import TableUser from "../../organisms/table-user/TableUser.organism.vue";
import CreateUserForm from "../../organisms/create-user-form/CreateUserForm.organism.vue";
import ModalAlert from "../../molecules/modals/alert/ModalAlert.molecule.vue";
import ModalConfirmation from "../../molecules/modals/confirmation/ModalConfirmation.molecule.vue";
import Button from "../../atoms/button/Button.atom.vue";

defineProps(["dataUser"]);
const emits = defineEmits([]);

</script>

<style scoped lang="scss" src="./User.template.scss"></style>