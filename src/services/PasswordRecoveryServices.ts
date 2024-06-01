// PasswordRecoveryService.ts
import axios from 'axios';

const RecoverPasswordService = {

    async validateMail(data: any) {
        try {
            const response = await axios.post('/api/administration/send_mail/', data);
            localStorage.setItem('userEmail', response.data.response.email);
        } catch (error: any) {
            throw new Error("Error");
        }
    },

};

export default RecoverPasswordService;
