<template>
    <UploadFilesTemplate :dataUploadFiles="dataUploadFiles" />
</template>

<script setup lang="ts">
import UploadFilesTemplate from '../../templates/upload-files/UploadFiles.template.vue'
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import TrdServices from '../../../services/TrdServices.ts';
import DependenceServices from '../../../services/DependenceServices.ts';

const router = useRouter();
const dataUploadFiles: any = reactive({
    stateFormCreate: false,
    stateFormUniqueFile: false,
    stateFormManyFiles: false,
    dataForm: {
        code: '',
        name: '',
        serie: '',
        time_file_management: '',
        time_file_central: '',
        final_disposition: '',
    },
    dataButtonUploadFile: {
        className: 'gray-blue',
        text: 'upload_file',
        disabled: false,
        onClick: () => {
            setStateFormUniqueFile()
        }
    },
    dataButtonUploadManyFiles: {
        className: 'gray-blue',
        text: 'upload_many_files',
        disabled: false,
        onClick: () => {
            setStateFormManyFiles()
        }
    },
    dataButtonNext: {
        className: 'blue',
        text: 'send',
        disabled: false,
        onClick: () => {
            
        }
    },
    dataButtonBack: {
        className: 'gray',
        text: 'back',
        disabled: false,
        onClick: () => {
            setStatesBack()
        }
    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataUploadFiles.dataModalAlert.isActive = '';
            }
        },
        dataText: {
            classText: '',
            text: '',
            disabled: false,
            onClick: () => { }
        }
    },
    dataSelectDependence: {
        id: '',
        name: '',
        className: '',
        disabled: false,
        onChange: (data: any) => {

        },
        onClick: () => { },
        placeholder: 'select_dependence',
        model: '',
        options: [
            {
                value: '',
                label: ''
            }
        ]
    },
    dataSelectSerie: {
        id: '',
        name: '',
        className: '',
        disabled: false,
        onChange: (data: any) => {

        },
        onClick: () => { },
        placeholder: 'select_serie',
        model: '',
        options: [
            {
                value: '',
                label: ''
            }
        ]
    },
    dataSelectSubserie: {
        id: '',
        name: '',
        className: '',
        disabled: false,
        onChange: (data: any) => {

        },
        onClick: () => { },
        placeholder: 'select_subserie',
        model: '',
        options: [
            {
                value: '',
                label: ''
            }
        ]
    },
    dataSelectDocumentaryType: {
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
    }
});

onMounted(() => {
    getSeries();
    getDependences();
    getSubseries();
    getDocumentaryType();
});


/**
 * todo GET & SET
 */


function getSeries() {
    TrdServices.getSeries()
        .then((response: any) => {
            dataUploadFiles.data = response;
            dataUploadFiles.dataSelectSerie.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}
function getDocumentaryType() {
    TrdServices.getDocumentaryType()
        .then((response: any) => {
            console.log(response);
            dataUploadFiles.data = response;
            dataUploadFiles.dataSelectDocumentaryType.options = response.map((value: any) => ({
                value: value.id,
                label: value.name_document_type
            }))
        });
}
function getSubseries() {
    TrdServices.getSubseries()
        .then((response: any) => {
            dataUploadFiles.data = response;
            dataUploadFiles.dataSelectSubserie.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}


function getDependences() {
    DependenceServices.getAllDependences()
        .then((response: any) => {
            dataUploadFiles.data = response;
            dataUploadFiles.dataSelectDependence.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}

function sendDataNewRelationshipMatrix() {
    if (getValidationForm('relationship-matrix-template--form__content')) {
        const formData = new FormData; //as variable local
        formData.append('dependence', dataUploadFiles.dataSelectDependence.model);
        formData.append('serie', dataUploadFiles.dataSelectSerie.model);
        formData.append('sub_serie', dataUploadFiles.dataSelectSubserie.model);
        formData.append('documentary_type', dataUploadFiles.dataSelectDocumentaryType.model);
        TrdServices.sendRelationshipMatrix(formData).then((response: any) => {
            console.log(response);
            dataUploadFiles.dataModalConfirmation.isActive = 'show';
            dataUploadFiles.dataModalConfirmation.dataText.text = 'La relationship matrix fue creada exitosamente';
            dataUploadFiles.dataModalConfirmation.dataButton.onClick = () => {
                dataUploadFiles.stateFormCreate = false;
                hiddeModalConfirmation();
                dataUploadFiles.dataSelectDependence.model = '';
                dataUploadFiles.dataSelectSerie.model = '';
                dataUploadFiles.dataSelectSubserie.model = '';
                dataUploadFiles.dataSelectDocumentaryType.model = '';
            }
        })
            .catch((error: any) => {
                console.error(error.response.data.error.details);
                dataUploadFiles.dataModalAlert.isActive = 'show';
                dataUploadFiles.dataModalAlert.dataText.text = error?.response.data.error.details?.code;
            });
    } else {
        dataUploadFiles.dataModalAlert.isActive = 'show';
        dataUploadFiles.dataModalAlert.dataText.text = 'empty_inputs';
    }

}

function setStateFormCreate() {
    dataUploadFiles.stateFormCreate = true;
}

function setStateFormUniqueFile() {
    dataUploadFiles.stateFormUniqueFile = true;
    dataUploadFiles.stateFormManyFiles = false;
}
function setStateFormManyFiles() {
    dataUploadFiles.stateFormManyFiles = true;
    dataUploadFiles.stateFormUniqueFile = false;
}
function hiddeModalConfirmation() {
    dataUploadFiles.dataModalConfirmation.isActive = 'hidde';
}
function showModalConfirmation() {
    dataUploadFiles.dataModalConfirmation.isActive = 'show';
}

function setStatesBack(){
    dataUploadFiles.stateFormUniqueFile=false;
    dataUploadFiles.stateFormManyFiles=false;
}

function getValidationForm(className: string) {

    console.log('asdsadsandsandasjdnsajdna');

    //This function could be reused in anothers components pages
    /**
     * todo This function require structure html as:
     * * class_name>li>inputs && select -- this elements must get property require to be detected.
     */
    const state: any = ref(true); //state boolean for response true or false

    const fieldsContainer: any = document.querySelector("." + className); //Get element by class
    console.log(fieldsContainer);
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


<style scoped src="./UploadFiles.page.scss"></style>
