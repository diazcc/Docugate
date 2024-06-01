<!-- 
    todo COMPONENT FLOW RADICATION WITH VIEW RESPONSE 


    dataFilingFlow: {
        stateResponseFiling: false, //start false because the workflow isnt complete
        stateCreatedFilin: true, //start true because the form is active but when is sending data to enpoint change to false
        stateViewFileAnonimous: false, //start false in case isnt anonimous filing , if is true , show all inputs
        dataFormFiling: { //structure for formData
            tracking_number: '',
            subject: '',
            confidential_document: '',
            validateLegalrep: '',
            legal_representative: '',
            presentation_mode: '',
            response_mode: '',
            remitter: '',
            address: '',
            phone_number: '',
            email: '',
        },
        dataResponse: { //This is for last view as response, show qr and the data necesary
            dataImgQR: {
                id: '',
                name: '',
                class: '',
                src: '',
                type: '',
                alt: '',
                onClick: () => { }
            },
            filing_code: '',
            filing_date: ' ',
            remitter: '',
            type_of_filing: '',
            subject: ''
        }
    }
-->


<template>
    <section class="filing__container__create-filing">
        
        <div
            :class="'filing__container__create-filing__form filing__container__create-filing__form--' + (dataFilingFlow.stateResponseFiling ? 'hidde' : '') + (dataFilingFlow.stateCreatedFilin ? '' : ' loading-component')">
            <p class="filing__container__create-filing__form__title">Crear radicacion {{
                (dataFilingFlow.stateViewFileAnonimous ? 'anonima' : '') }}:</p>
            <ul class="filing__container__create-filing__form__content">
                <li class="filing__container__create-filing__form__content__card">
                    <input type="number" v-model="dataFilingFlow.dataFormFiling.tracking_number"
                        placeholder="Número de páginas" required>

                </li>
                <li class="filing__container__create-filing__form__content__card">
                    <input type="text" v-model="dataFilingFlow.dataFormFiling.subject" placeholder="Asunto"
                        required>

                </li>
                <li class="filing__container__create-filing__form__content__card">
                    <select v-model="dataFilingFlow.dataFormFiling.presentation_mode" required>
                        <option selected disabled value="">Seleccionar modo de presentación</option>
                        <option value="001">Documento Digital</option>
                        <option value="002">Verbal</option>
                        <option value="003">Telefonica</option>
                        <option value="004">Otros Medios</option>
                    </select>
                </li>
                <li class="filing__container__create-filing__form__content__card">
                    <select v-model="dataFilingFlow.dataFormFiling.response_mode" required>
                        <option selected disabled value="">Seleccionar medio de respuesta</option>
                        <option value="005">Correo Electrónico</option>
                        <option value="006">Correspondencia física</option>
                    </select>
                </li>

                <li class="filing__container__create-filing__form__content__card"
                    v-if="dataFilingFlow.stateViewFileAnonimous">
                    <input type="text" v-model="dataFilingFlow.dataFormFiling.address" placeholder="Direccion"
                        required>
                </li>
                <li class="filing__container__create-filing__form__content__card"
                    v-if="dataFilingFlow.stateViewFileAnonimous">
                    <input type="text" v-model="dataFilingFlow.dataFormFiling.phone_number"
                        placeholder="Numero celular" required>
                </li>
                <li class="filing__container__create-filing__form__content__card"
                    v-if="dataFilingFlow.stateViewFileAnonimous">
                    <input type="text" v-model="dataFilingFlow.dataFormFiling.email" placeholder="Correo"
                        required>
                </li>
                <li class="filing__container__create-filing__form__content__card">
                    <p for="">Documento confidencial?</p>
                    <input type="checkbox" v-model="dataFilingFlow.dataFormFiling.confidential_document">

                </li>
                <li class="filing__container__create-filing__form__content__card">
                    <InputFiles :dataInputFiles="dataFilingFlow.dataInputFiles" @emitDocSelected = "emitDocSelected"/>
                </li>
                <li class="filing__container__create-filing__form__content__card" v-if="dataFilingFlow.dataFormFiling.presentation_mode =='002'">
                    <textarea placeholder="Mensaje verbal"></textarea>
                </li>

            </ul>
        </div>
        <div class="filing__container__create-filing__response-filing">

            <h1 class="filing__container__create-filing__response-filing__title">Radicación creada correctamente!
            </h1>
            <ul class="filing__container__create-filing__response-filing__content">
                <li class="filing__container__create-filing__response-filing__content__img">
                    <Img :dataImg="dataFilingFlow.dataResponse.dataImgQR" />
                </li>
                <li class="filing__container__create-filing__response-filing__content__card">
                    <p>Codigo de radicación: {{ dataFilingFlow.dataResponse.filing_code }}</p>
                    <p>Nombre del archivo: {{ dataFilingFlow.dataResponse.document }}</p>
                    <p>Fecha de radicación: {{ dataFilingFlow.dataResponse.filing_date }}</p>
                    <p>Remitente: {{ dataFilingFlow.dataResponse.remitter }}</p>
                    <p>Tipo de radicación: {{ dataFilingFlow.dataResponse.type_of_filing}}</p>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Img from '../../atoms/img/Img.atom.vue';
import InputFiles from '../../molecules/input-files/InputFiles.molecule.vue';

defineProps(['dataFilingFlow']);
const emits = defineEmits(['fileFiling','emitDocSelected']);

function getFile(file: any) {//Get file by input file and emit
    const fileList: any = file.target.files;
    if (fileList.length > 0) {
        const file = fileList[0];
        console.log(file);
        emits('fileFiling', file);
    } else {
        console.log('No se seleccionó ningún archivo');
    }
}
function emitDocSelected(file: any) {
    emits('emitDocSelected', file);
}
</script>
<style scoped src="./FilingFlow.organism.scss"></style>