import api from './openApi';

export const createCuisine = async (formData) => {
    try {
        const response = await api.post('/cuisines', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCuisines = async (page=1, limit=10) => {
    try {
       const response = await api.get('/cuisines', {
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

export const getCuisineDetail = async (id) => {
    try {
        const response = await api.get(`/cuisines/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateCuisine = async (id, formData) => {
    try {
        const response = await api.patch(`/cuisines/${id}`, formData, {
            headers: {
                'Content-Type':'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
            throw error;
    }
};

export const deleteCuisine = async (id) => {
    try {
        const response = await api.delete(`/cuisines/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};