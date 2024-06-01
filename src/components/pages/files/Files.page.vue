<template>
    <FilesTemplate :dataFiles="dataFiles" />
</template>
<script setup lang="ts">
import FilesTemplate from '../../templates/files/Files.template.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import FilesServices from '../../../services/FilesServices.ts';
import axios from 'axios';
const router = useRouter();
const dataFiles: any = reactive({
    data: [],
    dataButtonNewFiles: {
        className: 'blue',
        text: 'upload_files',
        disabled: false,
        onClick: () => {
            redirectNewFiles();
        }
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

    },
    getFile: (data: any) => {
        openModalPdfViewer(data?.document);
    },
    dataModalPdfViewer: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataFiles.dataModalPdfViewer.isActive = 'hidde';
            }
        },
        dataPdfViewer: {
            urlPdf: '',
            toolbar: {
                toolbar: false
            },
            onClose: () => {
            }
        }
    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'close',
            disabled: false,
            onClick: () => {
                dataFiles.dataModalAlert.isActive = 'hidde';
            }
        },
        dataText: {
            classText: '',
            text: 'Esta es la descripcion',
            disabled: false,
            onClick: () => { }
        }
    },
});

onMounted(() => {
    getFiles();
});

/**
 * todo GET & SET
 */

function getFiles() {
    FilesServices.getFiles()
        .then((response: any) => {
            console.log(response);
            dataFiles.data = response.results;

        });
}
function redirectNewFiles() {
    /**
     * todo BUG/PROBLEM WITH ROUTER IN OTHERS VIEWS OF THE SAME MODULE ---  some must add files/ and others just the path 
     */
    router.push('files/upload_files');
}
function openModalPdfViewer(path: any) {
    dataFiles.dataModalPdfViewer.isActive = 'show';
    FilesServices.getDocumentContent(path)
        .then((response: any) => {
            console.log(response);
            dataFiles.dataModalPdfViewer.dataPdfViewer.urlPdf = response;
        })
        .catch((error: any) => {
            console.log(error);
            dataFiles.dataModalPdfViewer.isActive = 'hidde';

            dataFiles.dataModalAlert.isActive = 'show';
            dataFiles.dataModalAlert.dataText.text = error;
        });
}
</script>
<style scoped src="./Files.page.scss"></style>
