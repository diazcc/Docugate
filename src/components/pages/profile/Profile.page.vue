<!--
    TODO COMPONENT PROFILE RECEIVED PAGE
    ?This component has all logic and develop of correspondence on only section 'received'.
-->

<template>
  <ProfileTemplate :dataProfile="dataProfile" />
</template>

<script setup lang="ts">
// IMPORTS
import axios from "axios";
import ProfileTemplate from "../../templates/profile/Profile.template.vue";
import {
  onMounted,
  reactive,
  ref,
} from "vue";
import LoginService from "../../../services/testService"; //!This services must be deleted or modified name
import ProfileService from "../../../services/ProfileServices";
import UserService from "../../../services/UserServices";

import { useRouter } from "vue-router";
const router = useRouter();

// VARIABLES OR STATES
/**
 * TODO HERE DEFINE VALUES DEFAULT
 */
let formData: FormData = new FormData(); //Formdata used for be send to endpoits
const dataProfile = reactive({
  //Structure of all components data
  id_profile: "id_profile",
  dataCreateProfileForm: {
    stateCreateProfile: true,
    data: {
      profile_name: '',
      user: ''

    }, 
  },
  state: "", //First state for show first view
  stateViewFile: "",

  stateCreateProfile: true,

  dataButtonNewProfile: {
    className: "blue",
    text: "create_new_profile",
    disabled: false,
    onClick: () => {
      redirectNewProfile();
    },
  },


  dataButtonRedirectToCreateProfile: {
    className: "gray-blue",
    text: "create_profile",
    disabled: false,
    onClick: () => {
      dataProfile.stateViewFile = "step123";
      dataProfile.dataButtonGoToNext.text =
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

      router.push('/home/profile');
      validateNavegationButtonBack();
    },
  },
  dataTableProfile: {
    data: [],
    dataInputSearch: {
      dataInput: {
        id: "",
        name: "",
        classInputEmail: "",
        model: "",
        type: "text",
        placeholder: "search_profile",
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

  dataUsers: {
    data: []
  },

  dataTableProfiles: {
    data: [],
    dataButton: {
      className: "blue",
      text: "create_profile",
      disabled: false,
      onClick: () => {
        redirectCreateProfile();
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
        dataProfile.dataModalConfirmation.isActive = "hidde";
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
  getList(); //Call function for get all profiles exist on data base.
  getUsers()
});

/**
 * TODO FUNCTIONS SET AND GET
 */
async function getUsers() {
  try {
    const response = await UserService.getAllUsers();
    console.log(response);
    dataProfile.dataUsers.data =
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

async function getList() {
  try {
    const response = await ProfileService.getAllProfiles();
    dataProfile.dataTableProfile.data =
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

//POST PROFILE
async function sendDataCreateProfile() {
  const data: any = reactive({});
  if (getValidationForm("create-profile-form__content__form")) {
    dataProfile.stateCreateProfile = false;

    data.value = {
      profile_name: dataProfile.dataCreateProfileForm.data.profile_name,
      user: dataProfile.dataCreateProfileForm.data.user

    };

    await ProfileService.createProfile(data.value)
      .then(() => {
        getList();
        dataProfile.dataModalConfirmation = {
          isActive: "show",
          dataText: {
            classText: "big",
            text: "the_profile_was_created",
            disabled: false,
            onClick: () => { },
          },
          dataButton: {
            className: "blue",
            text: "continue",
            disabled: false,
            onClick: () => {
              dataProfile.dataModalConfirmation.isActive =
                "hidde";
              dataProfile.state = "";
              dataProfile.dataButtonGoToNext.text =
                "create_radicated";
            },
          },
        };
      })
      .catch((error) => {
        console.log(error);
        dataProfile.dataModalConfirmation.isActive = "hidde";

        dataProfile.dataModalAlert = {
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
              dataProfile.dataModalAlert.isActive = "hidde";
            },
          },
        };
      });
  } else {
    dataProfile.dataModalAlert = {
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
          dataProfile.dataModalAlert.isActive = "hidde";
        },
      },
    };
  }
}



function validateNavegationButtonBack() {
  switch (dataProfile.stateViewFile) {
    case "step1":
      dataProfile.state = "";
      dataProfile.dataButtonGoToNext.text = "following";

      break;
    case "step12":
      dataProfile.stateViewFile = "step1";
      dataProfile.dataButtonGoToNext.text = "following";
      console.log('PASO 2');

      break;
    case "step123":
      dataProfile.stateViewFile = "step1";
      dataProfile.dataButtonGoToNext.text = "following";
      console.log('PASO 3');

      break;


    default:
      break;
  }
}
function validateNavegationButtonNext() {
  switch (dataProfile.stateViewFile) {
    case "step1":
      dataProfile.stateViewFile = "step12";
      dataProfile.dataButtonGoToNext.text = "following";
      break;
    case "step12":
      dataProfile.stateViewFile = "step123";
      dataProfile.dataButtonGoToNext.text =
        "Ccreate_and_continue";
      break;
    case "step123":
      sendDataCreateProfile();
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

function redirectCreateProfile() {
  dataProfile.stateViewFile = "step123";
  dataProfile.dataButtonGoToNext.text = "create_and_continue";
}

function redirectNewProfile() {
  dataProfile.state = "viewNewFile";
  dataProfile.stateViewFile = "step1";
}

</script>


<style scoped src="./Profile.page.scss"></style>