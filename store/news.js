export const state = () => ({
    items: [],
    page: 1,
    page_count: 0,
    total: 0
})

export const mutations = {
    setItems(state, res) {
        state.items = res.docs;
        state.page = res.page;
        state.page_count = res.totalPages;
        state.total = res.totalDocs;
    },
    setPage(state, page) {
        state.page = page;
    }
}

export const actions = {
    async fetchItems({commit, dispatch}, params){
        try{
            const items = await this.$axios.$get(encodeURI('api/news/admin' + params))
            commit('setItems', items);
        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async deleteItem({commit, dispatch}, id){
        try{
            await this.$axios.$delete(encodeURI('api/news/admin/' + id))
        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async backItem({commit, dispatch}, id){
        try{
            await this.$axios.$put(encodeURI('api/news/admin/back/' + id))
        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async goToPage({commit, dispatch}, params){
        try{
            document.getElementById("news-scroll").scrollIntoView(true);
            window.scroll(0, window.scrollY - 60);

            const items = await this.$axios.$get(encodeURI('api/news/admin' + params))
            commit('setItems', items);

        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async addView({commit, dispatch}, id){
        try{
            await this.$axios.$put(encodeURI('api/news/admin/back/' + id))
        }
        catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
}

export const getters = {
    items: s => s.items,
    page: s => s.page,
    page_count: s => s.page_count,
    total: s => s.total
}