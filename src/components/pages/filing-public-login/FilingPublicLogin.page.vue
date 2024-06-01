<template>
  <FilingPublicLogin :dataFilingPublicLogin="dataFilingPublicLogin" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import FilingPublicLogin from '../../templates/filing-public-login/FilingPublicLogin.template.vue';
import { useRoute, useRouter } from 'vue-router';
import LoginService from '../../../services/testService';

const router: any = useRouter();
const route = useRoute();

const dataFilingPublicLogin = reactive({
  stateForm: true,
  stateLegalPerson: false,
  dataTitle: {
    classTitle: 'center',
    text: 'start_login',
    disabled: false,
    onClick: () => { }
  },
  dataText: {
    classText: 'center',
    text: 'how_do_you_want_to_log_in',
    disabled: false,
    onClick: () => { }
  },
  dataCardOptionLogin: {
    classCard: '',
    dataImg: {
      id: '',
      name: '',
      class: 'icon-login',
      src: '/icon-login-usuario-contrasena.svg',
      type: '',
      alt: '',
      onClick: () => { }
    },
    dataText: {
      classText: '',
      text: 'login',
      disabled: false,
      onClick: () => { }
    },
    onClick: () => {
      setOptionLogin();
    }
  },
  dataCardOptionRegister: {
    classCard: '',
    dataImg: {
      id: '',
      name: '',
      class: 'icon-login',
      src: '/icon-login-id-biometrica.svg',
      type: '',
      alt: '',
      onClick: () => { }
    },
    dataText: {
      classText: '',
      text: 'register',
      disabled: false,
      onClick: () => { }
    },
    onClick: () => {
      setOptionRegister();
    }
  },
  dataInputEmail: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'email',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputPassword: {
    id: '',
    name: 'password',
    classInput: '',
    model: '',
    type: 'password',
    placeholder: 'password',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputName: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'name',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputLastName: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'last_name',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputBusinessName: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'business_name',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputNit: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'nit',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputPhone: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'phone',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataInputId: {
    id: '',
    name: '',
    classInput: '',
    model: '',
    type: 'text',
    placeholder: 'id',
    disabled: false,
    required: true,
    onClick: () => { }
  },
  dataButton:
  {
    className: 'blue',
    text: 'login',
    disabled: false,
    onClick: () => {
      validationSubmit();
    }
  },
  dataModalAlert: {
    isActive: '',
    dataButton: {
      className: 'blue',
      text: 'continue',
      disabled: false,
      onClick: () => { dataFilingPublicLogin.dataModalAlert.isActive = 'hidde' }
    },
    dataText: {
      classText: '',
      text: 'Esta es la descripcion',
      disabled: false,
      onClick: () => { }
    }
  }
});

watch(() => dataFilingPublicLogin.stateForm, (newValue: boolean, oldValue: boolean) => {
  resetStatesForm();
});

onMounted(() => {
  setOptionLogin();
})



function setOptionRegister() {
  dataFilingPublicLogin.stateForm = false;
  dataFilingPublicLogin.dataCardOptionRegister.dataImg.src = '/icon-login-id-biometrica-white.svg';
  dataFilingPublicLogin.dataCardOptionRegister.classCard = 'focused';
  dataFilingPublicLogin.dataCardOptionLogin.dataImg.src = '/icon-login-usuario-contrasena.svg';
  dataFilingPublicLogin.dataCardOptionLogin.classCard = '';
  dataFilingPublicLogin.dataTitle.text = 'register';
  dataFilingPublicLogin.dataButton.text = 'register';
}


function setOptionLogin() {
  dataFilingPublicLogin.stateForm = true;
  dataFilingPublicLogin.dataCardOptionLogin.dataImg.src = '/icon-login-usuario-contrasena-white.svg';
  dataFilingPublicLogin.dataCardOptionLogin.classCard = 'focused';
  dataFilingPublicLogin.dataCardOptionRegister.dataImg.src = '/icon-login-id-biometrica.svg';
  dataFilingPublicLogin.dataCardOptionRegister.classCard = '';
  dataFilingPublicLogin.dataTitle.text = 'login'
  dataFilingPublicLogin.dataButton.text = 'login';
}

function resetStatesForm() {
  dataFilingPublicLogin.dataInputEmail.model = '';
  dataFilingPublicLogin.dataInputPassword.model = '';
  dataFilingPublicLogin.dataInputName.model = '';
  dataFilingPublicLogin.dataInputLastName.model = '';
  dataFilingPublicLogin.dataInputId.model = '';
  dataFilingPublicLogin.dataInputBusinessName.model = '';
  dataFilingPublicLogin.dataInputPhone.model = '';
}

function validationSubmit() {
  switch (dataFilingPublicLogin.stateForm) {
    case true:
      getValidationForm('filing-public-login__wrapper__content__form') ? login() : openModalAlert('empty_inputs');
      break;
    case false:
      getValidationForm('filing-public-login__wrapper__content__form--register') ? sendDataRegister() : openModalAlert('empty_inputs');
      break;
    default:
      break;
  }
}


function openModalAlert(key_mssg: string) {
  dataFilingPublicLogin.dataModalAlert.dataText.text = key_mssg;
  dataFilingPublicLogin.dataModalAlert.isActive = 'show';
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
    console.log(field.value);

    field.classList.remove("empty");
    if (!field.value.trim()) {
      state.value = false;
      field.classList.add("empty");
    }
  });
  console.log(state.value);

  return state.value;
}

function sendDataRegister() {
  const formData = new FormData;
  formData.append('email', dataFilingPublicLogin.dataInputEmail.model);
  formData.append('password', dataFilingPublicLogin.dataInputPassword.model);
  formData.append('name', dataFilingPublicLogin.dataInputName.model);
  formData.append('last_name', dataFilingPublicLogin.dataInputLastName.model);
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
}


// function login() {

//   for (const [key, value] of formData.entries()) {
//     console.log(`${key}: ${value}`);
//   }

// }


async function login() {
  try {
    // Call method where get service to post data and check user.

    const success = await LoginService.login(dataFilingPublicLogin.dataInputEmail.model, dataFilingPublicLogin.dataInputPassword.model);

    if (success) {
      router.push('/filing-correspondence');//Redirect if the user was checked. 
    }


  } catch (error) {
    console.error('Error en el inicio de sesión:', error);

    dataFilingPublicLogin.dataModalAlert = {
      isActive: 'show',
      dataButton: {
        className: 'blue',
        text: 'close',
        disabled: false,
        onClick: () => { dataFilingPublicLogin.dataModalAlert.isActive = 'hidde' }
      },
      dataText: {
        classText: 'center',
        text: 'incorrect_credentials',
        disabled: false,
        onClick: () => { }
      }
    }
  }
}

</script>
<style scoped src="./FilingPublicLogin.page.scss"></style>