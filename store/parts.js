export const state = () => ({
    parts: [],
    page: 1,
    totalPages: 0,
    totalParts: 0,
    ld: false,
    article: '',
    titleParts: ''
})

export const mutations = {
    setParts(state, res) {

        state.parts = [];
        state.page = res.page;
        state.totalPages = res.totalPages;
        state.totalParts = res.totalDocs;
        state.ld = true;

        if(state.parts.length === 1){
            state.article= state.parts[0].article;
        }

        let title = '';

        if(res.docs.length !== 0){
            let make = res.qr.make ? ' для ' + res.qr.make : '';
            let model = res.qr.model ? ' ' + res.qr.model : '';
            let generation = res.qr.generation && res.qr.generation !== 'Поколение отсутствует' ? ' ' + res.qr.generation : '';

            if(res.qr.part){
                title = res.qr.part + make + model + generation;
            }
            else{
                title = "Б/у автозапчасти" + make + model + generation
            }

            for(let arPart of res.docs){

                if(arPart.image.length !== 0){
                    const arArticle = parseInt(arPart.article.split('6_')[1]);

                    if(arArticle < 7226){
                        for (let [index, apImage] of arPart.image.entries()) {
                            if(apImage.includes('bamper')){
                                arPart.image.splice(index, 1)
                            }
                        }
                    }

                }

                state.parts.push(arPart)
            }
        }

        if(title !== 'Б/у автозапчасти'){
            state.titleParts = title;
        }
        else{
            state.titleParts = null
        }
    },
    setPage(state, page) {
        state.page = page;
    }
}

export const actions = {
    async fetch({commit}, query) {

        try{
            const res = await this.$axios.$get(encodeURI('https://bampart.com/' +
                'api/site/parts'), {
                params: query,
                headers: { 'token': 'e9205276-6370-42b7-8424-d31c4bb6a4cf' }
            })

            res.qr = query;
            commit('setParts', res);
        }
        catch (e) {
            commit('setParts', {
                docs: [],
                page: 1,
                totalPages: 0,
                totalDocs: 0,
                qr: null
            });
        }

    }
}

export const getters = {
    parts: s => s.parts,
    page: s => s.page,
    totalPages: s => s.totalPages,
    totalParts: s => s.totalParts,
    article: s => s.article,
    ld: s => s.ld,
    titleParts: s => s.titleParts
}