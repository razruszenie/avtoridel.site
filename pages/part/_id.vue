<template>
    <div class="body-container">
        <v-layout wrap v-if="Object.keys(part).length !== 0">
            <v-flex xs12 lg9 class="part-site">
                <v-card itemscope itemtype="http://schema.org/Product">
                    <v-card-title
                            class="part-title"
                    >
                        <div class="d-flex align-center part-title-d">
                            <v-btn color="#B71C1C"
                                   @click="$router.go(-1)"
                                   class="mr-3 part-title-back"
                                   text
                                   tile
                            >
                                <v-icon style="font-weight: bold;">keyboard_backspace</v-icon>
                            </v-btn>
                            <div>
                                <h1 itemprop="name" class="part-title-text">{{ title }}</h1>
                                <v-breadcrumbs style="padding: 0"
                                               class="ap-breadcrumbs"
                                               :items="breadcrumbs">
                                    <template v-slot:divider>
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </template>
                                </v-breadcrumbs>
                            </div>
                        </div>
                        <v-btn color="primary"
                               class="part-title-btn"
                               dark
                               @click="orderPart(part.article)"
                        >Заказать</v-btn>
                    </v-card-title>
                    <a itemprop="url" :href="hostName + $route.path"></a>
                    <span class="sc-desc" itemprop="description">На сайте {{ siteName }} вы можете купить б/у  {{ this.title + this.desc }}</span>
                    <v-divider class="mb-2"></v-divider>

                    <v-card-text class="part-oeW2w">

                        <div v-if="part.image.length !== 0" class="part-image">
                            <div class="image">
                                <v-img
                                        :src="part.image[0]"
                                        :alt="part.article.toString()"
                                        @click="galeryShow(part.image, 0)"
                                        aspect-ratio="1"
                                        class="image-img"
                                        itemprop="image"
                                        :eager="true"
                                ></v-img>

                            </div>
                            <v-layout wrap class="images-more" v-if="part.image.length > 1">
                                <v-flex xs12 lg3
                                        v-for="(im, index) in part.image"
                                        :key="index"
                                        class="part-img"
                                        v-if="index > 0"
                                >
                                    <v-img :src="im"
                                           @click="galeryShow(part.image, index)"
                                           aspect-ratio="1"
                                           :eager="true"
                                           style="cursor: pointer"
                                    ></v-img>
                                </v-flex>
                            </v-layout>
                            <div class="bampart-dot">
                                <div v-for="index in part.image"
                                     class="bampart-image-dot"
                                ></div>
                            </div>
                        </div>
                        <div class="part-desc" :class="{ part32er1: part.image.length === 0}">
                            <v-simple-table itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                                <template v-slot:default>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b>Цена</b></td>
                                        <td>
                                            <div v-if="part.price !== 0">
                                                <meta itemprop="price" :content="part.price">
                                                <meta itemprop="priceCurrency" :content="part.currency">
                                                <h2 style="color: #44bb6e;">{{ part.price }} {{ part.currency }}</h2>
                                            </div>
                                            <div v-else>
                                                <meta itemprop="price" :content="1">
                                                <meta itemprop="priceCurrency" content="USD">
                                                <h2>Цена не указана</h2>
                                            </div>
                                            <link itemprop="availability" href="http://schema.org/InStock" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Артикул</b></td>
                                        <td>
                                            <span style="color:#c22e2a; font-weight: 500">{{ part.article }}</span>
                                            <a itemprop="url" :href="hostName + $route.path"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Марка</b>
                                        </td>
                                        <td>{{ part.make }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Модель</b></td>
                                        <td>{{ part.model }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Поколение</b></td>
                                        <td>{{ part.generation }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Год</b></td>
                                        <td>{{ part.year }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Запчасть</b></td>
                                        <td>{{ part.part }}</td>
                                    </tr>
                                    <tr v-if="part.number">
                                        <td><b>Оригинальный номер</b></td>
                                        <td>{{ part.number }}</td>
                                    </tr>
                                    <tr v-if="part.engine_type">
                                        <td><b>Тип топлива</b></td>
                                        <td>{{ part.engine_type }}</td>
                                    </tr>
                                    <tr v-if="part.engine">
                                        <td><b>Объем</b></td>
                                        <td>{{ part.engine }}</td>
                                    </tr>
                                    <tr v-if="part.transmission">
                                        <td><b>Тип КПП</b></td>
                                        <td>{{ part.transmission }}</td>
                                    </tr>
                                    <tr v-if="part.color">
                                        <td><b>Цвет</b></td>
                                        <td>{{ part.color }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>

                            <v-tabs
                                    v-model="active"
                                    color="#97271d"
                                    class="part-more"
                            >
                                <v-tab ripple>Описание</v-tab>
                                <v-tab ripple>Гарантия</v-tab>
                                <v-tab-item>
                                    <v-card outlined>
                                        <v-card-text style="color: black">
                                            <span v-if="part.description">{{ part.description }}. </span>
                                            Оригинальная запчасть, в наличии, состояние на фото. При звонке будьте
                                            готовы назвать номер артикула - {{ part.article }}
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card outlined>
                                        <v-card-text style="color: black">ГАРАНТИЯ 14 ДНЕЙ С МОМЕНТА ПОКУПКИ ТОВАРА.</v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </div>
                        <div class="part-order-xs">
                            <v-btn color="#ed4f4f"
                                   dark
                                   href="tel:+375 (29) 787 11 11"
                                   style="width: 120px;"
                            >Позвонить</v-btn>
                            <v-btn color="primary"
                                   dark
                                   @click="orderPart(part.article)"
                                   style="width: 120px; margin-left: 7px"
                            >Заказать</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
                <PartsSuggest :parts="parts"></PartsSuggest>

            </v-flex>
            <v-flex xs12 lg3 id="filter">
                <PartFilter :part="part"></PartFilter>
            </v-flex>
            <client-only>
                <gallery :images="selectedImages" :index="index" @close="index = null"></gallery>
            </client-only>
            <OrderPhone></OrderPhone>
        </v-layout>
        <v-alert
                v-else
                :value="true"
                color="#97271d"
                dark
        >Запчасть не найдена</v-alert>
    </div>
</template>

<script>
    import PartFilter from '~/components/PartFilter'
    import PartsSuggest from '~/components/PartsSuggest'
    import OrderPhone from '~/components/OrderPhone'

    export default {

        validate({params}){
            return Boolean(params.id)
        },

        head() {

            return {
                title: this.title + this.desc,
                meta: [
                    { hid: 'part_' + this.part.article, name: 'description', content: 'На сайте ' + this.siteName +
                            ' вы можете купить б/у ' + this.title + this.desc },
                    { hid: "og:title", name: 'og:title', property: 'og:title', content: this.title },
                    { hid: 'keywords', name: 'keywords', content: this.title + ' купить' },
                ]
            }
        },

        data () {
            return {
                active: null
            }
        },

        async asyncData({$axios, params}) {

            try{

                const res = await $axios.$get('https://bampart.com/api/site/part', {
                    params: {article: params.id},
                    headers: { 'token': process.env.site_token }
                })
                const one_part = res[0];

                if(res.length >= 1){
                    res.shift(1);
                }

                let title = one_part.part + ' ' + one_part.make +
                    ' ' + one_part.model + ' ' + one_part.generation;

                if(title){
                    title = title.trim()
                }

                let desc = '';
                if(one_part.price){
                    desc += ' по цене ' + one_part.price + ' ' + one_part.currency
                }
                desc += ' с доставкой по Беларуси';

                const breadcrumbs = [
                    {
                        text: 'Главная',
                        disabled: false,
                        to: '/',
                    },
                    {
                        text: one_part.make,
                        disabled: false,
                        to: '/?make=' + one_part.make,
                    },
                    {
                        text: one_part.model,
                        disabled: false,
                        to: '/?make=' + one_part.make + '&model=' + one_part.model,
                    },
                    {
                        text: one_part.generation,
                        disabled: false,
                        to: '/?make=' + one_part.make + '&model=' + one_part.model +
                            '&generation=' + one_part.generation,
                    },
                    {
                        text: one_part.part,
                        disabled: false,
                        to: '/?make=' + one_part.make + '&model=' + one_part.model +
                            '&generation=' + one_part.generation + '&part=' + one_part.part,
                    }
                ];

                return {part: one_part, title: title, desc: desc, parts: res, breadcrumbs: breadcrumbs}
            }
            catch (e) {
                console.log(e)
                return {part: {}, title: 'Запчасть не найдена'}
            }

        },

        computed: {
            selectedImages() {
                return this.$store.getters['galery/selectedImages']
            },
            index: {
                get () {
                    return this.$store.state.galery.index
                },
                set (value) {
                    this.$store.commit('galery/setIndex', value)
                }
            },
            hostName() {
                return process.env.host_name;
            },
            siteName() {
                return process.env.site_name;
            },
            siteToken() {
                return process.env.site_token;
            },
        },

        components: {
            PartFilter: PartFilter,
            OrderPhone: OrderPhone,
            PartsSuggest: PartsSuggest
        },

        methods: {
            galeryShow(selArray, index) {
                const obj = {"selArray": selArray, "index": index}
                this.$store.dispatch('galery/change', obj);
            },
            orderPart(article){
                const obj = {"dialog": true, "article": article};
                this.$store.dispatch('phone/change', obj);
            }
        },

        mounted() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }
</script>
<style lang="scss" scoped>

    .sc-desc{
        display: none;
    }
    .special{
        left: 0;

        .special-btn{
            margin-left: -5px;
        }
    }

    .site-part-info{
        font-weight: 500;
        color: black;
    }

    @media screen and (min-width: 1301px) {
        .part-site {
            padding-right: 20px;

            .part-title {
                display: flex;
                justify-content: space-between;
                color: black;
                font-size: 21px;

                .part-title-d{
                    width: 80%;

                    .part-title-text{
                        font-size: 22px;
                    }
                }

                .part-title-btn{
                    margin: 0;
                    width: 140px;
                    height: 40px
                }

            }

            .part-oeW2w {
                display: flex;
                margin-top: 15px;

                .image-img{
                    max-height: 350px;
                    cursor: pointer;
                }

                .part-image {
                    width: 50%;
                    max-height: 550px;

                    .bampart-dot{
                        display: none;
                    }

                    .images-more {
                        margin-top: 10px;
                        height: 120px;
                        display: flex;

                        .part-img {
                            height: 120px;
                            margin-right: 10px;
                        }

                        .part-img:last-child {
                            margin-right: 0;
                        }
                    }
                }

                .part-desc {
                    width: 50%;
                    margin-left: 40px;
                    margin-top: -10px;
                    font-size: 16px;
                }

                .part32er1{
                    width: 100%;
                    margin-left: 0;
                }

                .part-order-xs{
                    display: none;
                }
            }
        }

        #filter {
            top: 80px !important;
        }
    }


    @media screen and (max-width: 1300px) {

        .v-card__title{
            font-size: x-small;
        }

        .part-title-btn{
            display: none;
        }

        .part-title-d {
            flex-direction: column;
            width: 100%;

            .part-title-back{
                order: 2;
            }

        }

        .part-image{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;

            .bampart-dot {
                display: flex;
                justify-content: center;
                width: 175px;
                margin-top: 5px;

                .bampart-image-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 10px;
                    margin-right: 5px;
                    background-color: #868686;
                }
            }

            .image {
                position: relative;
                cursor: pointer;
                width: 280px;
                height: 210px;
                overflow: hidden;

                .image-img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        .part-order-xs{
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }

        .images-more{
            display: none;
        }

        #filter{
            margin-top: 20px;
        }
    }
</style>
