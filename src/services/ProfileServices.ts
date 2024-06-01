// ProfileService.ts
import axios from 'axios';
import { accessStore } from '../store/index.ts'; // Importa el store como un export nombrado
import constants from '../constants/index.js'

import { ref } from 'vue';



const ProfileService = {
    profile_data: ref([]),


    async getAllProfiles() {
        try {
            const dataListRad = await axios.get('/api/administration/profiles/');
            console.log(dataListRad.data.response);
            return dataListRad.data.response;

        } catch (error: any) {
        }
    },

    async createProfile(data: any) {
        try {
            await axios.post('/api/administration/profiles/', data);
            console.log(data);
            console.log('Working');
        } catch (error) {
            console.log(error);
        }
    },

};

export default ProfileService;
