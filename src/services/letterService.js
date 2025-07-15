import api from './openApi.js';

export const subscribeNewLetter = async (email) => {
    try{
        const response = await api.post('/newsletter', {email}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLetterSubscriptions = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/newsletter', {
            params: {
                page,
                limit
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteLetterSubscription = async (id) => {
    try {
        const response = await api.delete(`/newsletter/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};