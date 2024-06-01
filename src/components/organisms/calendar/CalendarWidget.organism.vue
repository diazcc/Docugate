


<template>
    <section class="calendar">
        <article class="calendar__title">
            <TitleAtom :dataTitle="dataCalendarWidget.dataTitle"></TitleAtom>
        </article>
        <article class="calendar__content">
            <Calendar></Calendar>
        </article>
    </section>
</template>


<script setup lang="ts">

import {
    defineProps,
} from "vue";
import { useRouter } from "vue-router";
import TitleAtom from "../../atoms/title/Title.atom.vue";
import Calendar from "../../atoms/calendar/Calendar.atom.vue";
const router = useRouter();

defineProps(['dataCalendarWidget'])



</script>

<style scoped src="./CalendarWidget.organism.scss"></style>