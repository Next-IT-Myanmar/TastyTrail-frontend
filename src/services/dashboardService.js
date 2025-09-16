import api from './openApi';

export const getDashboard = async () => {
    try {
        const response = await api.get('/dashboard');
        return response.data;
    } catch (error) {
        throw error;
    }
};