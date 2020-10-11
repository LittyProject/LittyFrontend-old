import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import axios from 'axios';
import io from 'socket.io-client';
import setAuthToken from './utils/authToken';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icons', /^ion-/];
Vue.prototype.moment = moment;

let socket = null;

/** Socket IO Client - Store in Vuex State for use in components */


store.dispatch('assignSocket', socket);

/** Check for auth token on refresh and set authorization header for incoming requests */
if (localStorage.token) {
    setAuthToken(localStorage.token);

    if (process.env.NODE_ENV === 'development') {
        socket = io('http://localhost:8081', {'reconnection': true, 'reconnectionDelay': 5000, 'maxReconnectionAttempts':10});
    } else {
        socket = io('/api/', {'reconnection': true, 'reconnectionDelay': 5000, 'maxReconnectionAttempts':10});
    }

    socket.emit("authentication", {token: localStorage.token});
    store.dispatch('assignSocket', socket);
} else {
    setAuthToken(null);
}

/** Axios Request Intercept */
axios.interceptors.request.use(
    function(config) {
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

/** Axios Response Intercept */
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(err) {
        if (err.response.status === 401) {
            localStorage.removeItem('token');
            router.push({
                name: 'Login',
                params: { message: 'Session end, please login again.' }
            });
        }
        return Promise.reject(err);
    }
);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
