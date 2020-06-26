<template>
    <div v-if="parts.length !== 0">
        <div class="headline mt-5">Другие запчасти для {{ parts[0].make }}
            {{ parts[0].model }} {{ parts[0].year }} г.</div>
    <v-card class="bampart-table mt-2"
            id="scroll-index">
        <table class="table">
            <thead>
            <tr>
                <th class="bampart-article">Артикул / Фото</th>
                <th>Запчасть</th>
                <th>Параметры машины</th>
                <th>Описание</th>
                <th>Цена</th>
                <th>Действия</th>
            </tr>
            </thead>
            <transition-group tag="tbody" name="fade-out-in">
                <tr v-for="(one_part, index) in parts"
                    :key="one_part.article">
                    <td class="table-td table-td-image">
                        <span><b>{{ one_part.article }}</b></span>
                        <div v-if="one_part.image.length !== 0">
                            <v-img
                                    :src="one_part.image[0] + '?dim=280x210'"
                                    aspect-ratio="1"
                                    :eager="true"
                                    @click="galeryShow(one_part.image)"
                                    :alt="one_part.article"
                                    class="image grey lighten-2"
                            >
                                <template v-slot:placeholder>
                                    <v-row
                                            class="fill-height ma-0"
                                            align="center"
                                            justify="center"
                                    >
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                            <div class="bampart-dot">
                                <div v-for="index in one_part.image"
                                     class="bampart-image-dot"
                                ></div>
                            </div>
                        </div>
                    </td>
                    <td data-title="Артикул" class="table-td table-mobile-td min-artikul">
                        <span style="color: #0f6a97;">
                            <b>{{ one_part.article }}</b></span>
                    </td>
                    <td data-title="Запчасть" class="table-td table-mobile-td">
                        <span><b>Тип:</b> {{ one_part.part }}</span>
                        <span v-if="one_part.number"><b>Оригинальный номер:</b> {{ one_part.number }}</span>
                        <span v-if="one_part.color"><b>Цвет:</b> {{ one_part.color }}</span>
                    </td>
                    <td data-title="Параметры машины" style="min-width: 250px;" class="table-td table-mobile-td">
                        <span><b>Марка:</b> {{ one_part.make }}</span>
                        <span><b>Модель:</b> {{ one_part.model }}</span>
                        <span><b>Поколение:</b> {{ one_part.generation }}</span>
                        <span><b>Год:</b> {{ one_part.year }}</span>
                        <span v-if="one_part.body"><b>Тип кузова:</b> {{ one_part.body }}</span>
                        <span v-if="one_part.engine_type"><b>Тип топлива:</b> {{ one_part.engine_type }}</span>
                        <span v-if="one_part.engine !== 0"><b>Объем:</b> {{ one_part.engine }}</span>
                        <span v-if="one_part.transmission"><b>Коробка передач:</b> {{ one_part.transmission }}</span>
                    </td>
                    <td data-title="Описание" class="table-td table-mobile-td">
                        <span v-if="one_part.description">{{ one_part.description }}</span>
                        <span v-else>-</span>
                    </td>
                    <td data-title="Цена" class="table-td table-mobile-td">
                        <span v-if="one_part.price !== 0"
                              class="bampart-price">
                             <span v-if="one_part.discount === 0">{{ one_part.price }} {{ one_part.currency }}</span>
                            <span v-else>
                                <span style="text-decoration: line-through; color: darkgray">{{ one_part.price }} {{ one_part.currency }}</span>
                                <span>{{ one_part.price - (one_part.discount / 100 *  one_part.price) }} {{ one_part.currency }}</span>
                            </span>
                        </span>
                        <span v-else>Цена не указана</span>
                    </td>
                    <td class="table-td-btn">
                        <v-btn color="#B71C1C"
                               dark
                               outlined
                               href="tel:+375 25 96 88 915"
                               style="width: 120px"
                        >Позвонить</v-btn>
                        <v-btn color="primary"
                               dark
                               :disabled="disableTo"
                               :dark="!disableTo"
                               @click="disableTo = true"
                               :to="'/part/' + one_part.article"
                               class="parts-ord-btn"
                               style="width: 120px"
                        >Подробнее</v-btn>
                    </td>
                </tr>
            </transition-group>
        </table>
    </v-card>
    </div>
</template>
<script>
    export default {

        props: {
            parts: {
                type: Array,
                default: null
            }
        },

        data () {
            return {
                disableTo: false
            }
        },

        methods: {
            galeryShow(selArray) {
                const obj = {"selArray": selArray, "index": 0}
                this.$store.dispatch('galery/change', obj);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .table{
        font-size: 16px;
        width: 100%;
        max-width: 100%;
        margin-bottom: 0;
        background-color: transparent;
        border-collapse: collapse;
        border-bottom: 0.6px solid #dee2e6;

        .v-input--selection-controls{
            padding-top: 0;
            margin: 10px -10px 1px 2px;
        }

        .theme--light.v-messages{
            min-height: 0;
        }

        .bampart-check{
            padding: 9px 0 0 12px;
        }

        .table-sell-client{
            cursor: pointer;
            color: #256a97;
        }

        .table-sell-client:hover{
            color: darkslategrey;
        }

        .table-td span {
            display: block;
        }


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

        .bampart-price {
            color: #44bb6e;
            font-size: 17px;
            font-weight: bold
        }


        @media screen and (min-width: 1301px) {
            td, th {
                padding: .75rem;
                vertical-align: top;
                border-top: 1px solid #dee2e6;
                text-align: left;
            }

            th {
                position: sticky;
                top: -1px;
                z-index: 1;
                background-color: lightslategrey;
                color: white;
            }

            tbody {
                background-color: white;

                .min-artikul{
                    display: none;
                }

                .bampart-bamper{
                    display: block;
                    margin-top: 5px;
                    height: 22px;
                    margin-left: 2px;
                    cursor: pointer;
                }

                .image {
                    position:relative;
                    cursor: pointer;
                    width: 170px;
                    height: 120px;
                    overflow:hidden;

                    .image-img{
                        position:absolute;
                        width: 100%;
                        height: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                .table-td-btn {
                    display: flex;
                    flex-direction: column;

                    .parts-ord-btn{
                        margin-top: 7px;
                    }
                }

            }
        }

    }

    @media screen and (min-width: 1301px)
    {

        .bampart-table{
            overflow-x: unset;
        }

    }


    @media screen and (min-width: 1301px) and (max-width: 1501px)
    {


        .bampart-table{
            overflow-x: auto;
        }
    }

    @media screen and (max-width: 1300px)
    {

        table, thead, tbody, td, tr {
            display: block;
        }
        th
        {
            display: none;
        }



        .table{
            tbody{
                tr {
                    border-top: 1px solid #ccc;
                    margin: 0;
                    padding-top: .75rem;
                }
                .bampart-td-check{
                    display: flex;
                }

                .bampart-bamper{
                    display: none;
                }

                .bampart-bamper-mobile{
                    display: block;
                }

                .table-td-image{
                    display: flex;
                    justify-content: center;

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

                    .bampart-dot{
                        width: 280px;

                    }

                    span{
                        display: none;
                    }
                }


                .table-mobile-td {
                    border: 0;
                    border-bottom: 1px solid #eee;
                    position: relative;
                    white-space: normal;
                    text-align: left;
                    margin-right: 10px;
                    margin-left: 10px;
                    padding: 3px!important;
                    padding-left: 35%!important;
                    border-top: 0!important;
                }

                .table-mobile-td:before {
                    content: attr(data-title);
                    position: absolute;
                    left: 0;
                    width: 35%;
                    font-weight: bold;
                }

                .table-td-btn{
                    padding: .75rem .25rem .75rem .25rem;
                    display: flex;
                    justify-content: center;
                    flex-direction: row;

                    .parts-ord-btn{
                        margin-left: 10px;
                    }
                }

            }
        }
        .bampart-pagination{
            flex-flow: wrap;

            .bampart-count{
                order: 4;
                width: 100%;
                text-align: center;
                line-height: 35px;
            }
            .bampart-pag{
                order: 1;
                width: 100%;
                display: flex;
                justify-content: center;
                overflow-x: auto;
                margin-top: 5px;
            }
            .bampart-print{
                order: 2;
                margin-top: 10px;
                width: 100%;
                text-align: center;
                height: 35px;
                line-height: 35px;
            }
            .bampart-xs-hidden{
                display: flex;
                justify-content: center;
                height: 35px;
                line-height: 35px;
                order: 3;
                width: 100%;
            }
        }

    }
</style>