<template>
        <CentralFiles :dataCentralFiles="dataCentralFiles" />
</template>

<script setup lang="ts">
import CentralFiles from '../../templates/central-files/CentralFiles.template.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import FilesServices from '../../../services/FilesServices.ts';
const router = useRouter();
const dataCentralFiles: any = reactive({
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
                                dataCentralFiles.dataModalPdfViewer.isActive = 'hidde';
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
                                dataCentralFiles.dataModalAlert.isActive = 'hidde';
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
                        dataCentralFiles.data = response.results;

                });
}
function redirectNewFiles() {
        router.push('upload_files');
}
function openModalPdfViewer(path: any) {
        dataCentralFiles.dataModalPdfViewer.isActive = 'show';
        FilesServices.getDocumentContent(path)
                .then((response: any) => {
                        dataCentralFiles.dataModalPdfViewer.dataPdfViewer.urlPdf = response;
                })
                .catch((error: any) => {
                        dataCentralFiles.dataModalPdfViewer.isActive = 'hidde';

                        dataCentralFiles.dataModalAlert.isActive = 'show';
                        dataCentralFiles.dataModalAlert.dataText.text = error;
                });
}
</script>
<style scoped src="./CentralFiles.page.scss"></style>