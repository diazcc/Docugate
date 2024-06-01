<template>
    <article class="trd-template">
        <h1>Tablas de retencion documental</h1>
        <Button :dataButton="dataTrd.dataButtonNewTrd" />
        <nav class="trd-template__nav">
            <select name="" id="" class="trd-template__filter">
                <option value="">hola</option>
                <option value="">hola</option>
                <option value="">hola</option>
            </select>
            <InputSearch :dataInputSearch="dataTrd.dataInputSearch"/>
        </nav>
        <section class="trd-template__table"> 
            <ul class="trd-template__table__column--header">
                <li class="trd-template__table__row--header">
                    Tipo documental
                </li>
                <li>
                    Dependence
                </li>
                <li>
                    Serie
                </li>
                <li>
                    Subserie
                </li>
            </ul>
            <ul class="trd-template__table__column" v-for="data in dataTrd.data">
                <li class="trd-template__table__row">
                    {{data.documentary_type[0]?.name_document_type || 'null'}}
                </li>
                <li>
                    {{data.dependence.name}}
                </li>
                <li>
                    {{data.serie.name}}
                </li>
                <li>
                    {{data.sub_serie.name}}
                </li>
            </ul>
        </section>
    </article>
</template>
<script setup lang="ts">
import Button from '../../atoms/button/Button.atom.vue'
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';

defineProps(['dataTrd']);

</script>
<style scoped src="./Trd.template.scss"></style>