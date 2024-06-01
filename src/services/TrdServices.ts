// LoginService.ts
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const TrdServices = {

    

    getSeries() {
        return axios.get('/api/administration/series')
            .then(response => response.data.response)
            .catch(error => {
                console.error('Error al obtener series:', error);
                throw error;
            });
    },
    getSubseries() {
        return axios.get('/api/administration/sub_series')
            .then(response => response.data.response)
            .catch(error => {
                console.error('Error al obtener series:', error);
                throw error;
            });
    },
    getDocumentaryType() {
        return axios.get('/api/administration/documentary_type')
            .then(response => response.data.response)
            .catch(error => {
                console.error('Error al obtener series:', error);
                throw error;
            });
    },
    getRelationshipMatrix() {
        return axios.get('/api/administration/relationship_matrix')
            .then(response => response.data.response)
            .catch(error => {
                console.error('Error al obtener series:', error);
                throw error;
            });
    },
    sendSubserie(data:any) {
        return axios.post('/api/administration/sub_series/', data)
            .then(response => response.data.response);
    }
    ,
    sendSerie(data:any) {
        return axios.post('/api/administration/series/', data)
            .then(response => response.data.response);
    }
    ,
    sendDocumentaryType(data:any) {
        return axios.post('/api/administration/documentary_type/', data)
            .then(response => response.data.response);
    }
    ,
    sendRelationshipMatrix(data:any) {
        return axios.post('/api/administration/relationship_matrix/', data)
            .then(response => response.data.response);
    }

};

export default TrdServices;
