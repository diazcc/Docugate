<!--
    todo This component needs this structure:

    dataInputSearch: {
            dataInput: {
                id: '',
                name: '',
                classInputEmail: '',
                model: '',
                type: '',
                placeholder: 'search',
                disabled: false,
                required: false,
                onClick: () => { }
            },
            dataImg: {
                id: '',
                name: '',
                class: ' icon',
                src: '/src/assets/svg/icon-lupa-general.svg',
                type: '',
                alt: '',
                onClick: () => { }
            }

        }
-->

<template lang="">
    <section class="input-search">
        <Input :dataInput="dataInputSearch.dataInput"/>
        <Img :dataImg="dataInputSearch.dataImg"/>
    </section>
</template>
<script setup lang="ts">
import Input from "../../atoms/input/InputText.atom.vue";
import Img from "../../atoms/img/Img.atom.vue";


defineProps(['dataInputSearch']);
</script>
<style scoped src="./InputSearch.molecule.scss"></style>