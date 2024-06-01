<template>
    <HistoricalFilesTemplate :dataHistoricalFiles="dataHistoricalFiles"/>
</template>

<script setup lang="ts">
import HistoricalFilesTemplate from '../../templates/historical-files/HistoricalFiles.template.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import FilesServices from '../../../services/FilesServices.ts';
const router = useRouter();
const dataHistoricalFiles: any = reactive({
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
                dataHistoricalFiles.dataModalPdfViewer.isActive = 'hidde';
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
                dataHistoricalFiles.dataModalAlert.isActive = 'hidde';
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
            dataHistoricalFiles.data = response.results;

        });
}
function redirectNewFiles() {
    router.push('upload_files');
}
function openModalPdfViewer(path: any) {
    dataHistoricalFiles.dataModalPdfViewer.isActive = 'show';
    FilesServices.getDocumentContent(path)
        .then((response: any) => {
            dataHistoricalFiles.dataModalPdfViewer.dataPdfViewer.urlPdf = response;
        })
        .catch((error: any) => {
            dataHistoricalFiles.dataModalPdfViewer.isActive = 'hidde';

            dataHistoricalFiles.dataModalAlert.isActive = 'show';
            dataHistoricalFiles.dataModalAlert.dataText.text = error;
        });
}
</script>
