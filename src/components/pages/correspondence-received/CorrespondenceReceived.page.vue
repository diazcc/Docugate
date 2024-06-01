<!--
    TODO COMPONENT CORRESPONDENCE RECEIVED PAGE
    ?This component has all logic and develop of correspondence on only section 'received'.
-->

<template>
    <CorrespondenceReceivedTemplate :dataCorrespondenceReceived="dataCorrespondenceReceived"
        @codeFiling="getCodeFilingByMenu" @user="getUser" @fileFiling="getDocumentFiling"
        @emitDocSelected="getFileFilingForm" @sendDataEditorModalAssignFiling="sendDataEditorModalAssignFiling"
        @sendDataEditorModalResponseEditor="sendDataEditorModalResponseEditor" />
</template>

<script setup lang="ts">

// IMPORTS
import axios from "axios";
import CorrespondenceReceivedTemplate from "../../templates/correspondence-received/CorrespondenceReceived.template.vue";
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, reactive, ref, watch } from "vue";
import LoginService from '../../../services/testService';//!This services must be deleted or modified name
import UserServices from '../../../services/UserServices';
import { accessStore } from "../../../store";
import FilingServices from "../../../services/FilingServices";
import { useRouter } from 'vue-router';
const router = useRouter();
const store = accessStore();

// VARIABLES OR STATES
/**
 * TODO HERE DEFINE VALUES DEFAULT
 */

const filing_code_filing: any = ref('');//State for be used globaly - selected code filing  by list menu table filings 
const urlBase: any = ref(axios.defaults.baseURL);//State for be user globaly
const url_pdf: any = ref('');//State for be user globaly
const ref_pdf: any = ref('');//State for be user globaly
const filesArrayFilingForm = ref(store.uploadedFiles);
const fileFilingForm: any = ref(null);
const fileReaderBase64: any = ref(null);
const dataListRad: any = ref('');
const idRecord: any = ref('');   //State for be used globaly - selected code filing  by functions modal assignated - review 
const idUser: any = ref('');
const listDependences: any = ref();
let formData: FormData = new FormData(); //Formdata used for be send to endpoits
const dataCorrespondenceReceived: any = reactive({//Structure of all components data
    id_remitter: 'id_remitter',
    dataCreateRemitterForm: {
        stateCreateRemmiter: true,
        data: {
            person_typeRemitter: '',
            person_typeNatural: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            second_last_name: '',
            identification_typeNatural: '',
            identification_number: '',
            contact_name: '',
            social_reason: '',
            nit_number: '',
            country: '',
            department: '',
            city: '',
            address: '',
            phone_number: '',
            email: '',
        },
        dataSelectCountry: {
            id: '',
            name: '',
            className: '',
            disabled: false,
            onChange: (data: any) => {
                setDataSelectCountry(data.target.value, data.target.options[data.target.selectedIndex].label)
            },
            onClick: () => { },
            placeholder: 'Seleccione un país',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        },
        dataSelectDepartament: {
            id: '',
            name: '',
            className: '',
            disabled: true,
            onChange: (data: any) => {
                setDataSelectDepartament(data.target.value, data.target.options[data.target.selectedIndex].label)
            },
            onClick: () => { },
            placeholder: 'Seleccione un departamento',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        },
        dataSelectCity: {
            id: '',
            name: '',
            className: '',
            disabled: true,
            onChange: (data: any) => {
                setDataSelectCity(data.target.value, data.target.options[data.target.selectedIndex].label)
            },
            onClick: () => { },
            placeholder: 'Seleccione un ciudad',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        }

    },


    state: false,//First state for show first view (tables filings) 'boolean'----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    stateViewFile: 'step1', // Steps  :  step1, step12, step123, step1234 for see each view but state must be  state =  boolean;



    stateCreateRemmiter: true,
    stateCreatedFilin: true, // Todo: Could be not used ---------------------------------------
    stateViewFileAnonimous: false,
    stateResponseFiling: false, // Todo: Could be not used ---------------------------------------
    dataButtonNewFile: {
        className: 'blue',
        text: 'filing_new',
        disabled: false,
        onClick: () => { redirectNeWFiling() }
    },
    dataButtonToSearchRemitter: {
        className: 'blue',
        text: 'filing_new',
        disabled: false,
        onClick: () => { redirectNeWFiling() }
    },
    dataButtonRedirectToSearchRemitter: {
        className: 'gray-blue',
        text: 'find_remitter',
        disabled: false,
        onClick: () => {
            dataCorrespondenceReceived.stateViewFile = 'step12';
        }
    },
    dataButtonRedirectToCreateRemitter: {
        className: 'gray-blue',
        text: 'create_remitter',
        disabled: false,
        onClick: () => {
            dataCorrespondenceReceived.stateViewFile = 'step123';
            dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_and_continue';
        }
    },
    dataButtonRedirectToCreateFileAnonimous: {
        className: 'gray-blue',
        text: 'anonymous_filing',
        disabled: false,
        onClick: () => {
            redirectNeWFilingAnonimous();
        }
    },
    redirectToSearchRemitter: () => {
        dataCorrespondenceReceived.stateViewFile = 'step12';
    },
    redirectToCreateRemitter: () => {
        dataCorrespondenceReceived.stateViewFile = 'step123';
        dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_and_continue';
    },
    redirectToCreateFileAnonimous: () => { console.log('anon') },
    dataButtonGoToNext:
    {
        className: 'blue',
        text: 'next',
        disabled: false,
        onClick: () => { validateNavegationButtonNext() }
    },
    dataButtonGoToBack:
    {
        className: 'gray',
        text: 'back',
        disabled: false,
        onClick: () => { validateNavegationButtonBack() }
    },
    dataTableCorrespondenceReceived: {
        data: [],
        dataInputSearch: {
            dataInput: {
                id: '',
                name: '',
                classInputEmail: '',
                model: '',
                type: 'text',
                placeholder: 'search_filing',
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
        optionsMenu: {
            moveFiling: () => { },
            assignFiling: (id_record: any) => {
                idRecord.value = id_record
                openModalAssignFiling()
            },
            responseFiling: (data: any) => {
                console.log(data, 'data responseFiling');
                
                idRecord.value = data.id
                getDataRemitters(data.remitter)
                getDataResponseModes(data.filings[0].response_mode)
                openModalResponseFiling();
            },
        },
        openFiling: () => {

        }
    },
    dataModalPdfViewer: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'close',
            disabled: false,
            onClick: () => { closeModalPdfViewer() }
        },
        dataPdfViewer: {
            urlPdf: url_pdf,
            toolbar: { toolbar: false },
            onClose: () => { }
        }
    },
    dataTableRemitters: {
        data: [],
        dataButton:
        {
            className: 'blue',
            text: 'create_remitter',
            disabled: false,
            onClick: () => { redirectCreateRemitter() }
        },
        dataInputSearch: {
            dataInput: {
                id: '',
                name: '',
                classInputEmail: '',
                model: '',
                type: '',
                placeholder: 'search_remitters',
                disabled: false,
                onClick: () => { }
            },
            dataImg: {
                id: '',
                name: '',
                class: ' icon',
                src: '/icon-lupa-general.svg',
                type: '',
                alt: '',
                onClick: () => { }
            }

        }

    },
    dataModalConfirmation: {
        isActive: '',
        dataText: {
            classText: '',
            text: '',
            disabled: false,
            onClick: () => { }
        },
        dataButton: {
            className: '',
            text: 'h',
            disabled: false,
            onClick: () => { dataCorrespondenceReceived.dataModalConfirmation.isActive = 'hidde' }
        },

    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'login',
            disabled: false,
            onClick: () => { }
        },
        dataText: {
            classText: '',
            text: 'this_is_the_description',
            disabled: false,
            onClick: () => { }
        }
    },
    dataCreatedFilin: {
        dataImgQR: {
            id: '',
            name: '',
            class: '',
            src: '',
            type: 'png',
            alt: '',
            onClick: () => { }
        },
        filing_code: '',
        filing_date: ' ',
        remitter: '',
        type_of_filing: '',
        subject: ''
    },
    dataFilingFlow: {
        stateResponseFiling: false, // = true for see view response filing final step.
        stateCreatedFilin: true,
        stateViewFileAnonimous: false,
        dataFormFiling: {
            tracking_number: '',
            subject: '',
            confidential_document: '',
            presentation_mode: '',
            response_mode: '',
            remitter: '',
            address: '',
            phone_number: '',
            email: '',
        },
        dataResponse: {
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
        },
        dataInputFiles: {
            counterFiles: 0,
            openModalDocs: () => {
                dataCorrespondenceReceived.dataFilingFlow.dataInputFiles.dataModalListDocuments.isActive = true;
            },
            dataModalListDocuments: {
                isActive: false,
                closeModal: () => {
                    dataCorrespondenceReceived.dataFilingFlow.dataInputFiles.dataModalListDocuments.isActive = false;
                },
            }
        },
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
            text: 'cancel',
            disabled: false,
            onClick: () => {
                closeModalAssignFiling()
            }
        },
        dataButtonSend: {
            className: 'blue',
            text: 'assign',
            disabled: false,
            onClick: () => {
                validateFormAssignFiling();
            }
        },
        dataSelectDependence: {
            id: '',
            name: 'dependece',
            className: '',
            disabled: false,
            onChange: (data: any) => {
                selectDependenceInputChange(data.target.value)
            },
            onClick: () => { },
            placeholder: 'select_dependency',
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
            name: 'userUser',
            className: '',
            disabled: true, //disabled temporaly
            onChange: (data: any) => {
                idUser.value = data.target.value
            },
            onClick: () => { },
            placeholder: 'select_user',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }

            ]
        }
    },
    dataModalResponseFiling: {
        isActive: false,
        formData: {
            addressee: '',
            response_mode: '',
        },
        dataSelectRemitter: {
            id: '',
            name: 'remitter',
            className: '',
            disabled: false,
            onChange: (data: any) => {
                setDataSelectRemitter(data.target.value)
            },
            onClick: () => { },
            placeholder: 'Selecciona un remitente',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        },
        dataSelectResponseMode: {
            id: '',
            name: 'response_mode',
            className: '',
            disabled: false,
            onChange: (data: any) => {
                setDataSelectResponseMode(data.target.value)
            },
            onClick: () => { },
            placeholder: 'Selecciona un medio de respuesta',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        },
        dataSelectActions: {
            id: '',
            name: 'response_actions',
            className: ' modal-response-filing__content__form__card__content-options--flex_1',
            disabled: false,
            onChange: (data: any) => {
                dataCorrespondenceReceived.dataModalResponseFiling.dataSelectActions.model = data.target.value
            },
            onClick: () => { },
            placeholder: 'Selecciona una accion',
            model: '',
            options: [
                {
                    value: 'sin accion',
                    label: 'sin accion'
                },
                {
                    value: 'revision',
                    label: 'revision'
                }
            ]
        },
        dataSelectActions2: {
            id: '',
            name: 'response_actions',
            className: ' modal-response-filing__content__form__card__content-options--flex_1',
            disabled: false,
            onChange: (data: any) => {
                console.log(data, 'data');
                
                dataCorrespondenceReceived.dataModalResponseFiling.dataSelectActions2.model = data.target.value
            },
            onClick: () => { },
            placeholder: 'Selecciona una accion',
            model: '',
            options: [
                {
                    value: 'firma',
                    label: 'firma'
                },
                {
                    value: 'aprobacion',
                    label: 'aprobacion'
                },
                {
                    value: 'sin accion',
                    label: 'sin accion'
                }
            ]
        },
        dataInputFiles: {
            counterFiles: 0,
            openModalDocs: () => {
                dataCorrespondenceReceived.dataModalResponseFiling.dataInputFiles.dataModalListDocuments.isActive = true;

            },
            dataModalListDocuments: {
                isActive: false,
                closeModal: () => {
                    dataCorrespondenceReceived.dataModalResponseFiling.dataInputFiles.dataModalListDocuments.isActive = false;
                },
            }
        },
        dataButtonBack:
        {
            className: '',
            text: 'back',
            disabled: false,
            onClick: () => { dataCorrespondenceReceived.dataModalResponseFiling.isActive = false; }
        },
        dataButtonNext:
        {
            className: 'blue',
            text: 'send',
            disabled: false,
            onClick: () => {
                dataCorrespondenceReceived.dataModalResponseFiling.isActive = false;
                dataCorrespondenceReceived.dataModalResponseEditor.isActive = true;
            }
        }
    },
    dataModalResponseEditor: {
        isActive: false, // This key is used to turn the modal on and off.
        affair: '',
        dataEditorText: {
            dataEditor: { // properties for the editor
                setData: () => { },
                content: '',
            },
        },
        dataButtonCancel: { // properties for the buttom cancel
            className: 'red',
            text: 'cancel',
            disabled: false,
            onClick: () => {
                dataCorrespondenceReceived.dataModalResponseEditor.isActive = false
            }
        },
        dataButtonSend: { // properties for the buttom send
            className: 'gray-blue',
            text: 'send',
            disabled: false,
            onClick: () => {
                dataCorrespondenceReceived.dataModalResponseEditor.dataEditorText.dataEditor.setData(); // The "getData" function from the editor properties is passed as the value of the function.
            }
        }
    }
});

/**
 * todo METHODS
 * 
 * ?LIFE CICLES
 */


// Ciclos de vida del componente
onBeforeMount(() => { });

onMounted(() => {
    getListRad()//Call function for get all filings exist on data base.
    getUsers();
    getParentDependences();
    getDataCountries();
});


onBeforeUpdate(() => { });

onUpdated(() => { });

onBeforeUnmount(() => { });

onUnmounted(() => {
});

watch(store.uploadedFiles, (newFiles: any, oldFiles) => {
    filesArrayFilingForm.value = [...newFiles];
    dataCorrespondenceReceived.dataFilingFlow.dataInputFiles.counterFiles = filesArrayFilingForm.value.length
});

/**
 * TODO FUNCTIONS SET AND GET
 */

function setFirstViewTablesFilings() {
    dataCorrespondenceReceived.stateViewFile = 'step1';
    dataCorrespondenceReceived.state = false;
    dataCorrespondenceReceived.dataButtonGoToNext.text = 'continue';

    //Todo: Put all state or validations for hidde and just show the first view
    dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling = false;
    dataCorrespondenceReceived.dataFilingFlow.stateViewFileAnonimous = false;


}
async function getDataCountries() {

    const arrayData: any = [];
    try {
        const response = await FilingServices.getCountries()
        if (response.error) {
            console.log('error usuario', response.data);
        }
        response.response.forEach((element: any) => {
            arrayData.push({
                value: element.id,
                label: element.name
            });
        });
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectCountry.options = arrayData;

    } catch (error) {
        console.error(error, 'error selectDependenceInputChange');
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectCountry.options = [];
    }

}

async function setDataSelectCountry(data: any, label: any) {

    dataCorrespondenceReceived.dataCreateRemitterForm.data.country = label

    const arrayData: any = [];
    try {
        const response = await FilingServices.getCountriesStates(data)
        if (response.error) {
            console.log('error usuario', response.data);
        }

        response.response.forEach((element: any) => {
            arrayData.push({
                value: element.id,
                label: element.name
            });
        });

        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectDepartament.options = arrayData;
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectDepartament.disabled = false;
    } catch (error) {
        console.error(error, 'error selectDependenceInputChange');
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectDepartament.options = [];
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectDepartament.disabled = true;

    }

}

async function setDataSelectDepartament(data: any, label: any) {

    dataCorrespondenceReceived.dataCreateRemitterForm.data.department = label

    const arrayData: any = [];
    try {
        const response = await FilingServices.getStatesCities(data)
        if (response.error) {
            console.log('error usuario', response.data);
        }

        response.response.forEach((element: any) => {
            arrayData.push({
                value: element.id,
                label: element.name
            });
        });

        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectCity.options = arrayData;
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectCity.disabled = false;
    } catch (error) {
        console.error(error, 'error selectDependenceInputChange');
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectCity.options = [];
        dataCorrespondenceReceived.dataCreateRemitterForm.dataSelectCity.disabled = true;

    }

}

function setDataSelectCity(data: any, label: any) {
    dataCorrespondenceReceived.dataCreateRemitterForm.data.city = label
}

function setDataSelectRemitter(data: any) {
    dataCorrespondenceReceived.dataModalResponseFiling.formData.addressee = data
}

function setDataSelectResponseMode(data: any) {
    dataCorrespondenceReceived.dataModalResponseFiling.formData.response_mode = data
}

async function getDataRemitters(remitter: any) {

    const arrayData: any = [];
    if (remitter != null) {
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectRemitter.model = remitter?.id
        dataCorrespondenceReceived.dataModalResponseFiling.formData.addressee = remitter?.id
    } else {
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectRemitter.model = ''
        dataCorrespondenceReceived.dataModalResponseFiling.formData.addressee = ''
    }

    try {
        const response = await FilingServices.getRemitters()

        if (response.error) {
            console.log('error usuario', response.data);
        }
        response.response.results.forEach((element: any) => {
            arrayData.push({
                value: element.id,
                label: element.email
            });
        });
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectRemitter.options = arrayData;
    } catch (error) {
        console.error(error, 'error selectDependenceInputChange');
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectRemitter.options = [];
    }
}

async function getDataResponseModes(response_mode: any) {

    const arrayData: any = [];
    if (response_mode != null) {
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectResponseMode.model = response_mode?.code
        dataCorrespondenceReceived.dataModalResponseFiling.formData.response_mode = response_mode?.code
    } else {
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectResponseMode.model = ''
        dataCorrespondenceReceived.dataModalResponseFiling.formData.response_mode = ''
    }

    try {
        const response = await FilingServices.getResponseModes()

        if (response.error) {
            console.log('error usuario', response.data);
        }
        response.response.forEach((element: any) => {
            arrayData.push({
                value: element.code,
                label: element.label
            });
        });
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectResponseMode.options = arrayData;
    } catch (error) {
        console.error(error, 'error selectDependenceInputChange');
        dataCorrespondenceReceived.dataModalResponseFiling.dataSelectResponseMode.options = [];
    }
}


async function selectDependenceInputChange(data: any) {
    const arrayData: any = [];
    try {
        const response = await FilingServices.getUsersDependence(data)
        if (response.error) {
            console.log('error usuario', response.data);
        }
        response.response.forEach((element: any) => {
            arrayData.push({
                value: element.id,
                label: element.email
            });
        });
        dataCorrespondenceReceived.dataModalAssignFiling.dataSelectUser.options = arrayData;
        dataCorrespondenceReceived.dataModalAssignFiling.dataSelectUser.disabled = false;
    } catch (error) {
        console.error(error, 'error selectDependenceInputChange');
        dataCorrespondenceReceived.dataModalAssignFiling.dataSelectUser.options = [];
        dataCorrespondenceReceived.dataModalAssignFiling.dataSelectUser.disabled = true;
        idUser.value = ''

    }
}

async function sendDataEditorModalAssignFiling(data: any) { //This function it's called by emits, review where get alls emits by component by function emited setData by editor text atom.

    const formData = new FormData
    formData.append('user_id', idUser.value)
    formData.append('comments', data)
    dataCorrespondenceReceived.dataModalAssignFiling.dataButtonSend.disabled = true;
    const response = await FilingServices.sendAssingData(idRecord.value, formData)
    if (response.data.status_code == 400 || response.data.error) {
        dataCorrespondenceReceived.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'an_error_has_occurred_please_try_again_later',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'continue',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                }
            },
        }
        dataCorrespondenceReceived.dataModalAssignFiling.dataButtonSend.disabled = false;
    }
    if (response.data.status_code == 200 || response.data.response) {
        dataCorrespondenceReceived.dataModalConfirmation = {
            isActive: 'show',
            dataText: {
                classText: '',
                text: 'successful_assignment',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: '',
                text: 'close',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalConfirmation.isActive = 'hidde';
                    dataCorrespondenceReceived.dataModalAssignFiling.isActive = false;
                    dataCorrespondenceReceived.dataModalAssignFiling.dataButtonSend.disabled = false;
                    setFirstViewTablesFilings();
                    getListRad()
                }
            },

        }
        
    }
    setFirstViewTablesFilings();

}

async function sendDataEditorModalResponseEditor(data: any) {

    const formData = new FormData
    formData.append('type_response', 'response_editor')
    formData.append('addressee', dataCorrespondenceReceived.dataModalResponseFiling.formData.addressee)
    formData.append('response_mode', dataCorrespondenceReceived.dataModalResponseFiling.formData.response_mode)
    formData.append('affair', dataCorrespondenceReceived.dataModalResponseEditor.affair)
    formData.append('response_sent', data)
    dataCorrespondenceReceived.dataModalResponseEditor.dataButtonSend.disabled = true;
    const response: any = await FilingServices.sendResponseData(idRecord.value, formData)
    console.log(response, 'response');
    if (response.data.status_code == 400 || response.data.error) {
        dataCorrespondenceReceived.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'all_inputs_empy',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'continue',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                }
            },
        }
        dataCorrespondenceReceived.dataModalResponseEditor.dataButtonSend.disabled = false;
    } else if (response.data.status_code == 201 || response.data.response) {
        dataCorrespondenceReceived.dataModalConfirmation = {
            isActive: 'show',
            dataText: {
                classText: '',
                text: 'the_response_has_been_sent',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: '',
                text: 'close',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalConfirmation.isActive = 'hidde';
                    dataCorrespondenceReceived.dataModalResponseEditor.isActive = false;
                    dataCorrespondenceReceived.dataModalResponseEditor.dataButtonSend.disabled = false;
                    getListRad()
                }
            },

        }
    }

}


async function getParentDependences() {
    const data: any = [];
    try {
        
        listDependences.value = await FilingServices.getParentDependences();
        listDependences.value.forEach((element: any) => {
            data.push({
                value: element.code,
                label: element.name
            });
        });
        dataCorrespondenceReceived.dataModalAssignFiling.dataSelectDependence.options = data;
    } catch (error) {
    }
}

function getFileFilingForm(index: any) {
    fileFilingForm.value = index;
    console.log(filesArrayFilingForm.value);
    console.log(store.uploadedFiles);

    const reader = new FileReader();
    reader.readAsDataURL(filesArrayFilingForm.value[index]);
    reader.onload = () => {
        const base64String = reader.result as string;
        openModalPdfViewer(base64String);
    };
}


function getDocumentFiling(file: any) {
    formData.append('document', file);
    console.log(file);
}


async function getUsers() {
    const response = await axios.get('/api/correspondence/remitters/').then((response: any) => {
        dataCorrespondenceReceived.dataTableRemitters.data = response.data.response.results;
        
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
}
function getUser(user: any) {
    dataCorrespondenceReceived.id_remitter = user;
    dataCorrespondenceReceived.stateViewFile = 'step1234';
    dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_filing';
}

async function getListRad() {
    try {
        const response = await UserServices.getAllFilings();
        if(response.response.results.length>0){
            dataCorrespondenceReceived.dataTableCorrespondenceReceived.data = response.response.results.map((data: any) => ({
                ...data,
                isMenuOpen: false 
            }));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function getFiling(code: any) {
    UserServices.getFiling(code).then(async (response: any) => {
        url_pdf.value = urlBase.value + await response.data.document.url;
    }).catch((error: any) => {
        console.log(error);
    });
}


/**
 * TODO FUNCTIONS SEND
 */



async function sendDataCreateRemitter() {
    const data: any = reactive({});
    if (getValidationForm('create-remitter-form__content__form')) {
        dataCorrespondenceReceived.stateCreateRemmiter = false;
        switch (dataCorrespondenceReceived.dataCreateRemitterForm.data.person_typeRemitter) {
            case '001':
                data.value = {
                    person_type: dataCorrespondenceReceived.dataCreateRemitterForm.data.person_typeRemitter,
                    first_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.first_name,
                    middle_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.middle_name,
                    last_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.last_name,
                    second_last_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.second_last_name,
                    identification_type: dataCorrespondenceReceived.dataCreateRemitterForm.data.identification_typeNatural,
                    identification_number: dataCorrespondenceReceived.dataCreateRemitterForm.data.identification_number,
                    country: dataCorrespondenceReceived.dataCreateRemitterForm.data.country,
                    department: dataCorrespondenceReceived.dataCreateRemitterForm.data.department,
                    city: dataCorrespondenceReceived.dataCreateRemitterForm.data.city,
                    address: dataCorrespondenceReceived.dataCreateRemitterForm.data.address,
                    phone_number: dataCorrespondenceReceived.dataCreateRemitterForm.data.phone_number,
                    email: dataCorrespondenceReceived.dataCreateRemitterForm.data.email
                };
                break;
            case '002':
                data.value = {
                    person_type: dataCorrespondenceReceived.dataCreateRemitterForm.data.person_typeRemitter,
                    contact_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.contact_name,
                    social_reason: dataCorrespondenceReceived.dataCreateRemitterForm.data.social_reason,
                    nit_number: dataCorrespondenceReceived.dataCreateRemitterForm.data.nit_number,
                    country: dataCorrespondenceReceived.dataCreateRemitterForm.data.country,
                    department: dataCorrespondenceReceived.dataCreateRemitterForm.data.department,
                    city: dataCorrespondenceReceived.dataCreateRemitterForm.data.city,
                    address: dataCorrespondenceReceived.dataCreateRemitterForm.data.address,
                    phone_number: dataCorrespondenceReceived.dataCreateRemitterForm.data.phone_number,
                    email: dataCorrespondenceReceived.dataCreateRemitterForm.data.email
                };
                break;
            case '003':
                data.value = {
                    person_type: dataCorrespondenceReceived.dataCreateRemitterForm.data.person_typeNatural,
                    first_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.first_name,
                    middle_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.middle_name,
                    last_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.last_name,
                    second_last_name: dataCorrespondenceReceived.dataCreateRemitterForm.data.second_last_name,
                    identification_type: dataCorrespondenceReceived.dataCreateRemitterForm.data.identification_typeNatural,
                    identification_number: dataCorrespondenceReceived.dataCreateRemitterForm.data.identification_number,
                    country: dataCorrespondenceReceived.dataCreateRemitterForm.data.country,
                    department: dataCorrespondenceReceived.dataCreateRemitterForm.data.department,
                    city: dataCorrespondenceReceived.dataCreateRemitterForm.data.city,
                    address: dataCorrespondenceReceived.dataCreateRemitterForm.data.address,
                    phone_number: dataCorrespondenceReceived.dataCreateRemitterForm.data.phone_number,
                    email: dataCorrespondenceReceived.dataCreateRemitterForm.data.email
                };
                break;

            default:
                break;
        }
        console.log(data);
        await axios
            .post('/api/correspondence/remitters/', data.value)
            .then((response: any) => {
                console.log(response.data.response.id);
                dataCorrespondenceReceived.id_remitter = response.data.response.id;
                dataCorrespondenceReceived.dataCreateRemitterForm.data = {
                    person_typeRemitter: '',
                    person_typeNatural: '',
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    second_last_name: '',
                    identification_typeNatural: '',
                    identification_number: '',
                    contact_name: '',
                    social_reason: '',
                    nit_number: '',
                    country: '',
                    department: '',
                    city: '',
                    address: '',
                    phone_number: '',
                    email: '',
                }
                dataCorrespondenceReceived.dataModalConfirmation = {
                    isActive: 'show',
                    dataText: {
                        classText: 'big',
                        text: 'the_remitter_was_created',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'continue',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceReceived.dataModalConfirmation.isActive = 'hidde';
                            dataCorrespondenceReceived.stateViewFile = 'step1234';
                            dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_filing';
                        }
                    },

                }
                dataCorrespondenceReceived.stateCreateRemmiter = true;

            })
            .catch(error => {
                console.log(error)
                dataCorrespondenceReceived.dataModalConfirmation.isActive = 'hidde';

                dataCorrespondenceReceived.dataModalAlert = {
                    isActive: 'show',
                    dataText: {
                        classText: 'center',
                        text: 'an_error_has_occurred_please_try_again_later',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'continue',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                        }
                    },

                }
            })
    } else {
        dataCorrespondenceReceived.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'all_inputs_empy',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'continue',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                }
            },

        }

    }

}

async function sendDataCreateFiling() {

    if (getValidationForm('filing__container__create-filing__form')) {
        dataCorrespondenceReceived.dataFilingFlow.stateCreatedFilin = false;
        if (!dataCorrespondenceReceived.dataFilingFlow.stateViewFileAnonimous) {
            formData.append('remitter_validation', '001');
            formData.append('tracking_number', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.tracking_number);
            formData.append('subject', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.subject);
            formData.append('confidential_document', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.confidential_document ? 'true' : 'false');
            formData.append('presentation_mode', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.presentation_mode);
            formData.append('response_mode', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.response_mode);
            formData.append('remitter', dataCorrespondenceReceived.id_remitter);
            filesArrayFilingForm.value.forEach((file: any) => {
                formData.append('document', file);

            });
        } else {
            console.log('Anonimaaaaaaa');
            formData.append('remitter_validation', '002');
            formData.append('tracking_number', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.tracking_number);
            formData.append('subject', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.subject);
            formData.append('confidential_document', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.confidential_document ? 'true' : 'false');
            formData.append('presentation_mode', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.presentation_mode);
            formData.append('response_mode', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.response_mode);
            formData.append('remitter', dataCorrespondenceReceived.id_remitter);
            formData.append('address', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.address);
            formData.append('phone_number', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.phone_number);
            formData.append('email', dataCorrespondenceReceived.dataFilingFlow.dataFormFiling.email);
            filesArrayFilingForm.value.forEach((file: any) => {
                formData.append('document', file);
            });
        }
        await axios
            .post('/api/correspondence/records/', formData)
            .then((response: any) => {
                filing_code_filing.value = response.data.response.filings[0].filing_code; //Must be encapsulated for be used globaly on this component and be used
                idRecord.value = response.data.response.id;
                console.log(response);
                console.log(response.data.response.remitter);
                dataCorrespondenceReceived.dataModalConfirmation = {
                    isActive: 'show',
                    dataText: {
                        classText: 'big',
                        text: 'the_filing_was_successfully_created',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'continue',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceReceived.dataFilingFlow.stateCreatedFilin = true; //State filing created view
                            dataCorrespondenceReceived.dataModalConfirmation.isActive = 'hidde'; //Hidde modal confirmation with text-
                            dataCorrespondenceReceived.dataButtonGoToNext.text = 'assign'; //Button navigation next in to view redication flow 
                            dataCorrespondenceReceived.dataButtonGoToBack.text = 'back'; //Button navigation back in to view redication flow 
                            dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling = true; //State for view and show view Response filing.
                        }
                    },
                }
                dataCorrespondenceReceived.dataFilingFlow.dataResponse = {
                    dataImgQR: {
                        id: '',
                        name: '',
                        class: '',
                        src: urlBase.value + response.data.response.filings[0].sticker_qr,
                        type: '',
                        alt: '',
                        onClick: () => { }
                    },
                    filing_code: filing_code_filing.value,
                    filing_date: response.data.response.filings[0].filing_date,
                    remitter: response.data.response.remitter != null ? (response.data.response.remitter.contact_name != null ? response.data.response.remitter.contact_name : response.data.response.remitter.first_name + ' ' + (response.data.response.remitter.middle_name ?? '') + ' ' + response.data.response.remitter.second_last_name) : 'Persona anonima',
                    type_of_filing: response.data.response.remitter_validation.label,
                    subject: response.data.response.subject
                }
                console.log('anonimamoos: ', dataCorrespondenceReceived.dataFilingFlow.dataResponse);
                dataCorrespondenceReceived.dataFilingFlow.dataFormFiling = {
                    tracking_number: '',
                    subject: '',
                    confidential_document: '',
                    presentation_mode: '',
                    response_mode: '',
                    remitter: '',
                    address: '',
                    phone_number: '',
                    email: '',
                }
                formData = new FormData();
                dataCorrespondenceReceived.dataFilingFlow.stateViewFileAnonimous = false;
            })
            .catch(error => {
                console.log(error);

                formData = new FormData();
                console.log(error)
                dataCorrespondenceReceived.dataModalAlert = {
                    isActive: 'show',
                    dataText: {
                        classText: 'center',
                        text: 'an_error_has_occurred_please_try_again_later',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'continue',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceReceived.dataFilingFlow.stateCreatedFilin = true;
                            dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                            dataCorrespondenceReceived.stateViewFile = 'step1'; //Couldbe not used
                            dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_and_continue';
                            dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling = false;
                            dataCorrespondenceReceived.dataFilingFlow.stateViewFileAnonimous = false;
                            dataCorrespondenceReceived.dataFilingFlow.dataFormFiling = {
                                tracking_number: '',
                                subject: '',
                                confidential_document: '',
                                presentation_mode: '',
                                response_mode: '',
                                remitter: '',
                                address: '',
                                phone_number: '',
                                email: '',
                            }
                        }
                    },

                }
            })
    } else {
        dataCorrespondenceReceived.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'all_inputs_empy',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'continue',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                }
            },
        }
    }
}

/**
* TODO FUNCTIONS VALIDATIONS
*/

function validateFormAssignFiling() {
    if (getValidationForm('modal-assign-filing__content')) {
        dataCorrespondenceReceived.dataModalAssignFiling.dataEditorText.dataEditor.setData(); //Todo: Run function @ sendDataEditorModalAssignFiling() as emit
    } else {
        dataCorrespondenceReceived.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'all_inputs_empy',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'continue',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceReceived.dataModalAlert.isActive = 'hidde';
                }
            },

        }

    }

}


function openModalPdfViewer(data: any) {
    dataCorrespondenceReceived.dataModalPdfViewer = {
        isActive: 'show',
        dataButton: {
            className: '',
            text: 'close',
            disabled: false,
            onClick: () => { closeModalPdfViewer() }
        },
        dataPdfViewer: {
            urlPdf: data,
            toolbar: { toolbar: false },
            onClose: () => { }
        }

    }
}

function openModalResponseFiling() {
    dataCorrespondenceReceived.dataModalResponseFiling.isActive = true
}

function closeModalResponseFiling() {
    dataCorrespondenceReceived.dataModalResponseEditor.isActive = false
}

function openModalDocsCreateFiling() {
    // dataCorrespondenceReceived.dataModalListDocuments.isActive = true;
}

function closeModalAssignFiling() {
    dataCorrespondenceReceived.dataModalAssignFiling.isActive = false
}

function openModalAssignFiling() {
    dataCorrespondenceReceived.dataModalAssignFiling.isActive = true
}

function validateNavegationButtonBack() {
    switch (dataCorrespondenceReceived.stateViewFile) {
        case 'step1':
            dataCorrespondenceReceived.state = false;
            dataCorrespondenceReceived.dataButtonGoToNext.text = 'next';
            break;
        case 'step12':
            dataCorrespondenceReceived.stateViewFile = 'step1';
            dataCorrespondenceReceived.dataButtonGoToNext.text = 'next';
            break;
        case 'step123':
            dataCorrespondenceReceived.stateViewFile = 'step12';
            dataCorrespondenceReceived.dataButtonGoToNext.text = 'next';
            break;
        case 'step1234':


            if (dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling) {
                dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling = false;

                dataCorrespondenceReceived.dataButtonGoToBack.text = 'finish';
                dataCorrespondenceReceived.state = false;

            } else {

                dataCorrespondenceReceived.stateViewFile = 'step1';
                dataCorrespondenceReceived.dataButtonGoToBack.text = 'back';
                dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling = false;
                dataCorrespondenceReceived.dataFilingFlow.stateViewFileAnonimous = false;

            }
            break;

        default:
            break;
    }

}
function validateNavegationButtonNext() {

    switch (dataCorrespondenceReceived.stateViewFile) {
        case 'step1':
            dataCorrespondenceReceived.stateViewFile = 'step12';
            dataCorrespondenceReceived.dataButtonGoToNext.text = 'next';
            break;
        case 'step12':
            dataCorrespondenceReceived.stateViewFile = 'step123';
            dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_and_continue';
            break;
        case 'step123':
            sendDataCreateRemitter();
            break;
        case 'step1234':
            if (dataCorrespondenceReceived.dataFilingFlow.stateResponseFiling) {

                openModalAssignFiling();

            } else {
                sendDataCreateFiling();
            }



            break;
        default:
            break;
    }
}

function closeModalPdfViewer() {
    url_pdf.value = "";
    dataCorrespondenceReceived.dataModalPdfViewer.isActive = 'hidde';
    dataCorrespondenceReceived.dataModalPdfViewer.dataPdfViewer.onClose();
}

async function getCodeFilingByMenu(code: any) {
    filing_code_filing.value = code;
}


function getValidationForm(className: string) {//This function could be reused in anothers components pages
    const state: any = ref(true);//state boolean for response true or false
    const fieldsContainer: any = document.querySelector('.' + className);//Get element by class
    if (!fieldsContainer) {
        return false;
    }
    console.log(fieldsContainer);
    const inputsAndSelects = fieldsContainer.querySelectorAll('input[required], select[required]'); // update all inputs that any form need it, all inputs that its called here, must have property required

    inputsAndSelects.forEach((field: any) => {
        console.log(field.value.trim());
        field.classList.remove('empty');

        if (!field.value.trim()) {
            state.value = false;
            field.classList.add('empty');
            console.log(field.value + ' :sicas');
        }
    });
    console.log(state.value);

    return state.value;
}
/**
 * TODO FUNCTIONS REDIRECTS AND NAVEGATIONS
 */

function redirectCreateRemitter() {
    dataCorrespondenceReceived.stateViewFile = 'step123';
    dataCorrespondenceReceived.dataButtonGoToNext.text = 'create_and_continue';
}

function redirectNeWFiling() {
    dataCorrespondenceReceived.state = true;
    dataCorrespondenceReceived.stateViewFile = 'step1';
}

function redirectNeWFilingAnonimous() {
    dataCorrespondenceReceived.dataFilingFlow.stateViewFileAnonimous = true;
    dataCorrespondenceReceived.stateViewFile = 'step1234';
}

</script>



<style scoped src="./CorrespondenceReceived.page.scss"></style>