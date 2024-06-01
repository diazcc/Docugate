<!--
    TODO COMPONENT CORRESPONDENCE RECEIVED PAGE
    ?This component has all logic and develop of correspondence on only section 'received'.
-->

<template>
    <CorrespondenceSentTemplate :dataCorrespondenceSent="dataCorrespondenceSent" @codeFiling="showMenuTableFilings"
        @user="getUser" @fileFiling="getDocumentFiling" @emitDocSelected="getFileFilingForm"
        @dataEditor="optionsDataEditor" @sendDataEditor="sendDataResponseFiling" />
</template>

<script setup lang="ts">

// IMPORTS
import axios from "axios";
import CorrespondenceSentTemplate from "../../templates/correspondence-sent/CorrespondenceSent.template.vue";
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

const filing_code_filing: any = ref('');//State for be used globaly
const urlBase: any = ref(axios.defaults.baseURL);//State for be user globaly
const url_pdf: any = ref('');//State for be user globaly
const ref_pdf: any = ref('');//State for be user globaly
const filesArrayFilingForm = ref(store.uploadedFiles);
const fileFilingForm: any = ref(null);
const fileReaderBase64: any = ref(null);
const dataListRad: any = ref('');
const idRecord: any = ref('');
const listDependences: any = ref();
let formData: FormData = new FormData(); //Formdata used for be send to endpoits
const dataCorrespondenceSent = reactive({//Structure of all components data
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
        }

    },
    state: '',//First state for show first view
    stateViewFile: '',
    stateCreateRemmiter: true,
    stateCreatedFilin: true,
    stateViewFileAnonimous: false,
    stateResponseFiling: false,
    dataButtonNewFile: {
        className: 'blue',
        text: 'Radicar nuevo',
        disabled: false,
        onClick: () => { redirectNeWFiling() }
    },
    dataButtonToSearchRemitter: {
        className: 'blue',
        text: 'Radicar nuevo',
        disabled: false,
        onClick: () => { redirectNeWFiling() }
    },
    dataButtonRedirectToSearchRemitter: {
        className: 'gray-blue',
        text: 'Buscar remitente',
        disabled: false,
        onClick: () => {
            dataCorrespondenceSent.stateViewFile = 'step12';
        }
    },
    dataButtonRedirectToCreateRemitter: {
        className: 'gray-blue',
        text: 'Crear remitente',
        disabled: false,
        onClick: () => {
            dataCorrespondenceSent.stateViewFile = 'step123';
            dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear y continuar';
        }
    },
    dataButtonRedirectToCreateFileAnonimous: {
        className: 'gray-blue',
        text: 'Radicacion anonima',
        disabled: false,
        onClick: () => {
            redirectNeWFilingAnonimous();
        }
    },
    redirectToSearchRemitter: () => {
        dataCorrespondenceSent.stateViewFile = 'step12';
    },
    redirectToCreateRemitter: () => {
        dataCorrespondenceSent.stateViewFile = 'step123'; dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear y continuar';
    },
    redirectToCreateFileAnonimous: () => { console.log('anon') },
    dataButtonGoToNext:
    {
        className: 'blue',
        text: 'Siguiente',
        disabled: false,
        onClick: () => { validateNavegationButtonNext() }
    },
    dataButtonGoToBack:
    {
        className: 'gray',
        text: 'Regresar',
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
                placeholder: 'Buscar radicados...',
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
            openFiling: () => { redirectFiling() },
            moveFiling: () => { },
            assignFiling: () => {

            },
            responseFiling: (data: any) => {
                idRecord.value = data.id
                openModalResponseFiling()
            },
        },
        openFiling: () => {

        }
    },
    dataModalPdfViewer: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
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
            text: 'Crear remitente',
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
            onClick: () => { dataCorrespondenceSent.dataModalConfirmation.isActive = 'hidde' }
        },

    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Inicio de sesión',
            disabled: false,
            onClick: () => { }
        },
        dataText: {
            classText: '',
            text: 'Esta es la descripcion',
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
        stateResponseFiling: false,
        stateCreatedFilin: true,
        stateViewFileAnonimous: false,
        dataFormFiling: {
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
                dataCorrespondenceSent.dataFilingFlow.dataInputFiles.dataModalListDocuments.isActive = true;
            },
            dataModalListDocuments: {
                isActive: false,
                closeModal: () => {
                    dataCorrespondenceSent.dataFilingFlow.dataInputFiles.dataModalListDocuments.isActive = false;
                },
            }
        },
    },
    dataModalResponseFiling: {
        isActive: false,
        dataImg: [],
        dataEditor: {
            setData: () => { }, //This function on this section must be empty because it's be called en another place
            content: '',
        },
        dataButtonCancel: {
            className: '',
            text: 'Cancelar',
            disabled: false,
            onClick: () => {
                closeModalResponseFiling()
            }
        },
        dataButtonSend: {
            className: 'blue',
            text: 'Enviar',
            disabled: false,
            onClick: () => {
                dataCorrespondenceSent.dataModalResponseFiling.dataEditor.setData();
            }
        },
        dataSelectDependence: {
            id: '',
            name: '',
            className: '',
            disabled: false,
            onClick: () => { },
            placeholder: 'Seleccionar dependencia',
            model: '',
            options: []
        }
    },
    dataModalAssignFiling: {
        isActive: false,
        dataImg: [],
        dataEditor: {
            setData: () => { }, //This function on this section must be empty because it's be called en another place
            content: '',
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
                dataCorrespondenceSent.dataModalAssignFiling.dataEditor.setData();
            }
        },
        dataSelectDependence: {
            id: '',
            name: '',
            className: '',
            disabled: false,
            onClick: () => { },
            placeholder: 'Seleccionar dependencia',
            model: '',
            options: []
        },
        dataSelectUser: {
            id: '',
            name: '',
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
 * todo METHODS
 * 
 * ?LIFE CICLES
 */


// Ciclos de vida del componente
onBeforeMount(() => { });

onMounted(() => {
    getListRad()//Call function for get all filings exist on data base.
    getUsers();
    getDependences();
});


onBeforeUpdate(() => { });

onUpdated(() => { });

onBeforeUnmount(() => { });

onUnmounted(() => {
});

watch(store.uploadedFiles, (newFiles: any, oldFiles) => {
    filesArrayFilingForm.value = [...newFiles];
    dataCorrespondenceSent.dataFilingFlow.dataInputFiles.counterFiles = filesArrayFilingForm.value.length
});

/**
 * TODO FUNCTIONS SET AND GET
 */

async function sendDataResponseFiling(data: any) {

    const formData = new FormData
    formData.append('response_sent', data)
    dataCorrespondenceSent.dataModalResponseFiling.dataButtonSend.disabled = true;
    // const response = await FilingServices.sendEditorTextData(idRecord.value, formData)
    dataCorrespondenceSent.dataModalConfirmation = {
        isActive: 'show',
        dataText: {
            classText: '',
            text: 'La respuesta ha sido enviada exitosamente.',
            disabled: false,
            onClick: () => { }
        },
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataCorrespondenceSent.dataModalConfirmation.isActive = 'hidde';
                dataCorrespondenceSent.dataModalResponseFiling.isActive = false;
                dataCorrespondenceSent.dataModalResponseFiling.dataButtonSend.disabled = false;
            }
        },

    }
}

function optionsDataEditor(instanceEditor: any) {

    const arrayActions: any = [
        {
            id: '',
            name: 'icon blockquote',
            class: 'button-img icon',
            src: '/icon-blockquote.svg',
            type: 'png',
            alt: 'blockquote',
            isActive: () => instanceEditor.isActive('blockquote'),
            onClick: () => {
                instanceEditor.chain().focus().toggleBlockquote().run()
            }
        },
        {
            id: '',
            name: 'icon bullet list',
            class: 'button-img icon',
            src: '/icon-bullet-list.svg',
            type: 'png',
            alt: 'bullet list',
            isActive: () => instanceEditor.isActive('bulletList'),
            onClick: () => {
                instanceEditor.chain().focus().toggleBulletList().run()
            }
        },
        {
            id: '',
            name: 'icon ordered list',
            class: 'button-img icon',
            src: '/icon-ordered-list.svg',
            type: 'png',
            alt: 'ordered list',
            isActive: () => instanceEditor.isActive('orderedList'),
            onClick: () => {
                instanceEditor.chain().focus().toggleOrderedList().run()
            }
        },
        {
            id: '',
            name: 'icon Heading 1',
            class: 'button-img icon',
            src: '/icon-heading1.svg',
            type: 'png',
            alt: 'Heading 1',
            isActive: () => instanceEditor.isActive('heading', { level: 1 }),
            onClick: () => {
                instanceEditor.chain().focus().toggleHeading({ level: 1 }).run()
            },

        },
        {
            id: '',
            name: 'icon Heading 2',
            class: 'button-img icon',
            src: '/icon-heading2.svg',
            type: 'png',
            alt: 'Heading 2',
            isActive: () => instanceEditor.isActive('heading', { level: 2 }),
            onClick: () => {
                instanceEditor.chain().focus().toggleHeading({ level: 2 }).run()
            }
        },
        {
            id: '',
            name: 'icon Heading 3',
            class: 'button-img icon',
            src: '/icon-heading3.svg',
            type: 'png',
            alt: 'Heading 3',
            isActive: () => instanceEditor.isActive('heading', { level: 3 }),
            onClick: () => {
                instanceEditor.chain().focus().toggleHeading({ level: 3 }).run()
            }
        },
        {
            id: '',
            name: 'icon paragrahp',
            class: 'button-img icon',
            src: '/icon-paragraph.svg',
            type: 'png',
            alt: 'paragraph',
            isActive: () => instanceEditor.isActive('paragraph'),
            onClick: () => {
                instanceEditor.chain().focus().setParagraph().run()
            }
        },
        {
            id: '',
            name: 'icon code block',
            class: 'button-img icon',
            src: '/icon-code-block.svg',
            type: 'png',
            alt: 'code block',
            isActive: () => instanceEditor.isActive('codeBlock'),
            onClick: () => {
                instanceEditor.chain().focus().toggleCodeBlock().run()
            }
        },
        {
            id: '',
            name: 'icon horizontal rule',
            class: 'button-img icon',
            src: '/icon-horizontal-rule.svg',
            type: 'png',
            alt: 'horizontal rule',
            isActive: () => instanceEditor.isActive('horizontalRule'),
            onClick: () => {
                instanceEditor.chain().focus().setHorizontalRule().run()
            }
        },
        {
            type: 'divider',
        },
        {
            id: '',
            name: 'icon Bold',
            class: 'button-img icon',
            src: '/icon-bold.svg',
            type: 'png',
            alt: 'Bold',
            isActive: () => instanceEditor.isActive('bold'),
            onClick: () => {
                instanceEditor.chain().focus().toggleBold().run()
            }
        },
        {
            id: '',
            name: 'icon italic',
            class: 'button-img icon',
            src: '/icon-italic.svg',
            type: 'png',
            alt: 'italic',
            isActive: () => instanceEditor.isActive('italic'),
            onClick: () => {
                instanceEditor.chain().focus().toggleItalic().run()
            }
        },
        {
            id: '',
            name: 'icon strike',
            class: 'button-img icon',
            src: '/icon-strike.svg',
            type: 'png',
            alt: 'strike',
            isActive: () => instanceEditor.isActive('strike'),
            onClick: () => {
                instanceEditor.chain().focus().toggleStrike().run()
            }
        },
        {
            id: '',
            name: 'icon underline',
            class: 'button-img icon',
            src: '/icon-underline.svg',
            type: 'png',
            alt: 'underline',
            isActive: () => instanceEditor.isActive('underline'),
            onClick: () => {
                instanceEditor.chain().focus().toggleUnderline().run()
            }
        },
        {
            id: '',
            name: 'icon code line',
            class: 'button-img icon',
            src: '/icon-code-line.svg',
            type: 'png',
            alt: 'CodeLine',
            isActive: () => instanceEditor.isActive('code'),
            onClick: () => {
                instanceEditor.chain().focus().toggleCode().run()
            }
        },
        {
            id: '',
            name: 'icon Highlight',
            class: 'button-img icon',
            src: '/icon-highlight.svg',
            type: 'png',
            alt: 'Highlight',
            isActive: () => instanceEditor.isActive('highlight'),
            onClick: () => {
                instanceEditor.chain().focus().toggleHighlight().run()
            }
        },
        {
            type: 'divider',
        },
        {
            id: '',
            name: 'icon text align left',
            class: 'button-img icon',
            src: '/icon-text-aling-left.svg',
            type: 'png',
            alt: 'text align left',
            isActive: () => instanceEditor.isActive({ textAlign: 'left' }),
            onClick: () => {
                instanceEditor.chain().focus().setTextAlign('left').run()
            }
        },
        {
            id: '',
            name: 'icon text aling cente',
            class: 'button-img icon',
            src: '/icon-text-aling-center.svg',
            type: 'png',
            alt: 'text aling center',
            isActive: () => instanceEditor.isActive({ textAlign: 'center' }),
            onClick: () => {
                instanceEditor.chain().focus().setTextAlign('center').run()
            }
        },
        {
            id: '',
            name: 'icon text aling right',
            class: 'button-img icon',
            src: '/icon-text-aling-right.svg',
            type: 'png',
            alt: 'text aling right',
            isActive: () => instanceEditor.isActive({ textAlign: 'right' }),
            onClick: () => {
                instanceEditor.chain().focus().setTextAlign('right').run()
            }
        },
        {
            id: '',
            name: 'icon text align justify',
            class: 'button-img icon',
            src: '/icon-text-aling-justify.svg',
            type: 'png',
            alt: 'text aling justify',
            isActive: () => instanceEditor.isActive({ textAlign: 'justify' }),
            onClick: () => {
                instanceEditor.chain().focus().setTextAlign('justify').run()
            }
        },
        {
            type: 'divider',
        },
        {
            id: '',
            name: 'icon undo',
            class: 'button-img icon',
            src: '/icon-undo.svg',
            type: 'png',
            alt: 'undo',
            onClick: () => {
                instanceEditor.chain().focus().undo().run()
            }
        },
        {
            id: '',
            name: 'icon redo',
            class: 'button-img icon',
            src: '/icon-redo.svg',
            type: 'png',
            alt: 'redo',
            onClick: () => {
                instanceEditor.chain().focus().redo().run()
            }
        },

    ]

    dataCorrespondenceSent.dataModalResponseFiling.dataImg = arrayActions;
}

async function getDependences() {
    const data: any = [];
    try {
        listDependences.value = await FilingServices.getDependences();
        listDependences.value.forEach((element: any) => {
            data.push({
                value: element.code,
                label: element.name
            });
        });
        dataCorrespondenceSent.dataModalResponseFiling.dataSelectDependence.options = data;
    } catch (error) {
        // Manejar el error aquí
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
        dataCorrespondenceSent.dataTableRemitters.data = response.data.response.results;
    }).catch(() => {

        LoginService.logOut()
    });
}
function getUser(user: any) {
    dataCorrespondenceSent.id_remitter = user;
    dataCorrespondenceSent.stateViewFile = 'step1234';
    dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear radicacion';
}

async function getListRad() {
    try {
        /**
         * todo CHECK BUG --------------------------------------------
         
        const response = await UserServices.getRecordsSent();
        console.log(response);
        
        dataCorrespondenceSent.dataTableCorrespondenceReceived.data = response.results.map((data: any) => ({
            ...data,
            isMenuOpen: false // Añade la propiedad isMenuOpen inicializada en false a cada objeto.
        }));
        *    todo------------------------------------------------------
        */
    } catch (error) {
        console.error('Error fetching data:', error);
        LoginService.logOut();
    }
    console.log(dataCorrespondenceSent.dataTableCorrespondenceReceived.data);
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
        dataCorrespondenceSent.stateCreateRemmiter = false;
        switch (dataCorrespondenceSent.dataCreateRemitterForm.data.person_typeRemitter) {
            case '001':
                data.value = {
                    person_type: dataCorrespondenceSent.dataCreateRemitterForm.data.person_typeRemitter,
                    first_name: dataCorrespondenceSent.dataCreateRemitterForm.data.first_name,
                    middle_name: dataCorrespondenceSent.dataCreateRemitterForm.data.middle_name,
                    last_name: dataCorrespondenceSent.dataCreateRemitterForm.data.last_name,
                    second_last_name: dataCorrespondenceSent.dataCreateRemitterForm.data.second_last_name,
                    identification_type: dataCorrespondenceSent.dataCreateRemitterForm.data.identification_typeNatural,
                    identification_number: dataCorrespondenceSent.dataCreateRemitterForm.data.identification_number,
                    country: dataCorrespondenceSent.dataCreateRemitterForm.data.country,
                    department: dataCorrespondenceSent.dataCreateRemitterForm.data.department,
                    city: dataCorrespondenceSent.dataCreateRemitterForm.data.city,
                    address: dataCorrespondenceSent.dataCreateRemitterForm.data.address,
                    phone_number: dataCorrespondenceSent.dataCreateRemitterForm.data.phone_number,
                    email: dataCorrespondenceSent.dataCreateRemitterForm.data.email
                };
                break;
            case '002':
                data.value = {
                    person_type: dataCorrespondenceSent.dataCreateRemitterForm.data.person_typeRemitter,
                    contact_name: dataCorrespondenceSent.dataCreateRemitterForm.data.contact_name,
                    social_reason: dataCorrespondenceSent.dataCreateRemitterForm.data.social_reason,
                    nit_number: dataCorrespondenceSent.dataCreateRemitterForm.data.nit_number,
                    country: dataCorrespondenceSent.dataCreateRemitterForm.data.country,
                    department: dataCorrespondenceSent.dataCreateRemitterForm.data.department,
                    city: dataCorrespondenceSent.dataCreateRemitterForm.data.city,
                    address: dataCorrespondenceSent.dataCreateRemitterForm.data.address,
                    phone_number: dataCorrespondenceSent.dataCreateRemitterForm.data.phone_number,
                    email: dataCorrespondenceSent.dataCreateRemitterForm.data.email
                };
                break;
            case '003':
                data.value = {
                    person_type: dataCorrespondenceSent.dataCreateRemitterForm.data.person_typeNatural,
                    first_name: dataCorrespondenceSent.dataCreateRemitterForm.data.first_name,
                    middle_name: dataCorrespondenceSent.dataCreateRemitterForm.data.middle_name,
                    last_name: dataCorrespondenceSent.dataCreateRemitterForm.data.last_name,
                    second_last_name: dataCorrespondenceSent.dataCreateRemitterForm.data.second_last_name,
                    identification_type: dataCorrespondenceSent.dataCreateRemitterForm.data.identification_typeNatural,
                    identification_number: dataCorrespondenceSent.dataCreateRemitterForm.data.identification_number,
                    country: dataCorrespondenceSent.dataCreateRemitterForm.data.country,
                    department: dataCorrespondenceSent.dataCreateRemitterForm.data.department,
                    city: dataCorrespondenceSent.dataCreateRemitterForm.data.city,
                    address: dataCorrespondenceSent.dataCreateRemitterForm.data.address,
                    phone_number: dataCorrespondenceSent.dataCreateRemitterForm.data.phone_number,
                    email: dataCorrespondenceSent.dataCreateRemitterForm.data.email
                };
                break;

            default:
                break;
        }
        console.log(data);
        await axios
            .post('/api/correspondence/remitters/', data.value)
            .then((response: any) => {
                console.log(response.data.data.id);
                dataCorrespondenceSent.id_remitter = response.data.data.id;
                dataCorrespondenceSent.dataCreateRemitterForm.data = {
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
                dataCorrespondenceSent.dataModalConfirmation = {
                    isActive: 'show',
                    dataText: {
                        classText: 'big',
                        text: 'El remitente fue creado exitosamente',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'Continuar',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceSent.dataModalConfirmation.isActive = 'hidde';
                            dataCorrespondenceSent.stateViewFile = 'step1234';
                            dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear radicacion';
                        }
                    },

                }
                dataCorrespondenceSent.stateCreateRemmiter = true;

            })
            .catch(error => {
                console.log(error)
                dataCorrespondenceSent.dataModalConfirmation.isActive = 'hidde';
            })
    } else {
        dataCorrespondenceSent.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'No has llenado alguno de los campos requeridos.',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'Continuar',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceSent.dataModalAlert.isActive = 'hidde';
                }
            },

        }

    }

}

async function sendDataCreateFiling() {

    if (getValidationForm('filing__container__create-filing__form')) {
        dataCorrespondenceSent.dataFilingFlow.stateCreatedFilin = false;
        if (!dataCorrespondenceSent.dataFilingFlow.stateViewFileAnonimous) {
            formData.append('type_of_filing', '001');
            formData.append('tracking_number', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.tracking_number);
            formData.append('subject', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.subject);
            formData.append('confidential_document', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.confidential_document ? 'true' : 'false');
            formData.append('legal_representative', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.legal_representative);
            formData.append('presentation_mode', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.presentation_mode);
            formData.append('response_mode', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.response_mode);
            formData.append('remitter', dataCorrespondenceSent.id_remitter);
            filesArrayFilingForm.value.forEach((file: any) => {
                formData.append('document', file);

            });
        } else {
            console.log('Anonimaaaaaaa');
            formData.append('type_of_filing', '002');
            formData.append('tracking_number', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.tracking_number);
            formData.append('subject', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.subject);
            formData.append('confidential_document', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.confidential_document ? 'true' : 'false');
            formData.append('legal_representative', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.legal_representative);
            formData.append('presentation_mode', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.presentation_mode);
            formData.append('response_mode', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.response_mode);
            formData.append('remitter', dataCorrespondenceSent.id_remitter);
            formData.append('address', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.address);
            formData.append('phone_number', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.phone_number);
            formData.append('email', dataCorrespondenceSent.dataFilingFlow.dataFormFiling.email);
            filesArrayFilingForm.value.forEach((file: any) => {
                formData.append('document', file);
                console.log();

            });
        }
        await axios
            .post('/api/correspondence/records/', formData)
            .then((response: any) => {
                console.log(response);
                console.log(response.data.response.remitter);
                dataCorrespondenceSent.dataModalConfirmation = {
                    isActive: 'show',
                    dataText: {
                        classText: 'big',
                        text: 'La radicacion fue creada exitosamente',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'Continuar',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceSent.dataFilingFlow.stateCreatedFilin = true; //State filing created view
                            dataCorrespondenceSent.dataModalConfirmation.isActive = 'hidde'; //Hidde modal confirmation with text-
                            // dataCorrespondenceSent.dataButtonGoToNext.text = 'Enviar radicado'; //Button navigation next in to view redication flow 
                            dataCorrespondenceSent.dataButtonGoToBack.text = 'Regresar'; //Button navigation back in to view redication flow 
                            dataCorrespondenceSent.dataFilingFlow.stateResponseFiling = true; //State for view and show view Response filing.
                        }
                    },
                }
                dataCorrespondenceSent.dataFilingFlow.dataResponse = {
                    dataImgQR: {
                        id: '',
                        name: '',
                        class: '',
                        src: urlBase.value + response.data.response.filings[0].sticker_qr,
                        type: '',
                        alt: '',
                        onClick: () => { }
                    },
                    filing_code: response.data.response.filings[0].filing_code,
                    filing_date: response.data.response.filings[0].filing_date,
                    remitter: response.data.response.remitter != null ? (response.data.response.remitter.contact_name != null ? response.data.response.remitter.contact_name : response.data.response.remitter.first_name + ' ' + (response.data.response.remitter.middle_name ?? '') + ' ' + response.data.response.remitter.second_last_name) : 'Persona anonima',
                    type_of_filing: response.data.response.type_of_filing.label,
                    subject: response.data.response.subject
                }
                console.log('anonimamoos: ', dataCorrespondenceSent.dataFilingFlow.dataResponse);
                dataCorrespondenceSent.dataFilingFlow.dataFormFiling = {
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
                }
                formData = new FormData();
                dataCorrespondenceSent.dataFilingFlow.stateViewFileAnonimous = false;
            })
            .catch(error => {
                console.log(error);

                formData = new FormData();
                console.log(error)
                dataCorrespondenceSent.dataModalAlert = {
                    isActive: 'show',
                    dataText: {
                        classText: 'center',
                        text: 'Ha surgido un error, por favor intentalo de nuevo mas tarde.',
                        disabled: false,
                        onClick: () => { }
                    },
                    dataButton: {
                        className: 'blue',
                        text: 'Continuar',
                        disabled: false,
                        onClick: () => {
                            dataCorrespondenceSent.dataFilingFlow.stateCreatedFilin = true;
                            dataCorrespondenceSent.dataModalAlert.isActive = 'hidde';
                            dataCorrespondenceSent.stateViewFile = 'step1';
                            dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear y continuar';
                            dataCorrespondenceSent.dataFilingFlow.stateResponseFiling = false;
                            dataCorrespondenceSent.dataFilingFlow.stateViewFileAnonimous = false;
                            dataCorrespondenceSent.dataFilingFlow.dataFormFiling = {
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
                            }
                        }
                    },

                }
            })
    } else {
        dataCorrespondenceSent.dataModalAlert = {
            isActive: 'show',
            dataText: {
                classText: 'center',
                text: 'No has llenado alguno de los campos requeridos.',
                disabled: false,
                onClick: () => { }
            },
            dataButton: {
                className: 'blue',
                text: 'Continuar',
                disabled: false,
                onClick: () => {
                    dataCorrespondenceSent.dataModalAlert.isActive = 'hidde';
                }
            },
        }
    }
}

/**
* TODO FUNCTIONS VALIDATIONS
*/

function redirectFiling() {
    router.push('/home/filing/' + filing_code_filing.value);
}

function openModalPdfViewer(data: any) {
    dataCorrespondenceSent.dataModalPdfViewer = {
        isActive: 'show',
        dataButton: {
            className: '',
            text: 'Cerrar',
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
function closeModalAssignFiling() {
    dataCorrespondenceSent.dataModalAssignFiling.isActive = false
}

function openModalAssignFiling() {
    dataCorrespondenceSent.dataModalAssignFiling.isActive = true
}


function openModalDocsCreateFiling() {
    // dataCorrespondenceSent.dataModalListDocuments.isActive = true;
}

function closeModalResponseFiling() {
    dataCorrespondenceSent.dataModalResponseFiling.isActive = false
}

function openModalResponseFiling() {
    console.log('opopop');
    dataCorrespondenceSent.dataModalResponseFiling.isActive = true
}

function validateNavegationButtonBack() {
    switch (dataCorrespondenceSent.stateViewFile) {
        case 'step1':
            dataCorrespondenceSent.state = '';
            dataCorrespondenceSent.dataButtonGoToNext.text = 'Siguiente';
            break;
        case 'step12':
            dataCorrespondenceSent.stateViewFile = 'step1';
            dataCorrespondenceSent.dataButtonGoToNext.text = 'Siguiente';
            break;
        case 'step123':
            dataCorrespondenceSent.stateViewFile = 'step12';
            dataCorrespondenceSent.dataButtonGoToNext.text = 'Siguiente';
            break;
        case 'step1234':


            if (dataCorrespondenceSent.dataFilingFlow.stateResponseFiling) {
                dataCorrespondenceSent.dataFilingFlow.stateResponseFiling = false;

                dataCorrespondenceSent.dataButtonGoToBack.text = 'Finalizar';
                dataCorrespondenceSent.state = '';

            } else {

                dataCorrespondenceSent.stateViewFile = 'step1';
                dataCorrespondenceSent.dataButtonGoToBack.text = 'Regresar';
                dataCorrespondenceSent.dataFilingFlow.stateResponseFiling = false;
                dataCorrespondenceSent.dataFilingFlow.stateViewFileAnonimous = false;

            }
            break;

        default:
            break;
    }

}
function validateNavegationButtonNext() {

    switch (dataCorrespondenceSent.stateViewFile) {
        case 'step1':
            dataCorrespondenceSent.stateViewFile = 'step12';
            dataCorrespondenceSent.dataButtonGoToNext.text = 'Siguiente';
            break;
        case 'step12':
            dataCorrespondenceSent.stateViewFile = 'step123';
            dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear y continuar';
            break;
        case 'step123':
            sendDataCreateRemitter();
            break;
        case 'step1234':
            console.log('sssssssssssSsSs');
            sendDataCreateFiling();


            break;
        default:
            break;
    }
}

function closeModalPdfViewer() {
    url_pdf.value = "";
    dataCorrespondenceSent.dataModalPdfViewer.isActive = 'hidde';
    dataCorrespondenceSent.dataModalPdfViewer.dataPdfViewer.onClose();
}

async function showMenuTableFilings(code: any) {
    filing_code_filing.value = code;
}


function getValidationForm(className: string) {//This function could be reused in anothers components pages
    const state: any = ref(false);//state boolean for response true or false
    const fieldsContainer: any = document.querySelector('.' + className);//Get element by class
    if (!fieldsContainer) {
        return false;
    }

    const inputsAndSelects = fieldsContainer.querySelectorAll('input[required], select[required]');
    inputsAndSelects.forEach((field: any) => {
        console.log(field);
        field.classList.remove('empty');

        if (!field.value) {
            console.log(field);
            state.value = false;
            field.classList.add('empty');
            console.log(field.value + ' :sicas');
            setTimeout(() => field.classList.remove('empty'), 2000);
        } else {
            console.log('falso');

            state.value = true;
        }
    });

    return state.value;
}
/**
 * TODO FUNCTIONS REDIRECTS AND NAVEGATIONS
 */

function redirectCreateRemitter() {
    dataCorrespondenceSent.stateViewFile = 'step123';
    dataCorrespondenceSent.dataButtonGoToNext.text = 'Crear y continuar';
}

function redirectNeWFiling() {
    dataCorrespondenceSent.state = 'viewNewFile';
    dataCorrespondenceSent.stateViewFile = 'step1';
}

function redirectNeWFilingAnonimous() {
    dataCorrespondenceSent.dataFilingFlow.stateViewFileAnonimous = true;
    dataCorrespondenceSent.stateViewFile = 'step1234';
}

</script>



<style scoped src="./CorrespondenceSent.page.scss"></style>