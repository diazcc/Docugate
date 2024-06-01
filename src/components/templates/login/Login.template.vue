<!-- COMPONENT LOGIN -->
<template>
    <main class="login__wrapper">
        <header class="login__wrapper__header">
            <img src="/docugate-black.png" alt="" class="login__wrapper__header__img">
            <button @click="$i18n.locale == 'es' ? $i18n.locale = 'en' : $i18n.locale = 'es'"
            class="login__wrapper__header__button">{{ $i18n.locale == 'es' ? $t('switch_es') : $t('switch_en') }}</button>
        </header>

        <!-- <FormLogin :dataFormLogin="dataFormLogin" /> -->
        <article class="login__wrapper__content">
            <section class="login__wrapper__content__header">
                <Title :dataTitle="dataLoginTemplate.dataTitle" />
                <Text :dataText="dataLoginTemplate.dataText" />
            </section>
            <OptionsLogin :dataOptionsLogin="dataLoginTemplate.dataOptionsLogin" />
            <CardLoginNormal :dataCardLogin="dataLoginTemplate.dataCardLogin" />
            <router-link to="/recovery-password/verify-email" class="login__wrapper__content__forgot">
                {{ $t('have_you_forgotten_your_password') }}
            </router-link>
        </article>
        <ModalAlert :dataModalAlert="dataLoginTemplate.dataModalAlert" />
    </main>
</template>

<script setup lang="ts">
/**  IMPORTS
*    ?- calls all components. functions or variables for be used. 
*/

import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import FormLogin from '../../organisms/form-login/FormLogin.organism.vue';
import Title from '../../atoms/title/Title.atom.vue';
import Text from '../../atoms/text/Text.atom.vue';
import OptionsLogin from '../../organisms/options-login/OptionsLogin.organism.vue';
import CardLoginNormal from '../../organisms/card-login-normal/CardLoginNormal.organism.vue';
import { defineProps } from 'vue';

defineProps(['dataLoginTemplate']);//Use defineProps for can get data in another component.



</script>
<style scoped src="./Login.template.scss"></style>
