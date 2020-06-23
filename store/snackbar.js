export const state = () => ({
    snackbar: false,
    text: ''
})

export const mutations = {
    setSnackbar(state, value) {
        state.snackbar = true;
        state.text = value;
    },
    remSnackbar(state) {
        state.snackbar = false;
        state.text = '';
    }
}

export const actions = {
    show({commit}, value) {
        commit('setSnackbar', value)
    },
    remove({commit}) {
        commit('remSnackbar')
    }
}

export const getters = {
    snackbar: s => s.snackbar,
    text: s => s.text
}