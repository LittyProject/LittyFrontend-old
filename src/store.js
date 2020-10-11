import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authState: false,
        user: {},
        currentServer: null,
        currentChannel: null,
        socket: null
    },
    getters: {
        getUserData: state => state.user,
        getServerData: state => state.currentServer,
        isAuthorized: state => state.authState,
        getSocket: state => state.socket,
        getChannelData: state => state.currentChannel
    },
    mutations: {
        ASSIGN_USER_DATA: (state, payload) => {
            state.user = payload;
        },
        TOGGLE_AUTH_STATE: (state, payload) => {
            state.authState = payload;
        },
        ASSIGN_SOCKET: (state, payload) => {
            state.socket = payload;
        },
        RESET_STATE: state => {
            state.authState = false;
            state.user = {};
            state.currentRoom = null;
            state.rooms = [];
        }
    },
    actions: {
        saveUserData: (context, payload) => {
            context.commit('ASSIGN_USER_DATA', payload);
        },
        toggleAuthState: (context, payload) => {
            context.commit('TOGGLE_AUTH_STATE', payload);
        },
        assignSocket: (context, payload) => {
            context.commit('ASSIGN_SOCKET', payload);
        },
        deleteUserAccount: context => {
            axios.delete('/api/users/@me').then(() => {
                context.commit('RESET_STATE');
                context.commit('ASSIGN_SOCKET', null);
                localStorage.clear();
                router.push({ name: 'Login' });
            });
        }
    }
});
