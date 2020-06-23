export const state = () => ({
    dialog: false,
    id: '',
    article: '',
    module: '',
    part: {}
})

export const mutations = {
    setSell(state, value) {
        state.dialog = true;
        state.id = value.id;
        state.article = value.article;
        state.module = value.module;
        state.part = value.part;
    },
    setDialog(state, value) {
        state.dialog = value;
    }
}

export const actions = {
    sell({commit}, value) {
        commit('setSell', value)
    }
}

export const getters = {
    dialog: s => s.dialog,
    id: s => s.id,
    article: s => s.article,
    module: s => s.module,
    part: s => s.part
}