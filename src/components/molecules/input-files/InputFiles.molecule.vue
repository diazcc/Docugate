<!-- 
    TODO COMPONENT INPUT FILES
    
    ?structure:

    dataInputFiles:{
        counterFiles:0,
        openModalDocs: ()=>{
            ...dataModalListDocuments.isActive = true;
        },
        dataModalListDocuments:{
            isActive: false,
            closeModal: () => { ...dataInputFiles.dataModalListDocuments.isActive = false; },
        }
    }
-->

<template>
    <div class="input-files" @click="dataInputFiles.openModalDocs">
        <p class="input-files__text">{{$t('update_files')}}</p>
        <p class="input-files__counter">{{dataInputFiles.counterFiles}}</p>
    </div>
    <ModalListDocuments :dataModalListDocuments="dataInputFiles.dataModalListDocuments"  @emitDocSelected = "emitDocSelected"/>
</template>
<script setup lang="ts">
import ModalListDocuments from '../../molecules/modals/list-documents/ModalListDocuments.molecule.vue';

const props = defineProps(['dataInputFiles']);
const emits  = defineEmits(['emitDocSelected']);
function emitDocSelected(file: any) {
    emits('emitDocSelected', file);
}



</script>
<style scoped src="./InputFiles.molecule.scss"></style>