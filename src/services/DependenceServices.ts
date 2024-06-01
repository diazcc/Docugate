// DependenceService.ts
import axios from 'axios';

const DependenceService = {

    async getAllDependences() {
        try {
            const dataListRad = await axios.get('/api/administration/dependences/');
            return dataListRad.data.response;
        } catch (error: any) {
        }
    },

    async createDependence(data: any) {
        try {
            await axios.post('/api/administration/dependences/', data);

        } catch (error: any) {
            console.log(error);
        }
    },

};

export default DependenceService;
