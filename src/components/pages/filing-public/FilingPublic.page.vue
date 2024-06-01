<template>
    <FilingPublic :dataFilingPublic="dataFilingPublic" />
</template>
<script setup lang="ts">
import FilingPublic from "../../templates/filing-public/FilingPublic.template.vue";
import UserService from "../../../services/UserServices";

import {onMounted, reactive} from 'vue';
import { useRouter } from "vue-router";



const router = useRouter();

const dataFilingPublic: any = reactive({
  dataHeaderOrganism: {
    dataUserMenuHeader: {
      classUserMenuHeader: "",
      dataUserListMenuHeader: {
        class: "",
        redirectEditPerfil: () => { },
        logOut: () => { },
      },
      dataText: {
        classText: "",
        text: "Email",
        disabled: false,
        onClick: () => { },
      },
      dataImg: {
        id: "",
        name: "password",
        class: "",
        src: "",
        type: "png",
        alt: "",
        disabled: false,
        onClick: () => { },
      },
      showMenu: () => { },

    },
    dataImgLogo: {
      id: "",
      name: "",
      class: "small",
      src: "/docugate-black.png",
      type: "png",
      alt: "",
      onClick: () => { },
    },
    dataInputSearch: {
      dataInput: {
        id: "",
        name: "",
        classInputEmail: "",
        model: "",
        type: "",
        placeholder: "search",
        disabled: false,
        onClick: () => { },
      },
      dataImg: {
        id: "",
        name: "",
        class: " icon",
        src: "/icon-lupa-general.svg",
        type: "",
        alt: "",
        onClick: () => { },
      },
    },
    dataNavegationOptionsHeader: {
      dataCardNotificationsCalendar: {
        isActive: false,

        dataText: {
          classText: "",
          text: "",
          disabled: false,
          onClick: () => { },
        },
        dataImg: {
          id: "",
          name: "",
          class: " icon",
          src: "/icon-header-calendario.svg",
          type: "png",
          alt: "",
          onClick: () => { },
        },
        onClick: () => {

        }
      },
      dataCardNotificationsInbox: {
        isActive: false,

        dataText: {
          classText: "",
          text: "2",
          disabled: false,
          onClick: () => {

            router.push("/home/dependences");

          },
        },
        dataImg: {
          id: "",
          name: "",
          class: " icon",
          src: "/icon-header-bandeja-cards.svg",
          type: "png",
          alt: "",
          onClick: () => { },
        },
        onClick: () => {

        }
      },
      dataCardNotificationsGeneral: {
        isActive: false,

        dataText: {
          classText: "",
          text: "2",
          disabled: false,
          onClick: () => {

            router.push("/home/users");

          },
        },
        dataImg: {
          id: "",
          name: "",
          class: " icon",
          src: "/icon-header-campana-notificaciones.svg",
          type: "png",
          alt: "",
          onClick: () => {
            router.push("/home/user");
          },
        },
        onClick: () => {

        }
      },
      dataCardNotificationsConfig: {
        isActive: false,
        dataText: {
          classText: "",
          text: "",
          disabled: false,
          onClick: () => {
            router.push("/home/dependences");
          },
        },
        dataImg: {
          id: "",
          name: "",
          class: " icon",
          src: "/icon-header-configuracion.svg",
          type: "png",
          alt: "",
          onClick: () => {
          },
        },
        onClick: () => {
          openMenuConfiguration();
        }
      },
    },
    dataMenuConfigHeader: {
      isActive: false,
      onClickDependences: () => {
        router.push("/home/dependences");
        dataFilingPublic.dataHeaderOrganism.dataMenuConfigHeader.isActive = false;
      },  
      onClickUsers: () => {
        router.push("/home/user");
        dataFilingPublic.dataHeaderOrganism.dataMenuConfigHeader.isActive = false;
      }
    }
  },
  dataMenu: {
    path: {}
  }
});

onMounted(() => {
  getModulesMenu();
});


function getModulesMenu(){
  UserService.getPaths()
    .then((response: any) => {
      dataFilingPublic.dataMenu.path = response.map((data: any) => ({
        ...data,
        state: false
      }));
      console.log(response);
    });
}



function openMenuConfiguration(){


}
</script>
<style scoped src="./FilingPublic.page.scss"></style>