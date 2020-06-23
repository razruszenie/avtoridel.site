export const state = () => ({
    index: null,
    selectedImages: []
})

export const mutations = {
    setImage(state, value) {
        state.index = value.index;
        state.selectedImages = value.selArray;
    },
    setIndex(state, value) {
        state.index = value;
    }
}

export const actions = {
     change({commit}, value) {
         commit('setImage', value)
     }
}

export const getters = {
    index: s => s.index,
    selectedImages: s => s.selectedImages
}