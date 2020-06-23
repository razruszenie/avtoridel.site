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
                                <yandex-map :coords="coords" zoom="14">
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
                                    <li>
                                        <strong>г. Минск пр-т Победителей 65</strong>
                                    </li>
                                    <li class="mt-1">
                                        <span class="contacts-text-min">Телефон:
                                            <span class="contacts-black">+375 XX XX XX XX</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="contacts-text-min">Эл. почта: <a href="mailto:">info@site.com</a></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="contacts-container">
                                <strong>Рабочее время:</strong>
                                <ul>
                                    <li class="mt-1">
                                        <span class="contacts-text-min">Будние дни:
                                            <span class="contacts-black">09:00 - 18:00</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="contacts-text-min">Суббота:
                                            <span class="contacts-black">09:00 - 16:00</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="contacts-text-min">Воскресенье:
                                            <span class="contacts-black">выходной</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <strong>ООО "Фирма"</strong>
                                <ul>
                                    <li class="mt-1">
                                        <span class="contacts-text-min">Рег. номер:
                                            <span class="contacts-black">XXXXXXXXXXXXXX</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="contacts-text-min">НДС номер:
                                            <span class="contacts-black">XXXXXXXXXXXXXX</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="contacts-text-min">УНП:
                                            <span class="contacts-black">XXXXXXXXXXXXXX</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
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
                coords: [53.838977, 27.448722]
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