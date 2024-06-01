<template>
    <Trd :dataTrd="dataTrd" />
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Trd from '../../templates/trd/Trd.template.vue';
import TrdServices from '../../../services/TrdServices.ts';
import { useRouter } from "vue-router";
const router = useRouter();

const dataTrd: any = reactive({
    data: [],
    dataButtonNewTrd: {
        className: 'blue',
        text: 'Cargar documento',
        disabled: false,
        onClick: () => { router.push('/home/matrix-relation'); }
    },
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
});

onMounted(() => {
    TrdServices.getRelationshipMatrix()
        .then((response: any) => {
            dataTrd.data = response;
        });
});
</script>
<style scoped src="./Trd.page.scss"></style>