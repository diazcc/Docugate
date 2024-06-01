<!-- todo ### COMPONENT SENDMAIL ###-->
<!--
TODO  ¡¡Developer Conditions!!:
    - just define variables for be used. 
    - With the structure json variable,just could call inside them 
      functions defined on this component page, don't be create or do
      functionality on the structure json variable.
-->
<template>
  <SendMailTemplate :dataSendMail="dataSendMail" />
</template>

<script setup lang="ts">
/**
 * *IMPORTS - calls all components. functions or variables for be used. 
*/

import SendMailTemplate from '../../templates/send-mail/SendMail.template.vue';
import PasswordRecoveryService from '../../../services/PasswordRecoveryServices';
import { useRouter } from 'vue-router';
import { reactive, onMounted, onBeforeMount, onUnmounted, ref } from 'vue';
/** 
*  *VARIABLES -----
*/
const router = useRouter();
const data = ref()

const dataSendMail = reactive({
  dataTitle: {
    classTitle: 'center',
    text: 'start_new_password',
    disabled: false,
    onClick: () => { }
  },
  dataText:
  {
    classText: 'center',
    text: 'introduce_email',
    disabled: false,
    onClick: () => { }
  },
  dataOptionsSendMail: {
    dataCardOptionSendMail: {
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
  dataCardSendMail: {
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

    dataButton:
    {
      className: '',
      text: 'role',
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

  setDataButtonSendMail();
  setDataCardOptionsSendMail();
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
function setDataButtonSendMail() {
  dataSendMail.dataCardSendMail.dataButton = {//structure for data button sendmail 
    className: 'blue button',
    text: 'send_code',
    disabled: false,
    onClick: validate
  }
}
/** 
 * TODO SET AND GETS 
 * */
function setDataCardOptionsSendMail() {
  dataSendMail.dataOptionsSendMail = {
    dataCardOptionSendMail: {
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
      email: dataSendMail.dataCardSendMail.dataInputEmail.model
    };

    if (getValidationForm('card-verifyemail-normal')) {
      await PasswordRecoveryService.validateMail(data.value)
        .then(() => {
          router.push('/recovery-password/reset/')
        })
        .catch((error) => {
          console.log(error);
          dataSendMail.dataModalAlert = {
            isActive: 'show',
            dataButton: {
              className: 'blue',
              text: 'Cerrar',
              disabled: false,
              onClick: () => { dataSendMail.dataModalAlert.isActive = 'hidde' }
            },
            dataText: {
              classText: 'center',
              text: 'incorrect_email',
              disabled: false,
              onClick: () => { }
            }
          }
        });

    } else {
      dataSendMail.dataModalAlert = {
        isActive: 'show',
        dataButton: {
          className: 'blue',
          text: 'Cerrar',
          disabled: false,
          onClick: () => { dataSendMail.dataModalAlert.isActive = 'hidde' }
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

    dataSendMail.dataModalAlert = {
      isActive: 'show',
      dataButton: {
        className: 'blue',
        text: 'Cerrar',
        disabled: false,
        onClick: () => { dataSendMail.dataModalAlert.isActive = 'hidde' }
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
<style scoped src="./SendMail.page.scss"></style>