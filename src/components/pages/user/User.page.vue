<!--
    TODO COMPONENT CORRESPONDENCE RECEIVED PAGE
    ?This component has all logic and develop of correspondence on only section 'received'.
-->

<template>
  <UserTemplate :dataUser="dataUser" />
</template>

<script setup lang="ts">
// IMPORTS
import axios from "axios";
import UserTemplate from "../../templates/user/User.template.vue";
import {
  onMounted,
  reactive,
  ref,
} from "vue";
import LoginService from "../../../services/testService"; //!This services must be deleted or modified name
import UserService from "../../../services/UserServices";
import DependenceService from "../../../services/DependenceServices";
import { accessStore } from "../../../store";
import { useRouter } from "vue-router";
import RoleService from "../../../services/RoleServices";
const router = useRouter();
const store = accessStore();

// VARIABLES OR STATES
/**
 * TODO HERE DEFINE VALUES DEFAULT
 */
let formData: FormData = new FormData(); //Formdata used for be send to endpoits
const dataUser = reactive({
  //Structure of all components data
  id_user: "id_user",
  dataCreateUserForm: {
    stateCreateUser: true,
    data: {
      first_name: "",
      last_name: "",
      email: "",
      dependence: "",
      identification_number: '',
      date_of_birth: "",
      is_staff: '',
      is_active: '',
      role:''

    },
  },
  state: "", //First state for show first view
  stateViewFile: "",

  stateCreateUser: true,

  dataButtonNewUser: {
    className: "blue",
    text: "create_new_user",
    disabled: false,
    onClick: () => {
      redirectNewUser();
    },
  },


  dataButtonRedirectToCreateUser: {
    className: "gray-blue",
    text: "create_user",
    disabled: false,
    onClick: () => {
      dataUser.stateViewFile = "step123";
      dataUser.dataButtonGoToNext.text =
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

      router.push('/home/user');
      validateNavegationButtonBack();
    },
  },
  dataTableUser: {
    data: [],
    dataInputSearch: {
      dataInput: {
        id: "",
        name: "",
        classInputEmail: "",
        model: "",
        type: "text",
        placeholder: "search_user",
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

  dataDependences: {
    data: []
  },
  dataRoles: {
    data: []
  },

  dataTableUsers: {
    data: [],
    dataButton: {
      className: "blue",
      text: "create_user",
      disabled: false,
      onClick: () => {
        redirectCreateUser();
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
        dataUser.dataModalConfirmation.isActive = "hidde";
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
  getList(); //Call function for get all users exist on data base.
  getDependences();
  getRoles();
});

/**
 * TODO FUNCTIONS SET AND GET
 */


async function getList() {
  try {
    const response = await UserService.getAllUsers();
    console.log();
    dataUser.dataTableUser.data =
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

async function getDependences() {
  try {
    const response = await DependenceService.getAllDependences();
    dataUser.dataDependences.data =
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

async function getRoles() {
  try {
    const response = await RoleService.getAllRoles();
    dataUser.dataRoles.data =
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


//POST USER
async function sendDataCreateUser() {
  const data: any = reactive({});
  if (getValidationForm("create-user-form__content__form")) {
    dataUser.stateCreateUser = false;

    data.value = {
      first_name: dataUser.dataCreateUserForm.data.first_name,
      last_name: dataUser.dataCreateUserForm.data.last_name,
      email: dataUser.dataCreateUserForm.data.email,
      dependence: dataUser.dataCreateUserForm.data.dependence,
      identification_number: dataUser.dataCreateUserForm.data.identification_number,
      date_of_birth: dataUser.dataCreateUserForm.data.date_of_birth,
      is_staff: dataUser.dataCreateUserForm.data.is_staff,
      is_active: dataUser.dataCreateUserForm.data.is_active,
      role: dataUser.dataCreateUserForm.data.role

    };

    await UserService.createUser(data.value)
      .then(() => {
        getList();
        dataUser.dataModalConfirmation = {
          isActive: "show",
          dataText: {
            classText: "big",
            text: "the_user_was_created",
            disabled: false,
            onClick: () => { },
          },
          dataButton: {
            className: "blue",
            text: "continue",
            disabled: false,
            onClick: () => {
              dataUser.dataModalConfirmation.isActive =
                "hidde";
              dataUser.state = "";
              dataUser.dataButtonGoToNext.text =
                "create_radicated";
            },
          },
        };
      })
      .catch((error) => {
        console.log(error);
        dataUser.dataModalConfirmation.isActive = "hidde";

        dataUser.dataModalAlert = {
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
              dataUser.dataModalAlert.isActive = "hidde";
            },
          },
        };
      });
  } else {
    dataUser.dataModalAlert = {
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
          dataUser.dataModalAlert.isActive = "hidde";
        },
      },
    };
  }
}



function validateNavegationButtonBack() {
  switch (dataUser.stateViewFile) {
    case "step1":
      dataUser.state = "";
      dataUser.dataButtonGoToNext.text = "following";

      break;
    case "step12":
      dataUser.stateViewFile = "step1";
      dataUser.dataButtonGoToNext.text = "following";
      console.log('PASO 2');

      break;
    case "step123":
      dataUser.stateViewFile = "step1";
      dataUser.dataButtonGoToNext.text = "following";
      console.log('PASO 3');

      break;


    default:
      break;
  }
}
function validateNavegationButtonNext() {
  switch (dataUser.stateViewFile) {
    case "step1":
      dataUser.stateViewFile = "step12";
      dataUser.dataButtonGoToNext.text = "following";
      break;
    case "step12":
      dataUser.stateViewFile = "step123";
      dataUser.dataButtonGoToNext.text =
        "Ccreate_and_continue";
      break;
    case "step123":
      sendDataCreateUser();
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

function redirectCreateUser() {
  dataUser.stateViewFile = "step123";
  dataUser.dataButtonGoToNext.text = "create_and_continue";
}

function redirectNewUser() {
  dataUser.state = "viewNewFile";
  dataUser.stateViewFile = "step1";
}

</script>


<style scoped src="./User.page.scss"></style>