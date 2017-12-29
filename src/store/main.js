import Vue from 'vue';
import Vuex from 'vuex'
import swal from 'sweetalert2'
import router from '../router'
Vue.use(Vuex)

const state = {
    user: {
        token: null,
        username: null,
    }
}

const mutations = {
}

const getters = {
}

const actions = {
    getToken ({ commit }, data) {
        Vue.http.get('http://localhost:3000/bnet/user/login', data).then( response => {
            console.log( response.body )
        })
    }
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
})

export default store
  
