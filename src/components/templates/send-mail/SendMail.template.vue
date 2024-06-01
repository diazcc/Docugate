<!-- COMPONENT SENDMAIL -->
<template>
    <main class="sendmail__wrapper">
        <header class="sendmail__wrapper__header">
            <img src="/docugate-black.png" alt="" class="sendmail__wrapper__header__img">
            <button @click="$i18n.locale == 'es' ? $i18n.locale = 'en' : $i18n.locale = 'es'"
                class="sendmail__wrapper__header__button">{{ $i18n.locale == 'es' ? $t('switch_es') : $t('switch_en')
                }}</button>
        </header>

        <!-- <FormSendMail :dataFormSendMail="dataFormSendMail" /> -->
        <article class="sendmail__wrapper__content">
            <section class="sendmail__wrapper__content__header">
                <Title :dataTitle="dataSendMail.dataTitle" />
                <Text :dataText="dataSendMail.dataText" />
            </section>


            <CardNewPassword :dataCardVerifyEmail="dataSendMail.dataCardSendMail" />

        </article>
        <ModalAlert :dataModalAlert="dataSendMail.dataModalAlert" />
    </main>
</template>

<script setup lang="ts">
/**  IMPORTS
*    ?- calls all components. functions or variables for be used. 
*/

import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import Title from '../../atoms/title/Title.atom.vue';
import Text from '../../atoms/text/Text.atom.vue';
import CardNewPassword from '../../organisms/card-verify-email/CardVerifyEmail.organism.vue';
import { defineProps } from 'vue';

defineProps(['dataSendMail']);//Use defineProps for can get data in another component.



</script>
<style scoped src="./SendMail.template.scss"></style>
