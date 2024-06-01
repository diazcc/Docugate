<template>
    <Series :dataSeries="dataSeries"/>
</template>

<script setup lang="ts">
import Series from '../../templates/series/Series.template.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import TrdServices from '../../../services/TrdServices.ts';

const router = useRouter();
const dataSeries: any = reactive({
    stateFormCreate: false,
    data: [],
    dataForm: {
        code: '',
        name: '',
    },
    dataButtonNewSeries: {
        className: 'blue',
        text: 'Cargar serie',
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
            dataSeries.stateFormCreate = false;
        }
    },
    dataButtonNext: {
        className: 'blue',
        text: 'Cargar serie',
        disabled: false,
        onClick: () => {
            sendDataNewSerie();
        }
    },
    dataModalAlert: {
        isActive: '',
        dataButton: {
            className: '',
            text: 'Cerrar',
            disabled: false,
            onClick: () => {
                dataSeries.dataModalAlert.isActive = '';
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
    getSeries();
});


/**
 * todo GET & SET
 */


function getSeries() {
    TrdServices.getSeries()
        .then((response: any) => {
            dataSeries.data = response;
            dataSeries.dataSelect.options = response.map((value: any) => ({
                value: value.code,
                label: value.name
            }))
        });
}

function sendDataNewSerie() {
    if (getValidationForm('series-template--form__content')) {
        const formData = new FormData; //as variable local
        formData.append('code', dataSeries.dataForm.code);
        formData.append('name', dataSeries.dataForm.name);
        TrdServices.sendSerie(formData).then((response: any) => {
            console.log(response);
            dataSeries.dataModalConfirmation.isActive = 'show';
            dataSeries.dataModalConfirmation.dataText.text = 'La serie fue creada exitosamente';
            dataSeries.dataModalConfirmation.dataButton.onClick = () => {
                dataSeries.stateFormCreate = false;
                hiddeModalConfirmation();
            }
        })
            .catch((error: any) => {
                console.error(error.response.data.error.details);
                dataSeries.dataModalAlert.isActive = 'show';
                dataSeries.dataModalAlert.dataText.text = error?.response.data.error.details?.code;
            });
    } else {
        dataSeries.dataModalAlert.isActive = 'show';
        dataSeries.dataModalAlert.dataText.text = 'empty_inputs';
    }

}

function setStateFormCreate() {
    dataSeries.stateFormCreate = true;
}
function hiddeModalConfirmation() {
    dataSeries.dataModalConfirmation.isActive = 'hidde';


}
function showModalConfirmation() {
    dataSeries.dataModalConfirmation.isActive = 'show';
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
<style scoped src="./Series.page.scss"></style>
