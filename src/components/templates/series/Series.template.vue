<template>
    <article class="series-template" v-if="!dataSeries.stateFormCreate">
        <header class="series-template__header">
            <h1>Serie</h1>
            <Button :dataButton="dataSeries.dataButtonNewSeries" />
        </header>
        <nav class="series-template__nav">
            <select name="" id="" class="series-template__filter">
                <option value="">hola</option>
                <option value="">hola</option>
                <option value="">hola</option>
            </select>
            <InputSearch :dataInputSearch="dataSeries.dataInputSearch"/>
        </nav>
        <section class="series-template__table"> 
            <ul class="series-template__table__column--header">
                <li class="series-template__table__row--header">
                    Nombre
                </li>
                <li>
                    Codigo
                </li>
                <li>
                    Estado
                </li>
                <li>
                    Tiempo
                </li>
            </ul>
            <ul class="series-template__table__column" v-for="data in dataSeries.data">
                <li class="series-template__table__row">
                    {{data.name}}
                </li>
                <li>
                    {{data.code}}
                </li>
                <li>
                    null
                </li>
                <li>
                    null
                </li>
            </ul>
        </section>
    </article>
    <article class="series-template--form" v-else>
        <h1 class="series-template--form__title">Crear Serie</h1>
        <ul class="series-template--form__content">
            <li class="series-template--form__content__card">
                <input type="number" placeholder="Codigo serie" min="0" required  v-model="dataSeries.dataForm.code">
            </li>
            <li class="series-template--form__content__card">
                <input type="text" placeholder="Nombre de serie" required v-model="dataSeries.dataForm.name">
            </li>
        </ul>
        <nav class="series-template--form__nav">
            <Button :dataButton="dataSeries.dataButtonBack"/>
            <Button :dataButton="dataSeries.dataButtonNext"/>
        </nav>
    </article>
    <ModalAlert :dataModalAlert="dataSeries.dataModalAlert"/>
    <ModalConfirmation :dataModalConfirmation="dataSeries.dataModalConfirmation"/>
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue'
import Select from '../../atoms/select/Select.atom.vue'
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';

defineProps(['dataSeries']);

</script>
<style scoped src="./Series.template.scss"></style>
