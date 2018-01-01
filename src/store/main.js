import Vue from 'vue';
import Vuex from 'vuex'
import swal from 'sweetalert2'
import router from '../router'
Vue.use(Vuex)

const state = {
    loading: false,
    token: null,
    user: null,
    top: null,
}

const mutations = {
    loadingActive (state) {
        if (this.state.loading == true) {
            this.state.loading = false
        } else {
            this.state.loading = true
        }
    },
    clearProfile (state) {
        this.state.user = null
        localStorage.removeItem('token')
        this.state.token = localStorage.token
        swal({
            title: 'Logged out',
            html: 'ทำการออกจากระบบ.',
            type: 'success'
        })
    },
    updateToken (state, token) {
        this.state.token = token
        localStorage.token = token
        window.history.replaceState(null, null, window.location.pathname);
    },
    updateProfile (state, token) {
        Vue.http.post('https://grabkeys.net:3443/bnet/get', JSON.stringify({ token: token })).then( response => {
            if (!response.body) {
                this.state.user = null
                this.state.token = null
                localStorage.removeItem('token')
            } else if (response.body && response.status == 200) {
                this.state.token = response.body.blizzard.token;
                this.state.user = response.body;
            }
            window.history.replaceState(null, null, window.location.pathname);
        }).catch( error => {
            this.state.user = null
            localStorage.removeItem('token')
            this.state.token = localStorage.token
            if (error.body == 'token does not match.') {
                swal({
                    title: 'Token does not match',
                    html: 'กรุณาเข้าสู่ระบบใหม่.',
                    type: 'error'
                })
            } else {
                swal({
                    title: 'Error',
                    html: 'เกิดข้อผิดพลาดกรุณาลองใหม่ทีหลัง.',
                    type: 'error'
                })
            }

        })
    },
    top100 (state) {
        Vue.http.get('https://grabkeys.net:3443/bnet/top').then (response => {
            this.state.top = response.body;
        })
    }
}

const getters = {
}

const actions = {
    getProfile ({ commit }, token) {
        Vue.http.get('https://us.api.battle.net/account/user?access_token=' + token).then( response => {
            if (response.body && response.status == 200) {
                localStorage.setItem('token', token)
                commit('updateProfile', response.body)
            }
        })
    },
    updateToken ({ commit }, token) {
        commit('updateToken', token)
        commit('updateProfile', token)
    }
}

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
})

export default store
  
