import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('userdata')) || null,
        token: JSON.parse(localStorage.getItem('token')) || null,
        isUserLoggegIn: JSON.parse(localStorage.getItem('token')) ? true : false,
    },

    mutations: {
        setUser(state, user){
            state.user = user;
            state.isUserLoggegIn = !!user;
        },

        setToken(state, token) {
            state.token = token;
        },

        clearUser(state){
            state.user = null;
            state.token = null;
            state.isUserLoggegIn = false;
        }
    },

    actions: {
        login({commit}, {user, token}) {
            commit('setUser', user);
            commit('setToken', token);
        },

        logout({ commit }) {
            commit('clearUser');
        }
    },

    getters: {
        isAuthenticated: state => !!state.user,
        getUser: state => state.user,
        getToken: state => state.token
    },

})

export default store