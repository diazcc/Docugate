<!--
    TODO COMPONENT ROLE RECEIVED PAGE
    ?This component has all logic and develop of correspondence on only section 'received'.
-->

<template>
  <RoleTemplate :dataRole="dataRole" />
</template>

<script setup lang="ts">
// IMPORTS
import axios from "axios";
import RoleTemplate from "../../templates/role/Role.template.vue";
import {
  onMounted,
  reactive,
  ref,
} from "vue";
import LoginService from "../../../services/testService"; //!This services must be deleted or modified name
import RoleService from "../../../services/RoleServices";
import { useRouter } from "vue-router";
const router = useRouter();

// VARIABLES OR STATES
/**
 * TODO HERE DEFINE VALUES DEFAULT
 */
let formData: FormData = new FormData(); //Formdata used for be send to endpoits
const dataRole = reactive({
  //Structure of all components data
  id_role: "id_role",
  dataCreateRoleForm: {
    stateCreateRole: true,
    data: {
      name:''

    },
  },
  state: "", //First state for show first view
  stateViewFile: "",

  stateCreateRole: true,

  dataButtonNewRole: {
    className: "blue",
    text: "create_new_role",
    disabled: false,
    onClick: () => {
      redirectNewRole();
    },
  },


  dataButtonRedirectToCreateRole: {
    className: "gray-blue",
    text: "create_role",
    disabled: false,
    onClick: () => {
      dataRole.stateViewFile = "step123";
      dataRole.dataButtonGoToNext.text =
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

      router.push('/home/role');
      validateNavegationButtonBack();
    },
  },
  dataTableRole: {
    data: [],
    dataInputSearch: {
      dataInput: {
        id: "",
        name: "",
        classInputEmail: "",
        model: "",
        type: "text",
        placeholder: "search_role",
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

  dataTableRoles: {
    data: [],
    dataButton: {
      className: "blue",
      text: "create_role",
      disabled: false,
      onClick: () => {
        redirectCreateRole();
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
        dataRole.dataModalConfirmation.isActive = "hidde";
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
  getList(); //Call function for get all roles exist on data base.
});

/**
 * TODO FUNCTIONS SET AND GET
 */


async function getList() {
  try {
    const response = await RoleService.getAllRoles();
    dataRole.dataTableRole.data =
      response.map((data: any) => ({
        ...data,
        isMenuOpen: false, // Añade la propiedad isMenuOpen inicializada en false a cada objeto.
      }));
  } catch (error) {
    console.error("Error fetching data:", error);
    // LoginService.logOut();
    // router.push('/login')
  }
}

//POST ROLE
async function sendDataCreateRole() {
  const data: any = reactive({});
  if (getValidationForm("create-role-form__content__form")) {
    dataRole.stateCreateRole = false;

    data.value = {
      name: dataRole.dataCreateRoleForm.data.name,

    };

    await RoleService.createRole(data.value)
      .then(() => {
        getList();
        dataRole.dataModalConfirmation = {
          isActive: "show",
          dataText: {
            classText: "big",
            text: "the_role_was_created",
            disabled: false,
            onClick: () => { },
          },
          dataButton: {
            className: "blue",
            text: "continue",
            disabled: false,
            onClick: () => {
              dataRole.dataModalConfirmation.isActive =
                "hidde";
              dataRole.state = "";
              dataRole.dataButtonGoToNext.text =
                "create_radicated";
            },
          },
        };
      })
      .catch((error) => {
        console.log(error);
        dataRole.dataModalConfirmation.isActive = "hidde";

        dataRole.dataModalAlert = {
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
              dataRole.dataModalAlert.isActive = "hidde";
            },
          },
        };
      });
  } else {
    dataRole.dataModalAlert = {
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
          dataRole.dataModalAlert.isActive = "hidde";
        },
      },
    };
  }
}



function validateNavegationButtonBack() {
  switch (dataRole.stateViewFile) {
    case "step1":
      dataRole.state = "";
      dataRole.dataButtonGoToNext.text = "following";

      break;
    case "step12":
      dataRole.stateViewFile = "step1";
      dataRole.dataButtonGoToNext.text = "following";
      console.log('PASO 2');

      break;
    case "step123":
      dataRole.stateViewFile = "step1";
      dataRole.dataButtonGoToNext.text = "following";
      console.log('PASO 3');

      break;


    default:
      break;
  }
}
function validateNavegationButtonNext() {
  switch (dataRole.stateViewFile) {
    case "step1":
      dataRole.stateViewFile = "step12";
      dataRole.dataButtonGoToNext.text = "following";
      break;
    case "step12":
      dataRole.stateViewFile = "step123";
      dataRole.dataButtonGoToNext.text =
        "Ccreate_and_continue";
      break;
    case "step123":
      sendDataCreateRole();
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
    // console.log(field.value.trim());
    field.classList.remove("empty");

    if (!field.value.trim()) {
      state.value = false;
      field.classList.add("empty");
      // console.log(field.value + ' :sicas');
    }
  });

  return state.value;
}
/**
 * TODO FUNCTIONS REDIRECTS AND NAVEGATIONS
 */

function redirectCreateRole() {
  dataRole.stateViewFile = "step123";
  dataRole.dataButtonGoToNext.text = "create_and_continue";
}

function redirectNewRole() {
  dataRole.state = "viewNewFile";
  dataRole.stateViewFile = "step1";
}

</script>


<style scoped src="./Role.page.scss"></style>