<template>
    <div class="body-container">
        <v-card tile outlined>
            <v-card-title
                    style="background-color: #778899;"
                    class="headline white--text"
            >Контакты</v-card-title>
            <v-card-text class="pt-4 black--text">
                <v-layout wrap>
                    <v-flex xs12 lg8 class="contacts-map">
                        <client-only>
                            <div id="map">
                                <yandex-map :coords="coordsMap" zoom="11">
                                    <ymap-marker
                                            :coords="coords"
                                            marker-id="123"
                                            hint-content="д. Щомыслица, ул. Жуковского"
                                    />
                                </yandex-map>
                            </div>
                        </client-only>
                    </v-flex>
                    <v-flex xs12 lg4 class="contacts-more">
                        <v-divider inset
                                   class="contacts-divider"
                                   vertical
                        ></v-divider>
                        <div>
                            <div class="contacts-container">
                                <ul>
                                    <li class="mb-3">
                                        <strong>
                                            <span style="display: block">Колодищи, Минский район,</span>
                                            ул. Танковая, 10/1</strong>
                                    </li>
                                    <li class="mt-1">
                                        <span class="contacts-text-min">Телефоны:
                                            <a :href="`tel:+375 25 96 88 915`" class="contacts-black">+375 25 96 88 915</a>
                                            <a :href="`tel:+375 33 35 78 742`" class="contacts-black contacts-ridel">+375 33 35 78 742</a>
                                            <a :href="`tel:+375 29 59 31 803`" class="contacts-black contacts-ridel">+375 29 59 31 803</a>
                                            <a :href="`tel:+375 29 51 35 172`" class="contacts-black contacts-ridel">+375 29 51 35 172</a>
                                            <a :href="`tel:+375 29 15 07 467`" class="contacts-black contacts-ridel">+375 29 15 07 467</a>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="contacts-text-min">Эл. почта: <a href="mailto:">avtoridel@mail.ru</a></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="contacts-container">
                                <strong>Рабочее время:</strong>
                                <ul>
                                    <li class="mt-1">
                                        <span class="contacts-text-min">Каждый день:
                                            <span class="contacts-black">10:00 - 20:00</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <!--<div>-->
                                <!--<strong>ООО "Фирма"</strong>-->
                                <!--<ul>-->
                                    <!--<li class="mt-1">-->
                                        <!--<span class="contacts-text-min">Рег. номер:-->
                                            <!--<span class="contacts-black">XXXXXXXXXXXXXX</span>-->
                                        <!--</span>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                        <!--<span class="contacts-text-min">НДС номер:-->
                                            <!--<span class="contacts-black">XXXXXXXXXXXXXX</span>-->
                                        <!--</span>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                        <!--<span class="contacts-text-min">УНП:-->
                                            <!--<span class="contacts-black">XXXXXXXXXXXXXX</span>-->
                                        <!--</span>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</div>-->
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {

        head() {
            return {
                title: 'Контакты | ' + process.env.site_name
            }
        },

        data () {
            return {
                coordsMap: [53.903442, 27.546482],
                coords: [53.913442, 27.746482]
            }
        },

        mounted() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }
</script>
<style lang="scss" scoped>

    .contacts-black{
        color: black;
    }

    .contacts-ridel{
        display: block;
        margin-left: 86px;
    }

    ul{
        padding-left: 0;
    }

    li {
        list-style-type: none;
    }

    .contacts-more{
        display: flex;
        font-size: 17px;

        .contacts-divider{
            margin-left: 40px!important;
            margin-right: 40px!important;
        }
    }

    .contacts-container{
        margin-bottom: 15px;
    }

    .contacts-text-min{
        font-size: 16px;
        color: #666767;
    }

    @media screen and (min-width: 1301px) {
        #map{
            width: 100%;
            height: 400px;

            .ymap-container{
                height: 100%;
            }
        }

        .contacts-more{
            align-items: center;
        }
    }

    @media screen and (max-width: 1300px)
    {
        .contacts-divider{
            display: none;
        }

        .contacts-map{
            order: 2;

            #map{
                height: 350px;
                width: 100%;

                .ymap-container{
                    height: 100%;
                }
            }
        }

        .contacts-more{
            margin-bottom: 20px;
            order: 1;
        }
    }
</style>