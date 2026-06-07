import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000
});

// gestion d'erreurs
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const paquetAPI = {
    getAll: () => api.get('/paquets'),
    getById: (id, includeCards = false) => 
        api.get(`/paquets/${id}?includeCards=${includeCards}`),
    create: (data) => api.post('/paquets', data),
    update: (id, data) => api.put(`/paquets/${id}`, data),
    delete: (id) => api.delete(`/paquets/${id}`)
};

export const cardAPI = {
    getAll: () => api.get('/cards'),
    getById: (id, includeCards = false) => api.get(`/cards/${id}`),
    getCardsbyPaq: (paq_id) => api.get(`cards/paquet:${paq_id}`),
    create: (data) => api.post('/cards', data),
    update: (id, data) => api.put(`/cards/${id}`, data),
    delete: (id) => api.delete(`/cards/${id}`)
};


export const quizAPI = {
    startQuiz: (deckId) => api.get(`/quiz/start/${paq_Id}`),
};

export default api;