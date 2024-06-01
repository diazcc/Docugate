import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import constants from "../constants/index.js";

export const accessStore = defineStore("global", () => {
  const access:any = ref("");
  const refresh:any = ref("");
  const tenant_value = ref("auth");
  const uploadedFiles:any = ref<File[]>([]); // Get files pdfs
  const formatString = (template:any, ...args:any) => {
    return template.replace(/{([0-9]+)}/g, function (match:any, index:any) {
      return typeof args[index] === "undefined" ? match : args[index];
    });
  };

  function initializeStore() {
    axios.defaults.baseURL = formatString(
      constants["DEFAULT_BASE_URL"],
      tenant_value.value
    );
    if (localStorage.getItem("access")) {
      access.value = localStorage.getItem("access");
      refresh.value = localStorage.getItem("refresh");
    } else {
      access.value = "";
      refresh.value = "";
    }
  }

  async function setAccess(accessData:any) {
    access.value = accessData;
  }

  async function setRefresh(refreshData:any) {
    refresh.value = refreshData;
  }

  function setTenant(tenantData:any) {
    tenant_value.value = tenantData;
    axios.defaults.baseURL = formatString(constants['DEFAULT_BASE_URL'], tenant_value.value);
  }
  async function isAuthenticated() {
    return (await access.value) !== "" && (await refresh.value) !== "";
  }
  // Agregar archivo al array de archivos cargados
  function addUploadedFile(file:any) {
    console.log(file);
    uploadedFiles.value.push(file);
    console.log(uploadedFiles);
  }

  // Eliminar archivo del array de archivos cargados
  function removeUploadedFile(index:any) {
    uploadedFiles.value.splice(index, 1);
  }

  // Enviar archivos al servidor
  async function uploadFiles() {
    const formData = new FormData();
    uploadedFiles.value.forEach((file:any) => {
      formData.append("files", file);
    });

    // Envía formData a través de Axios
    try {
      const response = await axios.post("/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar archivos:", error);
    }
  }

  return {
    access,
    refresh,
    tenant_value,
    uploadedFiles,
    initializeStore,
    setAccess,
    setRefresh,
    setTenant,
    isAuthenticated,
    addUploadedFile,
    removeUploadedFile,
    uploadFiles,
  };
});
