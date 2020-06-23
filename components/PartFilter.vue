<template>

    <v-card tile>
        <v-card-title  style="justify-content: center; background-color: #778899; color: white; padding: 8px;">
            <span style="font-weight: 600; font-size: 18px">ПОИСК ЗАПЧАСТЕЙ</span>
        </v-card-title>

        <v-card-text style="padding: 20px 0; background-color: white">
            <v-layout wrap style="padding: 0 20px">
                <v-flex xs12>
                    <v-autocomplete
                            filled
                            :disabled="disableFilter"
                            height="52px"
                            v-model="markaFilter"
                            :items="markaFilterItems"
                            label="Выберите марку"
                            autocomplete="off"
                            hide-no-data
                            @change="changeMarka(); createFilter()"
                            clearable
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12 class="ac-filled">
                    <v-autocomplete
                            filled
                            height="52px"
                            :disabled="disableFilter"
                            v-model="modelFilter"
                            :items="modelFilterItems"
                            label="Выберите модель"
                            autocomplete="off"
                            hide-no-data
                            @change="createFilter"
                            clearable
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 class="ac-filled">
                    <v-autocomplete
                            filled
                            height="52px"
                            :disabled="disableFilter"
                            v-model="generationFilter"
                            :items="generationFilterItems"
                            label="Выберите поколение"
                            autocomplete="off"
                            hide-no-data
                            @change="createFilter"
                            clearable
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 class="ac-filled">

                    <v-autocomplete
                            filled
                            height="52px"
                            :disabled="disableFilter"
                            v-model="partFilter"
                            :items="partsFilterItems"
                            @change="createFilter"
                            autocomplete="off"
                            hide-no-data
                            label="Выберите запчасть"
                            clearable
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 class="ac-filled" style="display: flex">

                    <v-autocomplete
                            filled
                            height="52px"
                            style="width: 50%"
                            :disabled="disableFilter"
                            v-model="engineFilter"
                            :items="engineFilterItems"
                            @change="createFilter"
                            autocomplete="off"
                            hide-no-data
                            label="Объем"
                            clearable
                    ></v-autocomplete>

                    <v-autocomplete
                            filled
                            height="52px"
                            style="width: 50%; margin-left: 5px;"
                            :disabled="disableFilter"
                            v-model="engine_typeFilter"
                            :items="engine_typeFilterItems"
                            @change="createFilter"
                            autocomplete="off"
                            hide-no-data
                            label="Топливо"
                            clearable
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 class="ac-filled">

                    <v-text-field
                            filled
                            height="52px"
                            :disabled="disableFilter"
                            v-model="numberFilter"
                            label="Артикул или номер запчасти"
                            clearable
                    ></v-text-field>

                </v-flex>

                <v-flex xs12 style="display: flex; justify-content: space-between; margin-top: -5px">
                    <div style="width: 50%; padding-right: 5px">
                        <v-btn color="#B71C1C"
                               outlined
                               block
                               large
                               @click="clear"
                               dark
                        >Сбросить
                        </v-btn>
                    </div>
                    <div style="width: 50%; padding-left: 5px">
                        <v-btn color="primary"
                               @click="showFilter"
                               large
                               block
                               :disabled="disableBtn"
                               :dark="!disableBtn"
                               block>
                            Показать
                        </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {

        props: {
            part: {
                type: Object,
                default: null
            }
        },

        data() {
            return {
                path: '',
                disableFilter: false,
                disableBtn: false,
                markaFilterItems: [],
                modelFilterItems: [],
                generationFilterItems: [],
                partsFilterItems: [],
                engineFilterItems: [],
                engine_typeFilterItems: [],
                markaFilter: '',
                modelFilter: '',
                generationFilter: '',
                partFilter: '',
                engine_typeFilter: '',
                engineFilter: '',
                numberFilter: ''
            }
        },

        methods: {
            clear() {
                if(this.$route.path === '/'){
                    this.clearFilter();
                }
                this.markaFilter = ''
                this.modelFilter = ''
                this.generationFilter = ''
                this.partFilter = ''
                this.engine_typeFilter = ''
                this.engineFilter = ''
                this.numberFilter = ''
                this.disableBtn = false;
                this.getFilters({});
            },

            async clearFilter(){
                document.getElementById("scroll-index").style.opacity = "0.7";
                this.scrollTable();
                await this.$store.dispatch('parts/fetch', {})
                document.getElementById("scroll-index").style.opacity = "1";

                this.$router.replace({'query': null})
            },

            createLink(){
                let obj = {};

                if(this.markaFilter){
                    obj.make = this.markaFilter
                }
                if(this.modelFilter){
                    obj.model = this.modelFilter
                }
                if(this.generationFilter){
                    obj.generation = this.generationFilter
                }
                if(this.partFilter){
                    obj.part = this.partFilter
                }
                if(this.engine_typeFilter){
                    obj.engine_type = this.engine_typeFilter
                }
                if(this.engineFilter){
                    obj.engine = this.engineFilter
                }
                if(this.numberFilter){
                    obj.search = this.numberFilter
                }

                return obj;

            },

            changeMarka(){
                this.modelFilter = '';
                this.generationFilter = '';
                this.partFilter = '';
                this.engine_typeFilter = '';
                this.engineFilter = '';
            },

            async getFilters(query) {

                this.disableFilter = true;

                const res = await this.$axios.$get(encodeURI('https://bampart.com/' +
                    'api/site/filters'), {
                    params: query,
                    headers: { 'token': process.env.site_token }
                })

                this.markaFilterItems = res.make.filter(v=>v!=='');
                if(this.markaFilterItems.length === 0){
                    this.markaFilter = '';
                }
                this.modelFilterItems = res.model.filter(v=>v!=='');
                if(this.modelFilterItems.length === 0){
                    this.modelFilter = '';
                }
                this.generationFilterItems = res.generation.filter(v=>v!=='');
                if(this.generationFilterItems.length === 0){
                    this.generationFilter = '';
                }
                this.partsFilterItems = res.part.filter(v=>v!=='');
                if(this.partsFilterItems.length === 0){
                    this.partFilter = '';
                }
                this.engine_typeFilterItems = res.engine_type.filter(v=>v!=='');
                if(this.engine_typeFilterItems.length === 0){
                    this.engine_typeFilter = '';
                }
                this.engineFilterItems = res.engine.filter(v=>v!=='' && v!==0);
                if(this.engineFilterItems.length === 0){
                    this.engineFilter = '';
                }

                this.disableFilter = false;

            },

            createFilter(){
                this.getFilters(this.createLink());
            },

            scrollTable(){
                document.getElementById("scroll-index").scrollIntoView(true);
                window.scroll(0, window.scrollY - 80);
            },

            async showFilter(){

                const query = this.createLink()

                if(this.$route.path !== '/'){
                    this.$router.push({ path: '/', query: query})
                }
                else{
                    document.getElementById("scroll-index").style.opacity = "0.7";

                    this.scrollTable();
                    await this.$store.dispatch('parts/fetch', query)
                    document.getElementById("scroll-index").style.opacity = "1";
                    this.$router.push({ query: query })
                }
            }
        },


        mounted() {

            const route_query = this.$route.query;

            if(Object.keys(route_query).length !== 0 && route_query.constructor === Object){

                if(route_query.make){
                    this.markaFilter = route_query.make;
                }
                if(route_query.model){
                    this.modelFilter = route_query.model;
                }
                if(route_query.generation){
                    this.generationFilter = route_query.generation;
                }
                if(route_query.part){
                    this.partFilter = route_query.part;
                }
                if(route_query.engine_type){
                    this.engine_typeFilter = route_query.engine_type;
                }
                if(route_query.engine){
                    this.engineFilter = parseFloat(route_query.engine);
                }
                if(route_query.search){
                    this.numberFilter = route_query.search;
                }

                this.getFilters(route_query);

            }
            else if(Object.keys(this.part).length !== 0 && this.part.constructor === Object){

                this.markaFilter = this.part.make;
                this.modelFilter = this.part.model;
                this.generationFilter = this.part.generation;
                this.partFilter = this.part.part;
                this.engine_typeFilter = this.part.engine_type;
                this.engineFilter = parseFloat(this.part.engine);
                this.getFilters(this.createLink());

            }
            else{
                this.getFilters({});
            }

        }
    }
</script>

<style lang="scss">
    .ac-filled{
        margin-top: -15px;
    }
</style>