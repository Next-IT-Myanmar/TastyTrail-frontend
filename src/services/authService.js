import api from './openApi';

export const registerUser = async (requestBody) => {
    try {
        // Using the same headers and body format as the successful fetch version
        const response = await api.post('/auth/register', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        return response;
    }catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
