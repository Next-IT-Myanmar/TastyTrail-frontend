import api from './openApi.jsx';

export const createRestaurant = async (fromData) => {
    try {
        const response = await api.post('/restaurants', fromData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRestaurantLists = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/restaurants', {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRestaurant = async (id, formData) => {
    try {
        const response = await api.patch('/restaurants/${id}', formData,{
            headers: {
                'Content-Type':'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getRestaurantDetail = async (id) => {
    try {
        const response = await api.get('/restaurants/${id}');
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteRestaurant = async (id) => {
    try {
        const response = await api.delete('/restaurants/${id}');
        return response;
    } catch (error) {
        throw error;
    }
}