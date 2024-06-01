// RoleService.ts
import axios from 'axios';
import { accessStore } from '../store/index.ts'; // Importa el store como un export nombrado
import constants from '../constants/index.js'

import { ref } from 'vue';



const RoleService = {
    role_data: ref([]),


    async getAllRoles() {
        try {
            const dataListRad = await axios.get('/api/administration/roles/');
            return dataListRad.data.response;

        } catch (error: any) {
        }
    },

    async createRole(data: any) {
        try {
            await axios.post('/api/administration/roles/', data);
            console.log(data);
            console.log('Working');
        } catch (error) {
            console.log(error);
        }
    },

};

export default RoleService;
