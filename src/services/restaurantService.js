import api from './openApi.js';
// import axios from 'axios';

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
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateRestaurant = async (id, formData) => {
    try {
        const response = await api.patch(`/restaurants/${id}`, formData,{
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
        const response = await api.get(`/restaurants/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRestaurant = async (id) => {
    try {
        const response = await api.delete(`/restaurants/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRestaurantsByCountry = async (countryIds, page = 1, limit = 10) => {
    try {
        const response = await api.get('/restaurants/by-country-cuisines', {
            params: {
                countryIds,
                page,
                limit,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};