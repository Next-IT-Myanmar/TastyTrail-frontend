import api from './openApi';

export const createCategory = async (formData) => {
    try {
        const response = await api.post('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (id, formData) => {
    try {
        const response = await api.patch(`/categories/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCategories = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/categories', {
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

export const getCategoryDetail = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
