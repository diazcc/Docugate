// DependenceService.ts
import axios from 'axios';

const ExternalUserServices = {

    async getMe() {
        try {
            const dataListRad = await axios.get('/api/');
            return dataListRad.data.response;
        } catch (error: any) {
        }
    },

    async sendFiles(data: any) {
        try {
            await axios.post('/api/administration/files/', data);

        } catch (error: any) {
            console.log(error);
        }
    },

};

export default ExternalUserServices;
