// LoginService.ts
import axios from 'axios';
import { accessStore } from '../store/index.ts'; // Importa el store como un export nombrado

import constants from '../constants/index.js'

import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();



const UserService = {
    user_data: ref([]),
    tenants_list: ref([]),
    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post('/auth/jwt/create/', { email, password });
            const access = response.data.access;
            const refresh = response.data.refresh;
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            axios.defaults.headers.common['Authorization'] = 'JWT ' + access;
            return true;
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            throw error;
        }
    },

    checkLoggedIn(): boolean {
        const access = localStorage.getItem('access');
        return !!access;
    },

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
    async registerExternalUser(data: any): Promise<boolean> {
        const userData = {
            username: data.userName,
            email: data.email,
            password: data.password
        }
        try {
            const response = await
                axios
                    .post('/administration/external_users/', userData);
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
            router.push('/');
            return null;
        }
    },

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
                    .catch(() => {
                        router.push('/');

                    })

                return response;
            } else {
                return null;
            }
        } catch (error) {
            router.push('/');

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
                    router.push('/');

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
                .catch(() => {
                })



        } catch (error) {
            router.push('/');
            return null;
        }
    },

    getAccess() {
        const store = accessStore();
        const access = store.access;
        if (access) {

            axios.defaults.headers.common['Authorization'] = 'JWT ' + access
        } else {
            axios.defaults.headers.common['Authorization'] = ''
        }

        function getAccess() {
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

                axios
                    .post('/auth/jwt/refresh/', accessData)
                    .then(response => {

                        const access = response.data.access
                        console.log('access: ' + access);

                        localStorage.setItem('access', access)
                        store.setAccess(access)
                    })
                    .catch((error: any) => {
                        console.log(error)
                    })
            }
        }




        setInterval(() => {
            getAccess();
            console.log('interval');
            const access = accessStore();
            access.initializeStore();
        }, constants['REFRESH_TOKEN_INTERVAL_MS'])
    },

    async getRecordsSent() {
        try {
            const dataListRad = await axios.get('api/correspondence/records/?sent=sent');
            return dataListRad.data;

        } catch (error: any) {
        }
    },

    async getAllFilings() {
        try {
            const dataListRad = await axios.get('/api/correspondence/records/');
            return dataListRad.data;

        } catch (error: any) {
        }
    },

    async sendFilingData(data: any) {
        return await axios.post('/api/correspondence/records/', data)
    },

    async getDependences() {
        return await axios.get('/api/correspondence/filings/');
    },

    async getFiling(code: String) {
        return await axios
            .get('/api/correspondence/filings/' + code)
            .then(response => {
                console.log(response, 'response');
                return response.data
            }).catch((error: any) => {
                console.log(error);
            })
    },


    async getAllUsers() {
        try {
            const dataListRad = await axios.get('/api/administration/users/');
            return dataListRad.data.response;

        } catch (error: any) {
        }
    },

    async createUser(data: any) {
        try {
            await axios.post('/api/administration/users/', data);
        } catch (error: any) {
            console.log(error);
        }
    },


     getPaths() {
            return axios.get('/api/administration/module_path/')
            .then((response:any)=>response.data.response.modules)
            .catch((error:any)=>error);
     }

};

export default UserService;
