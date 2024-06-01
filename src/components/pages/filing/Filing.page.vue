<template>
    <FilingTemplate :dataFiling="dataFiling" @sendDataEditorModalAssignFiling="sendDataEditorModalAssignFiling" />
</template>
<script setup lang="ts">
import FilingTemplate from "../../templates/filing/Filing.template.vue";
import { onMounted, reactive, ref } from 'vue';
import FilingServices from "../../../services/FilingServices";
import { useRoute } from 'vue-router';

const route: any = useRoute();
const radicatedId: any = ref(route.params.id);
const emailUser: any = ref('');
const dataFiling = reactive({
    stateViewTrazability: true,
    stateViewAlerts: false,
    stateViewDocuments: false,
    redirectTrazability: () => {
        redirectTrazability();
    },
    redirectAlerts: () => {
        redirectAlerts();
    },
    redirectDocuments: () => {
        redirectDocuments();
    },
    data: {
        subject: '',
        filing_code: '',
        remitter: '',
        person_type: '',
        email: '',
        filing_date: '',
        status: '',
        documents: [
            {
                name: '',
                url: ''
            }
        ]
    },
    dataLineHistory: [],
    onClickDocument: (url: any) => {
        openModalPdfViewer(url);
    },
    dataModalPdfViewer: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => { closeModalPdfViewer(); }
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
    dataSelectActions: {
        id: '',
        name: '',
        className: '',
        disabled: false,
        onChange: (data: any) => {
            validateSelect(data.target.value);
            dataFiling.dataSelectActions.model = '';//Refresh select and values before be selected
        },
        onClick: () => { },
        placeholder: 'actions',
        model: '',
        options: [
            {
                value: '',
                label: ''
            }
        ]
    },
    dataModalAssignFiling: {
        isActive: false,
        dataEditorText: {
            dataEditor: { // properties for the editor
                setData: () => { },
                content: '',
            },
        },
        dataButtonCancel: {
            className: '',
            text: 'Cancelar',
            disabled: false,
            onClick: () => {
                closeModalAssignFiling()
            }
        },
        dataButtonSend: {
            className: 'blue',
            text: 'Enviar',
            disabled: false,
            onClick: () => {
                dataFiling.dataModalAssignFiling.dataEditorText.dataEditor.setData();
            }
        },
        dataSelectDependence: {
            id: '',
            name: 'dependece',
            className: '',
            disabled: false,
            onClick: () => { },
            placeholder: 'Seleccionar dependencia',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        },
        dataSelectUser: {
            id: '',
            name: 'userDependece',
            className: '',
            disabled: true, //disabled temporaly
            onClick: () => { },
            placeholder: 'Seleccionar Usuario',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }

            ]
        }
    },
});

/**
 * Todo ########################### FUNCTIONS ####################################
 */


/**
 * Todo CYCLES LIFES
 */

onMounted(() => {
    getRecord(radicatedId.value);
});


/**
 * TODO GET AND SEN
 * ?
 */

async function getRecord(id: any) {
    try {
        const response = await FilingServices.getRecord(id)
        console.log(response, 'response getRecord');
        dataFiling.data.subject = response.response.filings[0].subject;
        dataFiling.data.filing_code = response.response.filings[0].filing_code;
        dataFiling.data.remitter = response.response.remitter ? response.response.remitter.first_name + ' ' + response.response.remitter.last_name : 'Anonimo';
        dataFiling.data.person_type = response.response.person_type || 'Anonimo';
        dataFiling.data.email = response.response.email || 'No ingresado';
        dataFiling.data.filing_date = response.response.filings[0].filing_date;
        dataFiling.data.status = response.response.status.label;
        console.log(response.response.documents);
        dataFiling.data.documents = response.response.documents.map((value: any) => (
            {
                name: value.name,
                url: value.document
            }
        ));
        emailUser.value = response.response.email;
        validateOptionSelectActions(response.response.assigned_user.email);
    } catch (error) {
        console.error(error);
    }
}

async function getDocumentContent(url: any, id: any) {
    const response =  FilingServices.getDocumentContent(url, id).then((response: any) => {
        console.log(response);
        dataFiling.dataModalPdfViewer.dataPdfViewer.urlPdf = response;
    });


}

function sendDataEditorModalAssignFiling(data: any) {
    console.log(data);
}



/**
 * TODO OPEN & CLOSE
 * 
 */




function openModalPdfViewer(url: any) {
    getDocumentContent(url, radicatedId.value);
    dataFiling.dataModalPdfViewer.isActive = 'show';
    dataFiling.dataModalPdfViewer.dataButton.text = 'Cerrar';

}


function closeModalPdfViewer() {
    dataFiling.dataModalPdfViewer.isActive = 'hidde';
    dataFiling.dataModalPdfViewer.dataPdfViewer.urlPdf = '';
}

function openModalAssignFiling() {
    dataFiling.dataModalAssignFiling.isActive = true
}

function closeModalAssignFiling() {
    dataFiling.dataModalAssignFiling.isActive = false
}


/**
 * TODO VALIDATIONS
 * 
 */
function validateOptionSelectActions(value: any) { //This function isnt finalized, must be improve about api 
    const options: any = reactive([
        {
            value: 'assign',
            label: 'assign'
        },
        {
            value: 'move',
            label: 'move'
        },
        {
            value: 'update',
            label: 'update'
        }
    ]);
    if (value != 'prueba@prueba.com') { //This condictional must be improve about  api records
        options.push({ value: 'reply', label: 'reply' });

    }
    dataFiling.dataSelectActions.options = options;
}


function validateSelect(key: any) {

    switch (key) {
        case 'assign':
            console.log(key);

            openModalAssignFiling();

            break;

        default:
            break;
    }

}



/**
 * TODO REDIRECTS
 * 
 */


function redirectTrazability() {
    dataFiling.stateViewDocuments = false;
    dataFiling.stateViewTrazability = true;
    dataFiling.stateViewAlerts = false;
}
function redirectAlerts() {
    dataFiling.stateViewDocuments = false;
    dataFiling.stateViewTrazability = false;
    dataFiling.stateViewAlerts = true;
}

function redirectDocuments() {
    dataFiling.stateViewDocuments = true;
    dataFiling.stateViewTrazability = false;
    dataFiling.stateViewAlerts = false;
}
</script>
<style scoped src="./Filing.page.scss"></style>