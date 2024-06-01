// DependenceService.ts
import axios from 'axios';

const FilesServices = {

    async getFiles() {
        try {
            const dataListRad = await axios.get('/api/archive/archive/');
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
    async getDocumentContent(url: any) {
        try {
            const response: any = await axios.get('/api/correspondence/records/?document_url=' + url);
            return axios.defaults.baseURL + response.data.response;
        } catch (error: any) {
            console.log(error);
            throw error.response.statusText;
        }
    },

};

export default FilesServices;
