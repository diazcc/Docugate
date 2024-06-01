// LoginService.ts
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const FilingServices = {

    async sendResponseData(id_record: any, data: any) {
        try {
            const response = await axios.put("api/correspondence/records/" + id_record + "/salida", data) 
            return response
        } catch (error: any) {
            console.log(error, 'error');
            return error.response
        }
    },

    async sendAssingData(id_user: any, data: any) {
        try {
            const response = await axios.put("api/correspondence/records/" + id_user + "/asignar", data) 
            return response
        } catch (error: any) {
            console.log(error, 'error');
            return error.response
        }
    },

    async getRemitters(){
        try {
            const response = await axios.get('/api/correspondence/remitters/')
            return response.data;
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getResponseModes(){
        try {
            const response = await axios.get('/api/correspondence/response_modes/')
            return response.data;
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getDependences(){
        try {
            const response = await axios.get('/api/administration/dependences/')
            return response.data;
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getParentDependences(){
        try {
            const response = await axios.get('/api/administration/dependences/?all_parent_dependencies=parent')
            return response.data.response
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getUsersDependence(id_dependece: any){
        try {
            const response = await axios.get('/api/administration/dependences/?code_dependence=' + id_dependece)
            return response.data
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getCountries(){
        try {
            const response = await axios.get('/api/administration/countries/')
            return response.data
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getCountriesStates(id_country: any){
        try {
            const response = await axios.get('/api/administration/countries/?country=' + id_country)
            return response.data;
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getStatesCities(id_state: any){
        try {
            const response = await axios.get('/api/administration/countries/?state=' + id_state)
            return response.data
        } catch (error) {
            console.log(error, 'error');
        }
    },

    async getRecord(id: any){
        try {
            const response = await axios.get('/api/correspondence/records/' + id)
            return response.data;
        } catch (error) {
            return error
        }
    },
    async getDocumentContent(url: any,id:any){
        try {
            const response = await axios.get('/api/correspondence/records/'+id+'?document_url=' + url);
            return axios.defaults.baseURL + response.data.response;
        } catch (error) {
            return error
        }
    },

};

export default FilingServices;
