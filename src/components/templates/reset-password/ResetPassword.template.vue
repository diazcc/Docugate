<!-- COMPONENT RESETPASSWORD -->
<template>
    <main class="resetpassword__wrapper">
        <header class="resetpassword__wrapper__header">
            <img src="/docugate-black.png" alt="" class="resetpassword__wrapper__header__img">
            <button @click="$i18n.locale == 'es' ? $i18n.locale = 'en' : $i18n.locale = 'es'"
                class="resetpassword__wrapper__header__button">{{ $i18n.locale == 'es' ? $t('switch_es') : $t('switch_en')
                }}</button>
        </header>

        <article class="resetpassword__wrapper__content">
            <section class="resetpassword__wrapper__content__header">
                <Title :dataTitle="dataResetPasswordTemplate.dataTitle" />
                <Text :dataText="dataResetPasswordTemplate.dataText" />
            </section>


            <CardResetPassword :dataCardResetPassword="dataResetPasswordTemplate.dataCardResetPassword" />

        </article>
        <ModalAlert :dataModalAlert="dataResetPasswordTemplate.dataModalAlert" />
        <ModalConfirmation :dataModalConfirmation="dataResetPasswordTemplate.dataModalConfirmation" />

    </main>
</template>

<script setup lang="ts">
/**  IMPORTS
*    ?- calls all components. functions or variables for be used. 
*/
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';

import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import Title from '../../atoms/title/Title.atom.vue';
import Text from '../../atoms/text/Text.atom.vue';
import CardResetPassword from '../../organisms/card-reset-password/CardResetPassword.organism.vue';
import { defineProps } from 'vue';

defineProps(['dataResetPasswordTemplate']);//Use defineProps for can get data in another component.



</script>
<style scoped src="./ResetPassword.template.scss"></style>
