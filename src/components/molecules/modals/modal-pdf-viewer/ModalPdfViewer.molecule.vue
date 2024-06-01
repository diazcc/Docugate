<!--
    Todo: COMPONENT MODAL PDF VIEWER REUSABLE
    ?To use this component, read carefully what it requires in order to handle the correct data and structure.
dataModalPdfViewer: {
            isActive: '', -- hidde or 'show'
            dataButton: {
                className: '',
                text: 'Cerrar',
                disabled: false,
                onClick: () => { }
            },
            dataPdfViewer: {
                urlPdf: '',
                toolbar: {
                    ?toolbar: false || toolbarViewerLeft: false || toolbarViewerRight: false
                },
                onClose :()=>{
                    ?to use this function is for get event when close the modal or component where is called.
                    todo like this : dataModalPdfViewer.dataPdfViewer.onClose();
                }
            }

            },
-->
<template>
    <article :class="'alert-modal-pdf-viewer-background ' + dataModalPdfViewer?.isActive || 'hidde'">
        <section :class="['alert-modal-pdf-viewer-background__container ' + (dataModalPdfViewer?.isActive =='show' ? 'showContainer ' : 'hiddeContainer ')]">
            <a class="alert-modal-pdf-viewer-background__container__content-pdf">
                <PdfViewer :dataPdfViewer="dataModalPdfViewer?.dataPdfViewer" v-if="dataModalPdfViewer?.isActive =='show'"/>
            </a>
            <Button :dataButton="dataModalPdfViewer.dataButton"/>
        </section>
    </article>
</template>
<script setup lang="ts">
import Button from '../../../atoms/button/Button.atom.vue';
import PdfViewer from '../../../atoms/pdf-viewer/PdfViewer.atom.vue';
const prop = defineProps(['dataModalPdfViewer']);

</script>
<style scoped src="./ModalPdfViewer.molecule.scss"> 
</style>