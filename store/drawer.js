export const state = () => ({
    drawer: false,
    active: 0
})

export const mutations = {
    setDrawer(state, value) {
        state.drawer = value;
    },
    setActive(state, value) {
        state.active = value;
    }
}

export const actions = {
    change({commit}, value) {
        commit('setDrawer', value)
    },
    async getActiveCount({commit}){
        try{
            const res = await this.$axios.$get('api/order/admin/active')
            commit('setActive', res.length);
        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
}

export const getters = {
    drawer: s => s.drawer,
    active: s => s.active
}