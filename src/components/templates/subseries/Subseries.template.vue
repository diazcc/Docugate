<template>
    <article class="subseries-template" v-if="!dataSubseries.stateFormCreate">
        <header class="subseries-template__header">

            <h1>Subseries</h1>
            <Button :dataButton="dataSubseries.dataButtonNewSubseries" />
        </header>
        <nav class="subseries-template__nav">
            <select name="" id="" class="subseries-template__filter">
                <option value="">hola</option>
                <option value="">hola</option>
                <option value="">hola</option>
            </select>
            <InputSearch :dataInputSearch="dataSubseries.dataInputSearch" />
        </nav>
        <section class="subseries-template__table">
            <ul class="subseries-template__table__column--header">
                <li class="subseries-template__table__row--header">
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
            <ul class="subseries-template__table__column" v-for="data in dataSubseries.data">
                <li class="subseries-template__table__row">
                    {{ data.name }}
                </li>
                <li>
                    {{ data.code }}
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
    <article class="subseries-template--form" v-else>
        <h1 class="subseries-template--form__title">Crear Subserie</h1>
        <section class="subseries-template--form__content">
            <ul class="subseries-template--form__content__container">
                <li class="subseries-template--form__content__container__card">
                    <Select :dataSelect="dataSubseries.dataSelect" required />
                </li>
                <li class="subseries-template--form__content__container__card">
                    <input type="number" placeholder="Codigo subserie" min="0" required
                        v-model="dataSubseries.dataForm.code">
                </li>
                <li class="subseries-template--form__content__container__card">
                    <input type="text" placeholder="Nombre de subserie" required v-model="dataSubseries.dataForm.name">
                </li>
                <li class="subseries-template--form__content__container__card">
                    <input type="number" placeholder="Tiempo de archivo de gestion" min="0" required
                        v-model="dataSubseries.dataForm.time_file_management">
                </li>
                <li class="subseries-template--form__content__container__card">
                    <input type="number" placeholder="Tiempo de archivo central" min="0" required
                        v-model="dataSubseries.dataForm.time_file_central">
                </li>
                <li class="subseries-template--form__content__container__card">
                    <select name="" id="" required v-model="dataSubseries.dataForm.final_disposition">
                        <option value="" selected disabled>Seleccionar disposicion final...</option>
                        <option value="001">Conservacion total</option>
                        <option value="002">Seleccion</option>
                        <option value="003">Digitalizacion</option>
                        <option value="004">Elminacion</option>
                    </select>
                </li>
            </ul>
        </section>
        <nav class="subseries-template--form__nav">
            <Button :dataButton="dataSubseries.dataButtonBack" />
            <Button :dataButton="dataSubseries.dataButtonNext" />
        </nav>
    </article>
    <ModalAlert :dataModalAlert="dataSubseries.dataModalAlert" />
    <ModalConfirmation :dataModalConfirmation="dataSubseries.dataModalConfirmation" />
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue'
import Select from '../../atoms/select/Select.atom.vue'
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';

defineProps(['dataSubseries']);

</script>
<style scoped src="./Subseries.template.scss"></style>
