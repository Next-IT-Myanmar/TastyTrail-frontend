import api from './openApi.js';

export const createCurrency = async (formData) => {
    try {
        const response = await api.post('/currency', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrencyLists = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/currency', {
            params: {
                page,
                limit,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateCurrency = async (id, formData) => {
    try {
        const response = await api.patch(`/currency/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCurrencyDetail = async (id) => {
    try {
        const response = await api.get(`/currency/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCurrency = async (id) => {
    try {
        const response = await api.delete(`/currency/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};