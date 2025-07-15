import api from './openApi.js';

export const createSlider = async (formData) => {
    try {
        const response = await api.post('/sliders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const getSliderLists = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/sliders', {
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

export const getSliderDetail = async (id) => {
    try {
        const response = await api.get(`/sliders/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSlider = async (id, formData) => {
    try {
        const response = await api.patch(`/sliders/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteSlider = async (id) => {
    try {
        const response = await api.delete(`/sliders/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};