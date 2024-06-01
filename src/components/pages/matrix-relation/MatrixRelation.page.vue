<template>
    <MatrixRelationTemplate :dataRelationshipMatrix="dataRelationshipMatrix" />
</template>

<script setup lang="ts">
import MatrixRelationTemplate from '../../templates/matrix-relation/MatrixRelation.template.vue'

import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import TrdServices from '../../../services/TrdServices.ts';
import DependenceServices from '../../../services/DependenceServices.ts';

const router = useRouter();
const dataRelationshipMatrix: any = reactive({
    stateFormCreate: false,
    dataForm: {
        code: '',
        name: '',
        serie: '',
        time_file_management: '',
        time_file_central: '',
        final_disposition: '',
    },
    dataButtonNext: {
        className: 'blue',
        text: 'Cargar relationship matrix',
        disabled: false,
        onClick: () => {
            sendDataNewRelationshipMatrix();
            console.log('pruebasas');

        }
    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataRelationshipMatrix.dataModalAlert.isActive = '';
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
            dataRelationshipMatrix.data = response;
            dataRelationshipMatrix.dataSelectSerie.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}
function getDocumentaryType() {
    TrdServices.getDocumentaryType()
        .then((response: any) => {
            console.log(response);
            dataRelationshipMatrix.data = response;
            dataRelationshipMatrix.dataSelectDocumentaryType.options = response.map((value: any) => ({
                value: value.id,
                label: value.name_document_type
            }))
        });
}
function getSubseries() {
    TrdServices.getSubseries()
        .then((response: any) => {
            dataRelationshipMatrix.data = response;
            dataRelationshipMatrix.dataSelectSubserie.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}


function getDependences() {
    DependenceServices.getAllDependences()
        .then((response: any) => {
            dataRelationshipMatrix.data = response;
            dataRelationshipMatrix.dataSelectDependence.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}

function sendDataNewRelationshipMatrix() {
    if (getValidationForm('relationship-matrix-template--form__content')) {
        const formData = new FormData; //as variable local
        formData.append('dependence', dataRelationshipMatrix.dataSelectDependence.model);
        formData.append('serie', dataRelationshipMatrix.dataSelectSerie.model);
        formData.append('sub_serie', dataRelationshipMatrix.dataSelectSubserie.model);
        formData.append('documentary_type', dataRelationshipMatrix.dataSelectDocumentaryType.model);
        TrdServices.sendRelationshipMatrix(formData).then((response: any) => {
            console.log(response);
            dataRelationshipMatrix.dataModalConfirmation.isActive = 'show';
            dataRelationshipMatrix.dataModalConfirmation.dataText.text = 'La relationship matrix fue creada exitosamente';
            dataRelationshipMatrix.dataModalConfirmation.dataButton.onClick = () => {
                dataRelationshipMatrix.stateFormCreate = false;
                hiddeModalConfirmation();
                dataRelationshipMatrix.dataSelectDependence.model = '';
                dataRelationshipMatrix.dataSelectSerie.model = '';
                dataRelationshipMatrix.dataSelectSubserie.model = '';
                dataRelationshipMatrix.dataSelectDocumentaryType.model = '';
            }
        })
            .catch((error: any) => {
                console.error(error.response.data.error.details);
                dataRelationshipMatrix.dataModalAlert.isActive = 'show';
                dataRelationshipMatrix.dataModalAlert.dataText.text = error?.response.data.error.details?.code;
            });
    } else {
        dataRelationshipMatrix.dataModalAlert.isActive = 'show';
        dataRelationshipMatrix.dataModalAlert.dataText.text = 'empty_inputs';
    }

}

function setStateFormCreate() {
    dataRelationshipMatrix.stateFormCreate = true;
}
function hiddeModalConfirmation() {
    dataRelationshipMatrix.dataModalConfirmation.isActive = 'hidde';


}
function showModalConfirmation() {
    dataRelationshipMatrix.dataModalConfirmation.isActive = 'show';
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
