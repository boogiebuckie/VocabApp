import axios from 'axios';
import Vue from 'vue';  
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

// Create a Vue instance to access globally for flash messages
const vm = new Vue();
const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/words/';

const handleError = (fn) => async (...params) => {
    try {
        return await fn(...params);
    } catch (error) {
        vm.flash(`Error: ${error.response?.statusText || 'Unknown error'}`, 'error');
        console.error('API error:', error); // For debugging
    }
};

export const api = {
    getWord: handleError(async (id) => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),

    getWords: handleError(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    }),

    deleteWord: handleError(async (id) => {
        const res = await axios.delete(baseURL + id);
        return res.data;
    }),

    createWord: handleError(async (payload) => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),

    updateWord: handleError(async (payload) => {
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data;
    })
};
