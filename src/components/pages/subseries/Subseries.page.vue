<template>
    <Subseries :dataSubseries="dataSubseries" />
</template>


<script setup lang="ts">
import Subseries from '../../templates/subseries/Subseries.template.vue'

import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import TrdServices from '../../../services/TrdServices.ts';

const router = useRouter();
const dataSubseries: any = reactive({
    stateFormCreate: false,
    data: [],
    dataForm: {
        code: '',
        name: '',
        serie: '',
        time_file_management: '',
        time_file_central: '',
        final_disposition: '',
    },
    dataButtonNewSubseries: {
        className: 'blue',
        text: 'Cargar subserie',
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
            dataSubseries.stateFormCreate = false;
        }
    },
    dataButtonNext: {
        className: 'blue',
        text: 'Cargar subserie',
        disabled: false,
        onClick: () => {
            sendDataNewSubserie();
        }
    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataSubseries.dataModalAlert.isActive = '';
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
        placeholder: 'select_serie',
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
    getSubseries();
    getSeries();
});


/**
 * todo GET & SET
 */


function getSubseries() {
    TrdServices.getSubseries()
        .then((response: any) => {
            dataSubseries.data = response;
            
        });
}
function getSeries() {
    TrdServices.getSeries()
        .then((response: any) => {
            dataSubseries.dataSelect.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}


function sendDataNewSubserie() {
    if (getValidationForm('subseries-template--form__content')) {
        const formData = new FormData; //as variable local
        formData.append('code', dataSubseries.dataForm.code);
        formData.append('name', dataSubseries.dataForm.name);
        formData.append('serie', dataSubseries.dataSelect.model);
        formData.append('time_file_management', dataSubseries.dataForm.time_file_management);
        formData.append('time_file_central', dataSubseries.dataForm.time_file_central);
        formData.append('final_disposition', dataSubseries.dataForm.final_disposition);
        TrdServices.sendSubserie(formData).then((response: any) => {
            console.log(response);
            dataSubseries.dataModalConfirmation.isActive = 'show';
            dataSubseries.dataModalConfirmation.dataText.text = 'La subserie fue creada exitosamente';
            dataSubseries.dataModalConfirmation.dataButton.onClick = () => {
                dataSubseries.stateFormCreate = false;
                hiddeModalConfirmation();
            }
        })
            .catch((error: any) => {
                console.error(error.response.data.error.details);
                dataSubseries.dataModalAlert.isActive = 'show';
                dataSubseries.dataModalAlert.dataText.text = error?.response.data.error.details?.code;
            });
    } else {
        dataSubseries.dataModalAlert.isActive = 'show';
        dataSubseries.dataModalAlert.dataText.text = 'empty_inputs';
    }

}

function setStateFormCreate() {
    dataSubseries.stateFormCreate = true;
}
function hiddeModalConfirmation() {
    dataSubseries.dataModalConfirmation.isActive = 'hidde';


}
function showModalConfirmation() {
    dataSubseries.dataModalConfirmation.isActive = 'show';
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
<style scoped src="./Subseries.page.scss"></style>
