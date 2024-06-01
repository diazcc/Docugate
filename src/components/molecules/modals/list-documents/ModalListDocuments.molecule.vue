<!-- 
    dataModalListDocuments:{
        isActive: false,
        closeModal :()=>{},
    }

    @emitDocSelected = "emitDocSelected"
-->

<template>

    <article :class="'list-documents list-documents--'+(dataModalListDocuments.isActive? 'show':'hidde')">
        <section :class="'list-documents__content list-documents__content--' +(dataModalListDocuments.isActive? 'show':'hidde')" >
            <h1 class="list-documents__content__title">Lista de documentos</h1>
            <ul class="list-documents__content__header-list">
                <li class="list-documents__content__header-list__card">Nombre</li>
                <li class="list-documents__content__header-list__card">Acciones</li> 
            </ul>
            <ul class="list-documents__content__list">
                <li v-for="(file, index) in uploadedFiles" :key="index" class="list-documents__content__list__card" >
                    <p class="list-documents__content__list__card__name" >
                        {{ file.name }}
                    </p>
                    <img src="/public/icon-ver-archivo.svg" alt="" class="list-documents__content__list__card__see" @click="getPdfViewer(index)"> 
                    <button class="list-documents__content__list__card__delete" @click="removeFile(index)">x</button>
                </li>
            </ul>
            <nav class="list-documents__content__list__nav">
                <button class="list-documents__content__list__nav__button" @click="dataModalListDocuments.closeModal">Cerrar</button>
                <button class="list-documents__content__list__nav__button--update" @click="triggerFileInput">Cargar</button>
            </nav>

        </section>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" multiple />
    </article>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { accessStore } from '../../../../store';

const store  = accessStore();

const fileInput = ref<HTMLElement | null>(null);
const uploadedFiles:any = store.uploadedFiles;

defineProps(['dataModalListDocuments']);
const emit = defineEmits(['emitDocs','emitDocSelected']);

function triggerFileInput() {
    fileInput.value?.click();
}
function removeFile(index: number) {
store.removeUploadedFile(index);
}
async function handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
        for (let i = 0; i < inputElement.files.length; i++) {
            const file = inputElement.files[i];
            if (file.type === "application/pdf") {
                await store.addUploadedFile(file);//Use  store for save all files elected about input file. check store for be used
            }
        }
        
        inputElement.value = '';
    }
}

function getPdfViewer(file:any){
    emit('emitDocSelected', file);
}
</script>
<style scoped src="./ModalListDocuments.molecule.scss"></style>