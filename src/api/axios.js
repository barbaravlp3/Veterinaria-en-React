import axios from 'axios';

// Conexión con el backend de Express
const api = axios.create({
    baseURL: 'http://localhost:4800/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;