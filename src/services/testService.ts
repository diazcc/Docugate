// LoginService.ts
import axios from 'axios';
import { accessStore } from '../store/index.ts'; // Importa el store como un export nombrado

import constants from '../constants/index.js'

import { ref } from 'vue';



const loginService = {
  user_data: ref([]),
  tenants_list: ref([]),
  async login(email: string, password: string): Promise<boolean> {
    try {
      // Realizar la solicitud de inicio de sesión
      const response = await axios.post('/auth/jwt/create/', { email, password });

      // Extraer tokens de la respuesta
      const access = response.data.access;
      const refresh = response.data.refresh;

      // Guardar tokens en el almacenamiento local
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // Establecer el token de acceso en las cabeceras de autorización para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = 'JWT ' + access;

      return true; // Indicar que el inicio de sesión fue exitoso
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error; // Lanzar el error para que el componente pueda manejarlo
    }
  },

  checkLoggedIn(): boolean {
    // Verificar si el token de acceso está presente en el almacenamiento local
    const access = localStorage.getItem('access');
    return !!access; // Devolver true si el token de acceso existe, false de lo contrario
  }

  ,
  async register(data: any): Promise<boolean> {

    const userData = {
      username: data.userName,
      email: data.email,
      password: data.password
    }

    try {
      const response = await
        axios
          .post('/auth/users/', userData);
      console.log(response);

      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  },

  async logOut() {
    const access = accessStore();
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    access.setTenant(constants['DEFAULT_TENANT'])
    access.access = ''
    access.refresh = ''
  },
  async getMe() {
    try {
      const access = localStorage.getItem('access');

      if (access) {
        const response = await axios.get('/auth/users/me');

        return response.data; // Devolver todos los datos del usuario
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  ,
  async getMyTenants() {

    try {
      const access = localStorage.getItem('access');

      if (access) {
        const formData = {
          token: access
        }

        const response = await axios
          .post('/auth/login_jwt', formData)
          .then(response => {
            this.tenants_list.value = response.data.tenants
            return this.tenants_list.value;
          })
          .catch((error: any) => {

          })

        return response;
      } else {
        return null;
      }
    } catch (error) {

      return null;
    }
  },
  setUserTenant(tenant: any) {
    const access = localStorage.getItem('access')
    const store = accessStore();
    console.log('setUserTenant')

    if (access) {
      const formData = {
        token: access,
        tenant: tenant
      }

      axios
        .post('/auth/tenant_login_jwt', formData)
        .then(response => {
          const access = response.data.access
          const refresh = response.data.refresh

          if (access) {
            store.setAccess(access)
            store.setRefresh(refresh)

            axios.defaults.headers.common['Authorization'] = 'JWT ' + access

            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)

            store.setTenant(tenant)

            this.getMe();
          }
        })
        .catch((error: any) => {
          console.log(error)

        })
    }
  },
  async get_filing(code: String) {

    try {

      return await axios
        .get('/api/correspondence/filings/' + code)
        .then(response => {
          console.log(response, 'response');
          return response.data
        })
        .catch((error: any) => {
        })



    } catch (error) {
      return null;
    }
  },


  async delete_filing_file_on_media(ref_document: String) {
    return await axios.get('/api/correspondence/filings/?document=' + ref_document);
  },


  getAccess() {
    const store = accessStore();
    const access = store.access;
    if (access) {

      axios.defaults.headers.common['Authorization'] = 'JWT ' + access
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }

    const accessData: any = ref({
      refresh: store.refresh
    });

    if (store.tenant_value && store.tenant_value !== constants['DEFAULT_TENANT']) {
      console.log(accessData.value.tenant);

      accessData.value.tenant = store.tenant_value;
      console.log('accessData.value.tenant');

    }

    if (store.tenant_value === constants['DEFAULT_TENANT']) {
      console.log(accessData.value.tenant);

      delete accessData.value.tenant;
      console.log('delete accessData.value.tenant');

    }

    if (accessData.value.refresh) {

      // axios
      //   .post('/auth/jwt/refresh/', accessData)
      //   .then(response => {

      //     const access = response.data.access
      //     console.log('access: ' + access);

      //     localStorage.setItem('access', access)
      //     store.setAccess(access)
      //   })
      //   .catch((error: any) => {
      //     console.log(error)
      //   })

    }

  }

};

export default loginService;
