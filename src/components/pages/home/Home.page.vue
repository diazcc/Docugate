<template lang="">
    <HomeTemplate :dataHomeTemplate="dataHomeTemplate"/>
</template>
<script setup lang="ts">
import HomeTemplate from "../../templates/home/Home.template.vue";
import { onBeforeMount, onBeforeUnmount, onMounted, reactive } from "vue";
import LoginService from "../../../services/testService"; //TODO MUST BE IMPROVE OR UPDATE !!!!!!!
import UserService from "../../../services/UserServices";
import { useRouter } from "vue-router";
const router = useRouter();

const dataHomeTemplate: any = reactive({
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
      isActiveTRD: false,
      onClickDependences: () => {
        router.push("/home/dependences");
        dataHomeTemplate.dataHeaderOrganism.dataMenuConfigHeader.isActive = false; //Close menu after click
      },
      onClickUsers: () => {
        router.push("/home/user");
        dataHomeTemplate.dataHeaderOrganism.dataMenuConfigHeader.isActive = false;
      },
      onClickRoles: () => {
        router.push("/home/role");
        dataHomeTemplate.dataHeaderOrganism.dataMenuConfigHeader.isActive = false;
      },
      onClickTrd: () => {
        dataHomeTemplate.dataHeaderOrganism.dataMenuConfigHeader.isActiveTRD = true;
      }

    }
  },
  dataMenu: {
    path: {}
  }
});

onBeforeMount(() => {
  setDataHeader();
  getModulesMenu();
});

function getModulesMenu(){
  UserService.getPaths()
    .then((response: any) => {
      dataHomeTemplate.dataMenu.path = response.map((data: any) => ({
        ...data,
        state: false
      }));
      console.log(response);
    });
}

function setDataHeader() {
  dataHomeTemplate.dataHeaderOrganism.dataUserMenuHeader = {
    classUserMenuHeader: "",
    dataUserListMenuHeader: {
      class: "",
      redirectEditPerfil: () => {
        console.log("edit");
      },
      logOut: () => {
        logOut();
      },
    },
    dataText: {
      classText: "bold",
      text: "Andres Diaz",
      disabled: false,
      onClick: () => { },
    },
    dataImg: {
      id: "",
      name: "password",
      class: "icon-user",
      src: "/foto.png",
      type: "png",
      alt: "",
      disabled: false,
      onClick: () => { },
    },
    showMenu: () => {
      dataHomeTemplate.dataHeaderOrganism.dataUserMenuHeader.classUserMenuHeader =
        "focused";
      dataHomeTemplate.dataHeaderOrganism.dataUserMenuHeader.dataUserListMenuHeader.class =
        "show";
    },
  };
}





/**
 * 
 * TODO ############### FUNCTIONS ###############
 */

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function setStateMenuAside(path: any, index: any) {
  dataHomeTemplate.dataMenu.path = dataHomeTemplate.dataMenu.path.map((data: any) => ({
    ...data,
    state: false
  }));
  dataHomeTemplate.dataMenu.path[index].state = true;
}

function openMenuConfiguration() {

  dataHomeTemplate.dataHeaderOrganism.dataMenuConfigHeader.isActive = true;
  dataHomeTemplate.dataHeaderOrganism.dataNavegationOptionsHeader.dataCardNotificationsConfig.isActive = true;
  console.log(dataHomeTemplate.dataHeaderOrganism.dataMenuConfigHeader.isActive);
  // router.push("/home/dependences");

}

function logOut() {
  LoginService.logOut();
  router.push("/");
}

function handleClickOutside(event: any) {
  const menuHeader = document.getElementById("menuHeader");
  if (menuHeader && !menuHeader.contains(event.target)) {
    // El clic ocurrió fuera de la sección
    dataHomeTemplate.dataHeaderOrganism.dataUserMenuHeader.classUserMenuHeader =
      "";
    dataHomeTemplate.dataHeaderOrganism.dataUserMenuHeader.dataUserListMenuHeader.class =
      "";
  }
}
</script>
<style scoped src="./Home.page.scss"></style>