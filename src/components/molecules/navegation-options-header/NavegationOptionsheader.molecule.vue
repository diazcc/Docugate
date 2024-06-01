<template lang="">
      <ul class="navegation-options-header">
        <CardNotifications :dataCardNotifications="dataNavegationOptionsHeader.dataCardNotificationsCalendar"/>

        <CardNotifications :dataCardNotifications="dataNavegationOptionsHeader.dataCardNotificationsInbox"/>

        <CardNotifications :dataCardNotifications="dataNavegationOptionsHeader.dataCardNotificationsGeneral"/>
       
        <CardNotifications :dataCardNotifications="dataNavegationOptionsHeader.dataCardNotificationsConfig" id="cardNotificationsConfig"/>

    </ul>
</template>

<script setup lang="ts">
import CardNotifications from "../../molecules/card-notifications/CardNotifications.molecule.vue";
defineProps(['dataNavegationOptionsHeader']);
</script>

<style scoped src="./NavegationOptionsheader.molecule.scss"></style>