import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
    token: null,
    login: null
})

export const mutations = {
    setToken(state, formData) {
        state.token = formData.token;
        state.login = formData.login;
    },
    clearToken(state){
        state.token = null
        state.login = null
    }
}

export const actions = {
    async login({commit, dispatch}, formData){
        try{
            const user = await this.$axios.$post('api/auth/admin/login', formData)
            dispatch('setToken', user)
        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    setToken({commit}, user) {
        this.$axios.setToken(user.token, 'Bearer')
        commit('setToken', user)
        Cookies.set('jwt-token', user.token)
        Cookies.set('login', user.login)
    },
    logout({commit}) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
        Cookies.remove('login')
    },
    autoLogin({dispatch}){
        const cookieStr = process.browser
        ? document.cookie
        : this.app.context.req.headers.cookie

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']
        const login = cookies['login']

        if(isJWTValid(token)){
            const user = {
                token: token,
                login: login,
            }
            dispatch('setToken', user)
        } else{
            dispatch('logout')
        }

    }
}

export const getters = {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token,
    login: state => state.login
}

function isJWTValid(token) {
    if(!token){
        return false
    }

    const jwtData = jwtDecode(token) || {}
    const expires = jwtData.exp || 0

    return (new Date().getTime() / 1000) < expires
}