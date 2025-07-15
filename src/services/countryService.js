import api from './openApi';

export const createCountry = async (formData) => {
    try {
        const response = await api.post('/countries', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateCountry = async (id, formData) => {
    try {
        const response = await api.patch(`/countries/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteCountry = async (id) => {
    try {
        const response = await api.delete(`/countries/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCountryDetail = async (id) => {
    try {
        const response = await api.get(`/countries/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCountries = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/countries', {
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

