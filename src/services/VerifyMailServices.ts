// VerifyMailService.ts
import axios from 'axios';

const VerifyMailService = {

    async validateMail(data: any) {
        try {
            const response = await axios.post('/api/administration/verify_mail/', data);
            localStorage.setItem('userEmail', response.data.response.email);
        } catch (error: any) {
            throw new Error("Error");
        }
    },

    async resetPassword(data: any) {
        data.email = localStorage.getItem('userEmail');
        console.log(data);

        try {
            await axios.post('/api/administration/reset_password/', data);

        } catch (error: any) {
            throw new Error("Error");

        }
    },

};

export default VerifyMailService;
