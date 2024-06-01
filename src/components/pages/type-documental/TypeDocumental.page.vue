<template>
    <TypeDocumentalTemplate :dataDocumentaryType="dataDocumentaryType" />
</template>

<script setup lang="ts">
import TypeDocumentalTemplate from '../../templates/type-documental/TypeDocumental.template.vue'
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import TrdServices from '../../../services/TrdServices.ts';

const router = useRouter();
const dataDocumentaryType: any = reactive({
    stateFormCreate: false,
    data: [],
    dataForm: {
        name_document_type: '',
        processing_time: '',
        type_processing_time: '',
        type_of_filing: '',
    },
    dataButtonNewDocumentaryTypes: {
        className: 'blue',
        text: 'Cargar tipo documental',
        disabled: false,
        onClick: () => {
            setStateFormCreate();
        }
    },
    dataButtonBack: {
        className: 'gray',
        text: 'Regresar',
        disabled: false,
        onClick: () => {
            dataDocumentaryType.stateFormCreate = false;
        }
    },
    dataButtonNext: {
        className: 'blue',
        text: 'Cargar tipo documental',
        disabled: false,
        onClick: () => {
            sendDataNewDocumentaryType();
        }
    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataDocumentaryType.dataModalAlert.isActive = '';
            }
        },
        dataText: {
            classText: '',
            text: '',
            disabled: false,
            onClick: () => { }
        }
    },
    dataSelect: {
        id: '',
        name: '',
        className: '',
        disabled: false,
        onChange: (data: any) => {

        },
        onClick: () => { },
        placeholder: 'select_documentary_type',
        model: '',
        options: [
            {
                value: '',
                label: ''
            }
        ]
    },
    dataModalConfirmation: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'continue',
            disabled: false,
            onClick: () => {
                showModalConfirmation();
            }
        },
        dataText: {
            classText: '',
            text: 'Error, intentalo mas tarde.',
            disabled: false,
            onClick: () => { }
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

    }
});

onMounted(() => {
    getDocumentaryType();
});


/**
 * todo GET & SET
 */


function getDocumentaryType() {
    TrdServices.getDocumentaryType()
        .then((response: any) => {
            dataDocumentaryType.data = response;
            dataDocumentaryType.dataSelect.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}

function sendDataNewDocumentaryType() {
    if (getValidationForm('documentary-type--form__content')) {
        const formData = new FormData; //as variable local
        formData.append('name_document_type', dataDocumentaryType.dataForm.name_document_type);
        formData.append('processing_time', dataDocumentaryType.dataForm.processing_time);
        formData.append('type_processing_time', dataDocumentaryType.dataForm.type_processing_time);
        formData.append('type_of_filing', dataDocumentaryType.dataForm.type_of_filing);
        TrdServices.sendDocumentaryType(formData).then((response: any) => {
            console.log(response);
            dataDocumentaryType.dataModalConfirmation.isActive = 'show';
            dataDocumentaryType.dataModalConfirmation.dataText.text = 'La serie fue creada exitosamente';
            dataDocumentaryType.dataModalConfirmation.dataButton.onClick = () => {
                dataDocumentaryType.stateFormCreate = false;
                hiddeModalConfirmation();
                dataDocumentaryType.dataModalConfirmation.dataText.text = 'Error, por favor intentalo mas tarde.';

            }
        })
            .catch((error: any) => {
                console.error(error.response.data.error.details);
                dataDocumentaryType.dataModalAlert.isActive = 'show';
                dataDocumentaryType.dataModalAlert.dataText.text = error?.response.data.error.details?.code;
            });
    } else {
        dataDocumentaryType.dataModalAlert.isActive = 'show';
        dataDocumentaryType.dataModalAlert.dataText.text = 'empty_inputs';
    }

}

function setStateFormCreate() {
    dataDocumentaryType.stateFormCreate = true;
}
function hiddeModalConfirmation() {
    dataDocumentaryType.dataModalConfirmation.isActive = 'hidde';


}
function showModalConfirmation() {
    dataDocumentaryType.dataModalConfirmation.isActive = 'show';
}

function getValidationForm(className: string) {
    //This function could be reused in anothers components pages
    /**
     * todo This function require structure html as:
     * * class_name>li>inputs && select -- this elements must get property require to be detected.
     */
    const state: any = ref(true); //state boolean for response true or false
    const fieldsContainer: any = document.querySelector("." + className); //Get element by class
    if (!fieldsContainer) {
        return false;
    }

    const inputsAndSelects = fieldsContainer.querySelectorAll(
        "input[required], select[required]"
    );
    inputsAndSelects.forEach((field: any) => {
        field.classList.remove("empty");
        console.log(field.value);
        if (!field.value.trim()) {
            state.value = false;
            field.classList.add("empty");
        }
    });

    return state.value;
}
</script>
<style scoped src="./TypeDocumental.page.scss"></style>
