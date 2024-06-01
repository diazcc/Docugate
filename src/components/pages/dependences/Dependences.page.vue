<!--
    TODO COMPONENT CORRESPONDENCE RECEIVED PAGE
    ?This component has all logic and develop of correspondence on only section 'received'.
-->

<template>
  <DependenceTemplate :dataDependence="dataDependence" />
</template>

<script setup lang="ts">
// IMPORTS
import axios from "axios";
import DependenceTemplate from "../../templates/dependences/Dependences.template.vue";
import {
  onMounted,
  reactive,
  ref,
} from "vue";
import LoginService from "../../../services/testService"; //!This services must be deleted or modified name
import DependenceService from "../../../services/DependenceServices";
import { accessStore } from "../../../store";
import { useRouter } from "vue-router";
const router = useRouter();
const store = accessStore();

// VARIABLES OR STATES
/**
 * TODO HERE DEFINE VALUES DEFAULT
 */
let formData: FormData = new FormData(); //Formdata used for be send to endpoits
const dataDependence = reactive({
  //Structure of all components data
  id_dependence: "id_dependence",
  dataCreateDependenceForm: {
    stateCreateDependence: true,
    data: {
      code: "",
      name: "",
      parent_dependency: "",
      state: "",
    },
  },
  state: "", //First state for show first view
  stateViewFile: "",

  stateCreateDependence: true,

  dataButtonNewDependence: {
    className: "blue",
    text: "create_new_dependence",
    disabled: false,
    onClick: () => {
      redirectNewDependence();
    },
  },


  dataButtonRedirectToCreateDependence: {
    className: "gray-blue",
    text: "create_dependence",
    disabled: false,
    onClick: () => {
      dataDependence.stateViewFile = "step123";
      dataDependence.dataButtonGoToNext.text =
        "create_and_continue";
    },
  },

  dataButtonGoToNext: {
    className: "blue",
    text: "following",
    disabled: false,
    onClick: () => {
      validateNavegationButtonNext();
    },
  },
  dataButtonGoToBack: {
    className: "gray",
    text: "back",
    disabled: false,
    onClick: () => {

      router.push('/home/dependences');
      validateNavegationButtonBack();
    },
  },
  dataTableDependence: {
    data: [],
    dataInputSearch: {
      dataInput: {
        id: "",
        name: "",
        classInputEmail: "",
        model: "",
        type: "text",
        placeholder: "search_dependence",
        disabled: false,
        required: false,
        onClick: () => { },
      },
      dataImg: {
        id: "",
        name: "",
        class: " icon",
        src: "/src/assets/svg/icon-lupa-general.svg",
        type: "",
        alt: "",
        onClick: () => { },
      },
    },

  },

  dataTableDependences: {
    data: [],
    dataButton: {
      className: "blue",
      text: "create_dependence",
      disabled: false,
      onClick: () => {
        redirectCreateDependence();
      },
    },

  },
  dataModalConfirmation: {
    isActive: "",
    dataText: {
      classText: "",
      text: "",
      disabled: false,
      onClick: () => { },
    },
    dataButton: {
      className: "",
      text: "h",
      disabled: false,
      onClick: () => {
        dataDependence.dataModalConfirmation.isActive = "hidde";
      },
    },
  },
  dataModalAlert: {
    isActive: "",
    dataButton: {
      className: "",
      text: "login",
      disabled: false,
      onClick: () => { },
    },
    dataText: {
      classText: "",
      text: "this_is_the_description",
      disabled: false,
      onClick: () => { },
    },
  },

  dataRadicationFlow: {
    stateResponseFiling: false,
    //This works with line 47 in template
  },

});

/**
 * todo METHODS
 *
 * ?LIFE CICLES
 */

// Ciclos de vida del componente
onMounted(() => {
  getList(); //Call function for get all dependences exist on data base.
});

/**
 * TODO FUNCTIONS SET AND GET
 */


async function getList() {
  try { 
    const response = await DependenceService.getAllDependences();
    dataDependence.dataTableDependence.data =
      response.map((data: any) => ({
        ...data,
        isMenuOpen: false, // Añade la propiedad isMenuOpen inicializada en false a cada objeto.
      }));
  } catch (error) {
    console.error("Error fetching data:", error);
    LoginService.logOut();
    router.push('/login')
  }
}

//POST DEPENDENCE
async function sendDataCreateDependence() {
  const data: any = reactive({});
  if (getValidationForm("create-dependence-form__content__form")) {
    dataDependence.stateCreateDependence = false;

    data.value = {
      code: dataDependence.dataCreateDependenceForm.data.code,
      name: dataDependence.dataCreateDependenceForm.data.name,
      parent_dependency: dataDependence.dataCreateDependenceForm.data.parent_dependency,
      state: dataDependence.dataCreateDependenceForm.data.state,
    };
    
    await DependenceService.createDependence(data.value)
      .then(() => {
        getList();
        dataDependence.dataModalConfirmation = {
          isActive: "show",
          dataText: {
            classText: "big",
            text: "the_dependence_was_created",
            disabled: false,
            onClick: () => { },
          },
          dataButton: {
            className: "blue",
            text: "continue",
            disabled: false,
            onClick: () => {
              dataDependence.dataModalConfirmation.isActive =
                "hidde";
              dataDependence.state = "";
              dataDependence.dataButtonGoToNext.text =
                "create_radicated";
            },
          },
        };
      })
      .catch((error) => {
        console.log(error);
        dataDependence.dataModalConfirmation.isActive = "hidde";

        dataDependence.dataModalAlert = {
          isActive: "show",
          dataText: {
            classText: "center",
            text: "an_error_has_occurred_please_try_again_later",
            disabled: false,
            onClick: () => { },
          },
          dataButton: {
            className: "blue",
            text: "continue",
            disabled: false,
            onClick: () => {
              dataDependence.dataModalAlert.isActive = "hidde";
            },
          },
        };
      });
  } else {
    dataDependence.dataModalAlert = {
      isActive: "show",
      dataText: {
        classText: "center",
        text: "all_inputs_empy",
        disabled: false,
        onClick: () => { },
      },
      dataButton: {
        className: "blue",
        text: "continue",
        disabled: false,
        onClick: () => {
          dataDependence.dataModalAlert.isActive = "hidde";
        },
      },
    };
  }
}



function validateNavegationButtonBack() {
  switch (dataDependence.stateViewFile) {
    case "step1":
      dataDependence.state = "";
      dataDependence.dataButtonGoToNext.text = "following";
   
      break;

    case "step123":
      dataDependence.stateViewFile = "step1";
      dataDependence.dataButtonGoToNext.text = "following";
      console.log('PASO 3');

      break;


    default:
      break;
  }
}
function validateNavegationButtonNext() {
  switch (dataDependence.stateViewFile) {
    case "step1":
      dataDependence.stateViewFile = "step12";
      dataDependence.dataButtonGoToNext.text = "following";
      break;
    case "step12":
      dataDependence.stateViewFile = "step123";
      dataDependence.dataButtonGoToNext.text =
        "Ccreate_and_continue";
      break;
    case "step123":
      sendDataCreateDependence();
      break;
    case "step1234":
      break;
    default:
      break;
  }
}


function getValidationForm(className: string) {
  //This function could be reused in anothers components pages
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

    if (!field.value.trim()) {
      state.value = false;
      field.classList.add("empty");
    }
  });

  return state.value;
}
/**
 * TODO FUNCTIONS REDIRECTS AND NAVEGATIONS
 */

function redirectCreateDependence() {
  dataDependence.stateViewFile = "step123";
  dataDependence.dataButtonGoToNext.text = "create_and_continue";
}

function redirectNewDependence() {
  dataDependence.state = "viewNewFile";
  dataDependence.stateViewFile = "step1";
}

</script>


<style scoped src="./Dependences.page.scss"></style>