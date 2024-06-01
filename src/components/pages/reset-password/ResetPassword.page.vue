<!-- todo ### COMPONENT RESETPASSWORD ###-->
<!--
TODO  ¡¡Developer Conditions!!:
    - just define variables for be used. 
    - With the structure json variable,just could call inside them 
      functions defined on this component page, don't be create or do
      functionality on the structure json variable.
-->
<template>
  <ResetPasswordTemplate :dataResetPasswordTemplate="dataResetPasswordTemplate" />
</template>

<script setup lang="ts">
/**
 * *IMPORTS - calls all components. functions or variables for be used. 
*/

import ResetPasswordTemplate from '../../templates/reset-password/ResetPassword.template.vue';
import VerifyMailService from '../../../services/VerifyMailServices';
import { useRouter } from 'vue-router';
import { reactive, onMounted, onBeforeMount, onUnmounted, ref } from 'vue';
/** 
*  *VARIABLES -----
*/
const router = useRouter();
const data = ref()

const dataResetPasswordTemplate = reactive({
  dataTitle: {
    classTitle: 'center',
    text: 'start_new_password',
    disabled: false,
    onClick: () => { }
  },
  dataText:
  {
    classText: 'center',
    text: 'introduce_code',
    disabled: false,
    onClick: () => { }
  },
  dataOptionsResetPassword: {
    dataCardOptionResetPassword: {
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
    }
  },
  dataCardResetPassword: {
    dataInputCode: {
      id: '',
      name: '',
      classInputEmail: '',
      model: '',
      type: 'text',
      placeholder: 'code',
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
      text: 'role',
      disabled: false,
      onClick: () => {
      }
    }
  },

  state: "",
  dataButtonGoToNext: {
    className: "blue",
    text: "following",
    disabled: false,
    onClick: () => {
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
        dataResetPasswordTemplate.dataModalConfirmation.isActive = "hidde";
      },
    },
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

  setDataButtonResetPassword();
  setDataCardOptionsResetPassword();
  window.addEventListener('keypress', handleEnterKey);// add event listener for press key enter
});


// Lifecycle hook: executed after the component is unmounted
onUnmounted(() => {
  window.removeEventListener('keypress', handleEnterKey);//must be remove listener
});


//FUNCTIONS DEVELOPER

/** 
 * TODO Start section for set default data components. 
 * */
function setDataButtonResetPassword() {
  dataResetPasswordTemplate.dataCardResetPassword.dataButton = {//structure for data button resetpassword 
    className: 'blue button',
    text: 'validate',
    disabled: false,
    onClick: validate
  }
}
/** 
 * TODO SET AND GETS 
 * */
function setDataCardOptionsResetPassword() {
  dataResetPasswordTemplate.dataOptionsResetPassword = {
    dataCardOptionResetPassword: {
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
      onClick: () => { }
    }
  }
}

/** 
 * TODO: End section for set default data components. 
 * */



/** 
 * TODO OTHERS METHODS 
 * */
async function validate() {
  try {
    // Call method where get service to post data and check user.
    data.value = {
      code: dataResetPasswordTemplate.dataCardResetPassword.dataInputCode.model,
      password: dataResetPasswordTemplate.dataCardResetPassword.dataInputPassword.model
    };

    if (getValidationForm('card-resetpassword-normal')) {
      await VerifyMailService.resetPassword(data.value)
        .then(() => {
          localStorage.removeItem('userEmail');
          dataResetPasswordTemplate.dataModalConfirmation = {
            isActive: "show",
            dataText: {
              classText: "big",
              text: "the_password_was_changed",
              disabled: false,
              onClick: () => { },
            },
            dataButton: {
              className: "blue",
              text: "continue",
              disabled: false,
              onClick: () => {

                dataResetPasswordTemplate.dataModalConfirmation.isActive =
                  "hidde";
                dataResetPasswordTemplate.state = "";
                dataResetPasswordTemplate.dataButtonGoToNext.text =
                  "create_radicated";
                router.push('/login/')
              },
            },
          };

        })
        .catch((error) => {
          dataResetPasswordTemplate.dataModalAlert = {
            isActive: 'show',
            dataButton: {
              className: 'blue',
              text: 'Cerrar',
              disabled: false,
              onClick: () => { dataResetPasswordTemplate.dataModalAlert.isActive = 'hidde' }
            },
            dataText: {
              classText: 'center',
              text: 'incorrect_code',
              disabled: false,
              onClick: () => { }
            }
          }

        });

    } else {
      dataResetPasswordTemplate.dataModalAlert = {
        isActive: 'show',
        dataButton: {
          className: 'blue',
          text: 'Cerrar',
          disabled: false,
          onClick: () => { dataResetPasswordTemplate.dataModalAlert.isActive = 'hidde' }
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
    console.error('Error al validar el correo electronico:', error);
    dataResetPasswordTemplate.dataModalAlert = {
      isActive: 'show',
      dataButton: {
        className: 'blue',
        text: 'Cerrar',
        disabled: false,
        onClick: () => { dataResetPasswordTemplate.dataModalAlert.isActive = 'hidde' }
      },
      dataText: {
        classText: 'center',
        text: 'Error al validar el correo electronico',
        disabled: false,
        onClick: () => { }
      }
    }
  }
}


function handleEnterKey(event: any) {
  if (event.key === "Enter") {
    validate()
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
<style scoped src="./ResetPassword.page.scss"></style>