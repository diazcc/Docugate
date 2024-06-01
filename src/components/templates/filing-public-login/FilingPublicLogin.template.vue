<template>
    <main class="filing-public-login__wrapper">
        <header class="filing-public-login__wrapper__header">
            <img src="/docugate-black.png" alt="" class="filing-public-login__wrapper__header__img">
            <!-- <button @click="$i18n.locale == 'es' ? $i18n.locale = 'en' : $i18n.locale = 'es'"
                class="filing-public-login__wrapper__header__button">{{ $i18n.locale == 'es' ? $t('switch_es') :
                $t('switch_en') }}</button> -->
        </header>
        <article
            :class="'filing-public-login__wrapper__content filing-public-login__wrapper__content--' + (!dataFilingPublicLogin.stateForm ? 'register' : '')">
            <section class="filing-public-login__wrapper__content__header">
                <Title :dataTitle="dataFilingPublicLogin.dataTitle" />
                <Text :dataText="dataFilingPublicLogin.dataText" v-if="dataFilingPublicLogin.stateForm" />
            </section>
            <ul
                :class="'filing-public-login__wrapper__content__options filing-public-login__wrapper__content__options--' + (!dataFilingPublicLogin.stateForm ? 'register' : '')">
                <CardOptionLogin :dataCardOptionLogin="dataFilingPublicLogin.dataCardOptionLogin"
                    class="filing-public-login__wrapper__content__options__card" />
                <CardOptionLogin :dataCardOptionLogin="dataFilingPublicLogin.dataCardOptionRegister"
                    class="filing-public-login__wrapper__content__options__card" />
            </ul>
            <section
                :class="'filing-public-login__wrapper__content__form filing-public-login__wrapper__content__form--' + (!dataFilingPublicLogin.stateForm ? 'register' : '')">
                <span v-if="!dataFilingPublicLogin.stateForm">
                    <label>{{ $t('natural_person') }}
                        <input type="radio" name="option" id="" :value="false"
                            v-model="dataFilingPublicLogin.stateLegalPerson">
                    </label>
                    <label>{{ $t('legal_person') }}
                        <input type="radio" name="option" id="" :value="true"
                            v-model="dataFilingPublicLogin.stateLegalPerson">
                    </label>
                </span>
                <InputText :dataInput="dataFilingPublicLogin.dataInputId"
                    v-if="!dataFilingPublicLogin.stateForm && !dataFilingPublicLogin.stateLegalPerson" required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputName"
                    v-if="!dataFilingPublicLogin.stateForm && !dataFilingPublicLogin.stateLegalPerson" required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputBusinessName"
                    v-if="!dataFilingPublicLogin.stateForm && dataFilingPublicLogin.stateLegalPerson" required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputNit"
                    v-if="!dataFilingPublicLogin.stateForm && dataFilingPublicLogin.stateLegalPerson" required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputLastName"
                    v-if="!dataFilingPublicLogin.stateForm && !dataFilingPublicLogin.stateLegalPerson" required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputPhone" v-if="!dataFilingPublicLogin.stateForm"
                    required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputEmail" required />
                <InputText :dataInput="dataFilingPublicLogin.dataInputPassword" required />
                <Button :dataButton="dataFilingPublicLogin.dataButton" />
            </section>

            <p class="filing-public-login__wrapper__content__forgot" v-if="dataFilingPublicLogin.stateForm">
                {{ $t('have_you_forgotten_your_password') }}
            </p>
            <p class="filing-public-login__wrapper__content__forgot">
                {{ $t('continue_without_user') }}
            </p>
        </article>
        <ModalAlert :dataModalAlert="dataFilingPublicLogin.dataModalAlert" />
    </main>
</template>
<script setup lang="ts">
import CardOptionLogin from '../../molecules/card-option-login/CardOptionLogin.molecule.vue'
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import FormLogin from '../../organisms/form-login/FormLogin.organism.vue';
import Title from '../../atoms/title/Title.atom.vue';
import Text from '../../atoms/text/Text.atom.vue';
import OptionsLogin from '../../organisms/options-login/OptionsLogin.organism.vue';
import CardLoginNormal from '../../organisms/card-login-normal/CardLoginNormal.organism.vue';
import { defineProps } from 'vue';
import InputText from '../../atoms/input/InputText.atom.vue';
import Button from '../../atoms/button/Button.atom.vue';
defineProps(['dataFilingPublicLogin']);//Use defineProps for can get data in another component.


</script>
<style scoped src="./FilingPublicLogin.template.scss"></style>