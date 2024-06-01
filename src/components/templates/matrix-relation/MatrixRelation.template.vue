<template>
    <article class="relationship-matrix-template--form">
        <h1 class="relationship-matrix-template--form__title">Matriz de relacion</h1>
        <ul class="relationship-matrix-template--form__content">
            <li class="relationship-matrix-template--form__content__card">
                <Select :dataSelect="dataRelationshipMatrix.dataSelectDependence" required/>
            </li>
            <li class="relationship-matrix-template--form__content__card">
                <Select :dataSelect="dataRelationshipMatrix.dataSelectSerie" required/>
            </li>
            <li class="relationship-matrix-template--form__content__card">
                <Select :dataSelect="dataRelationshipMatrix.dataSelectSubserie" required/>
            </li>
            <li class="relationship-matrix-template--form__content__card">
                <Select :dataSelect="dataRelationshipMatrix.dataSelectDocumentaryType" required/>
            </li>
        </ul>
        <nav class="relationship-matrix-template--form__nav">
            <Button :dataButton="dataRelationshipMatrix.dataButtonNext"/>
        </nav>
    </article>
    <ModalAlert :dataModalAlert="dataRelationshipMatrix.dataModalAlert"/>
    <ModalConfirmation :dataModalConfirmation="dataRelationshipMatrix.dataModalConfirmation"/>
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue'
import Select from '../../atoms/select/Select.atom.vue'
import ModalAlert from '../../molecules/modals/alert/ModalAlert.molecule.vue';
import ModalConfirmation from '../../molecules/modals/confirmation/ModalConfirmation.molecule.vue';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';

defineProps(['dataRelationshipMatrix']);

</script>
<style scoped src="./MatrixRelation.template.scss"></style>

