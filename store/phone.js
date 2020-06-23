export const state = () => ({
    dialogPhone: false,
    article: ''
})

export const mutations = {
    setDialog(state, value) {
        state.dialogPhone = value.dialog;
        state.article = value.article;
    }
}

export const actions = {
    change({commit}, value) {
        commit('setDialog', value)
    }
}

export const getters = {
    dialogPhone: s => s.dialogPhone,
    article: s => s.article
}