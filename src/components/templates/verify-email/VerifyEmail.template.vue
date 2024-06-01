<!-- COMPONENT VERIFYEMAIL -->
<template>
    <main class="verifyemail__wrapper">
        <header class="verifyemail__wrapper__header">
            <img src="/docugate-black.png" alt="" class="verifyemail__wrapper__header__img">
            <button @click="$i18n.locale == 'es' ? $i18n.locale = 'en' : $i18n.locale = 'es'"
                class="verifyemail__wrapper__header__button">{{ $i18n.locale == 'es' ? $t('switch_es') : $t('switch_en')
                }}</button>
        </header>

        <article class="verifyemail__wrapper__content">
            <section class="verifyemail__wrapper__content__header">
                <Title :dataTitle="dataVerifyEmailTemplate.dataTitle" />
                <Text :dataText="dataVerifyEmailTemplate.dataText" />
            </section>


            <CardVerifyEmail :dataCardVerifyEmail="dataVerifyEmailTemplate.dataCardVerifyEmail" />

        </article>
        <ModalAlert :dataModalAlert="dataVerifyEmailTemplate.dataModalAlert" />
    </main>
</template>

<script setup lang="ts">
/**  IMPORTS
*    ?- calls all components. functions or variables for be used. 
*/

import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import Title from '../../atoms/title/Title.atom.vue';
import Text from '../../atoms/text/Text.atom.vue';
import CardVerifyEmail from '../../organisms/card-verify-email/CardVerifyEmail.organism.vue';
import { defineProps } from 'vue';

defineProps(['dataVerifyEmailTemplate']);//Use defineProps for can get data in another component.



</script>
<style scoped src="./VerifyEmail.template.scss"></style>
