<!-- todo ### COMPONENT LOGIN ###-->
<!--
TODO  ¡¡Developer Conditions!!:
    - just define variables for be used. 
    - With the structure json variable,just could call inside them 
      functions defined on this component page, don't be create or do
      functionality on the structure json variable.
-->
<template>
  <LoginTemplate :dataLoginTemplate="dataLoginTemplate" />
</template>

<script setup lang="ts">
/**
 * *IMPORTS - calls all components. functions or variables for be used. 
*/

import LoginTemplate from '../../templates/login/Login.template.vue';
import LoginService from '../../../services/testService';
import { useRouter } from 'vue-router';
import { reactive, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, ref } from 'vue';
/** 
*  *VARIABLES -----
*/
const router = useRouter();

const dataLoginTemplate = reactive({
  dataTitle: {
    classTitle: 'center',
    text: 'start_login',
    disabled: false,
    onClick: () => { }
  },
  dataText:
  {
    classText: 'center',
    text: 'how_do_you_want_to_log_in',
    disabled: false,
    onClick: () => { }
  },
  dataOptionsLogin: {
    dataCardOptionLogin: {
      classCard: '',
      dataImg: {
        id: '',
        name: '',
        class: '',
        src: '',
        type: '',
        alt: '',
        onClick: () => { }
      },
      dataText: {
        classText: '',
        text: '',
        disabled: false,
        onClick: () => { }
      },
      onClick: () => { }
    },
    dataCardOptionDoubleFactor: {
      classCard: '',
      dataImg: {
        id: '',
        name: '',
        class: '',
        src: '',
        type: '',
        alt: '',
        onClick: () => { }
      },
      dataText: {
        classText: '',
        text: '',
        disabled: false,
        onClick: () => { }
      },
      onClick: () => { }
    },
    dataCardOptionBiometric: {
      classCard: '',
      dataImg: {
        id: '',
        name: '',
        class: '',
        src: '',
        type: 'png',
        alt: '',
        onClick: () => { }
      },
      dataText: {
        classText: '',
        text: '',
        disabled: false,
        onClick: () => { }
      },
      onClick: () => {
      }
    }
  },
  dataCardLogin: {
    dataInputEmail: {
      id: '',
      name: '',
      classInputEmail: '',
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
      classInputEmail: '',
      model: '',
      type: 'password',
      placeholder: 'password',
      disabled: false,
      required: true,
      onClick: () => { }
    },
    dataButton:
    {
      className: '',
      text: '',
      disabled: false,
      onClick: () => {
      }
    }
  },
  dataModalAlert: {
    isActive: '',
    dataButton: {
      className: '',
      text: 'Inicio de sesión',
      disabled: false,
      onClick: () => { }
    },
    dataText: {
      classText: '',
      text: 'Esta es la descripcion',
      disabled: false,
      onClick: () => { }
    }
  },
});



/** 
*  Todo ALL FUNCTIONS
*/

//LIFECYCLE COMPONENT
// Lifecycle hook: executed before the component is mounted to the DOM
onBeforeMount(() => {

});

// Lifecycle hook: executed when the component is mounted to the DOM
onMounted(() => {

  /**
   * ?On this function try to just call function that you need, do not create code. 
   */

  setDataButtonLogin();
  setDataCardOptionsLogin();
  window.addEventListener('keypress', handleEnterKey);// add event listener for press key enter
  localStorage.removeItem('userEmail');

});

// Lifecycle hook: executed before updated data is reflected to the DOM
onBeforeUpdate(() => {
});

// Lifecycle hook: executed after updated data is reflected to the DOM
onUpdated(() => {
});

// Lifecycle hook: executed before the component is unmounted
onBeforeUnmount(() => {
});

// Lifecycle hook: executed after the component is unmounted
onUnmounted(() => {
  window.removeEventListener('keypress', handleEnterKey);//must be remove listener
});


//FUNCTIONS DEVELOPER

/** 
 * TODO Start section for set default data components. 
 * */
function setDataButtonLogin() {
  dataLoginTemplate.dataCardLogin.dataButton = {//structure for data button login 
    className: 'blue button',
    text: 'start_login',
    disabled: false,
    onClick: login
  }
}
/** 
 * TODO SET AND GETS 
 * */
function setDataCardOptionsLogin() {
  dataLoginTemplate.dataOptionsLogin = {
    dataCardOptionLogin: {
      classCard: '',
      dataImg: {
        id: '',
        name: '',
        class: 'icon-login',
        src: '/icon-login-usuario-contrasena.svg',
        type: 'png',
        alt: '',
        onClick: () => { }
      },
      dataText: {
        classText: 'small',
        text: 'user_and_password',
        disabled: false,
        onClick: () => { }
      },
      onClick: () => { setTypeLogNormal() }
    },
    dataCardOptionDoubleFactor: {
      classCard: '',
      dataImg: {
        id: '',
        name: '',
        class: 'icon-login',
        src: '/icon-login-id-doble-f.svg',
        type: 'png',
        alt: '',
        onClick: () => { }
      },
      dataText: {
        classText: 'small',
        text: 'two_factor_authentication',
        disabled: false,
        onClick: () => { }
      },
      onClick: () => { setTypeLogDoubleFactor() }
    },
    dataCardOptionBiometric: {
      classCard: '',
      dataImg: {
        id: '',
        name: '',
        class: 'icon-login',
        src: '/icon-login-id-biometrica.svg',
        type: 'png',
        alt: '',
        onClick: () => { }
      },
      dataText: {
        classText: 'small',
        text: 'biometric_identification',
        disabled: false,
        onClick: () => { }
      },
      onClick: () => {
        setTypeLogBiometric()
      }
    }
  }
}

function setTypeLogNormal() {//This funciton is for set img card login
  dataLoginTemplate.dataOptionsLogin.dataCardOptionLogin.classCard = 'focused';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionDoubleFactor.classCard = '';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionBiometric.classCard = '';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionLogin.dataImg.src = '/icon-login-usuario-contrasena-white.svg';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionDoubleFactor.dataImg.src = '/icon-login-id-doble-f.svg';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionBiometric.dataImg.src = '/icon-login-id-biometrica.svg';

}
function setTypeLogDoubleFactor() {//This funciton is for set img card login
  dataLoginTemplate.dataOptionsLogin.dataCardOptionLogin.classCard = '';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionDoubleFactor.classCard = 'focused';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionBiometric.classCard = '';

  dataLoginTemplate.dataOptionsLogin.dataCardOptionDoubleFactor.dataImg.src = '/icon-login-id-doble-f-white.svg';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionLogin.dataImg.src = '/icon-login-usuario-contrasena.svg';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionBiometric.dataImg.src = '/icon-login-id-biometrica.svg';


}
function setTypeLogBiometric() {//This funciton is for set img card login
  dataLoginTemplate.dataOptionsLogin.dataCardOptionLogin.classCard = '';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionDoubleFactor.classCard = '';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionBiometric.classCard = 'focused';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionBiometric.dataImg.src = '/icon-login-id-biometrica-white.svg';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionLogin.dataImg.src = '/icon-login-usuario-contrasena.svg';
  dataLoginTemplate.dataOptionsLogin.dataCardOptionDoubleFactor.dataImg.src = '/icon-login-id-doble-f.svg';
}
/** 
 * TODO: End section for set default data components. 
 * */



/** 
 * TODO OTHERS METHODS 
 * */
async function login() {
  try {
    // Call method where get service to post data and check user.

    if (getValidationForm('card-login-normal')) {
      const success = await LoginService.login(dataLoginTemplate.dataCardLogin.dataInputEmail.model, dataLoginTemplate.dataCardLogin.dataInputPassword.model);
      if (success) {
        router.push('/home');//Redirect if the user was checked. 
      }
    } else {
      dataLoginTemplate.dataModalAlert = {
        isActive: 'show',
        dataButton: {
          className: 'blue',
          text: 'Cerrar',
          disabled: false,
          onClick: () => { dataLoginTemplate.dataModalAlert.isActive = 'hidde' }
        },
        dataText: {
          classText: 'center',
          text: 'Al parecer no has llenado todos los campos',
          disabled: false,
          onClick: () => { }
        }
      }
    }


  } catch (error) {
    console.error('Error en el inicio de sesión:', error);

    dataLoginTemplate.dataModalAlert = {
      isActive: 'show',
      dataButton: {
        className: 'blue',
        text: 'Cerrar',
        disabled: false,
        onClick: () => { dataLoginTemplate.dataModalAlert.isActive = 'hidde' }
      },
      dataText: {
        classText: 'center',
        text: 'Credenciales incorrectas',
        disabled: false,
        onClick: () => { }
      }
    }
  }
}

function registerUser() {
  router.push('/register');
}

function handleEnterKey(event: any) {
  if (event.key === "Enter") {
    login()
  }
}

/** 
 * TODO VALIDATORS 
 * */

function getValidationForm(className: string) {
  const state: any = ref(false);;

  const fieldsContainer: any = document.querySelector('.' + className);
  console.log(document.querySelector('.' + className));
  if (!fieldsContainer) {
    return false;
  }

  const inputsAndSelects = fieldsContainer.querySelectorAll('input[required], select[required]');
  inputsAndSelects.forEach((field: any) => {
    console.log(field);
    field.classList.remove('empty');

    if (!field.value) {
      console.log(field);
      state.value = false;
      field.classList.add('empty');
      console.log(field.value + ' :sicas');
      setTimeout(() => field.classList.remove('empty'), 2000);
    } else {
      console.log('falso');

      state.value = true;
    }
  });

  return state.value;
}

</script>
<!-- This componnet cannot have styles, just develop logic -->
<style scoped src="./Login.page.scss"></style>