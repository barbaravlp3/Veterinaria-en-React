import api from '../api/axios.js';

// Hook personalizado para centralizar las peticiones a la API
export const useApi = (endpoint) => {

    // GET
    const get = async (id = '') => {
        try {
            const url = id ? `${endpoint}/${id}` : endpoint;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener ${endpoint}:`, error);
            throw error;
        }
    };

    // POST
    const create = async (data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`Error al crear ${endpoint}:`, error);
            throw error;
        }
    };

    // PUT
    const update = async (id, data) => {
        try {
            const response = await api.put(`${endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar ${endpoint}:`, error);
            throw error;
        }
    };

    // DELETE
    const remove = async (id) => {
        try {
            await api.delete(`${endpoint}/${id}`);
        } catch (error) {
            console.error(`Error al eliminar ${endpoint}:`, error);
            throw error;
        }
    };

    return {
        get,
        create,
        update,
        remove
    };
};
