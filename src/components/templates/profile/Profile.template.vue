<template lang="">
    <article class="profile" v-if="dataProfile.state==''">
        <nav class="profile__nav">
            <p class="profile__nav__title">
                {{$t('profile')}}
            </p>
            <Button :dataButton="dataProfile.dataButtonNewProfile"/>
        </nav>
        <TableProfile :dataTableProfile="dataProfile.dataTableProfile"/>
    </article>

    <article v-if="dataProfile.state=='viewNewFile'" class="profile-file">
        <nav class="profile-file__container-header">
            <h2 class="profile-file__container-header__title">{{$t('welcome_to_the_profile_module')}}</h2>
            <ol class="profile-file__container-header__content-process">

                <li :class="'profile-file__container-header__content-process__line profile-file__container-header__content-process__line--' + (dataProfile.stateViewFile =='step12' ? 'step12' :(dataProfile.stateViewFile =='step123' ? 'step1234' :(dataProfile.stateViewFile =='step1234' ? 'step1234' : '')))">
                </li>

                <li :class="'profile-file__container-header__content-process__pointer profile-file__container-header__content-process__pointer--'+(dataProfile.stateViewFile.includes('step1') ? 'focused' :'')">
                    1
                </li>

                <li :class="'profile-file__container-header__content-process__pointer profile-file__container-header__content-process__pointer--'+(dataProfile.stateViewFile.includes('step12') ? 'focused' :'')">
                    2
                </li>
                <!-- <li :class="'profile-file__container-header__content-process__pointer profile-file__container-header__content-process__pointer--'+(dataProfile.stateViewFile.includes('step123') ? 'focused' :'')">
                    3
                </li>
                <li :class="'profile-file__container-header__content-process__pointer profile-file__container-header__content-process__pointer--'+(dataProfile.stateViewFile.includes('step1234') ? 'focused' :'')">
                    4
                </li> -->
            </ol>
        </nav>
        <section class="profile-file__container">
            <section v-if="dataProfile.stateViewFile === 'step1'" class="profile-file__container__main">
                <p>{{$t('please_select')}}</p>
                <nav>
                    <Button :dataButton="dataProfile.dataButtonRedirectToCreateProfile"/>
                </nav>
            </section>
            <CreateProfileForm v-if="dataProfile.stateViewFile === 'step123'" :dataCreateProfileForm="dataProfile.dataCreateProfileForm"   :dataUsers="dataProfile.dataUsers.data" />
        </section>

        <nav class="profile-file__buttons-nav">
            <Button :dataButton="dataProfile.dataButtonGoToBack" :class="'profile-file__buttons-nav__button profile-file__buttons-nav__button--'+(dataProfile.stateViewFile!='step1' && dataProfile.stateViewFile!='step12' ? 'in-line': '')"/>
            <Button v-if="dataProfile.stateViewFile!='step1' && dataProfile.stateViewFile!='step12' && !dataProfile.dataRadicationFlow.stateResponseFiling" :dataButton="dataProfile.dataButtonGoToNext"/>
        </nav>
    </article>
    <ModalConfirmation :dataModalConfirmation="dataProfile.dataModalConfirmation"/>
    <ModalAlert :dataModalAlert="dataProfile.dataModalAlert"/>
 
</template>

<script setup lang="ts">
import TableProfile from "../../organisms/table-profile/TableProfile.organism.vue";
import CreateProfileForm from "../../organisms/create-profile-form/CreateProfileForm.organism.vue";
import ModalAlert from "../../molecules/modals/alert/ModalAlert.molecule.vue";
import ModalConfirmation from "../../molecules/modals/confirmation/ModalConfirmation.molecule.vue";
import Button from "../../atoms/button/Button.atom.vue";

defineProps(["dataProfile"]);
const emits = defineEmits([]);

</script>

<style scoped lang="scss" src="./Profile.template.scss"></style>