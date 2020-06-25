<template xmlns="http://www.w3.org/1999/html">
    <v-footer
            height="auto"
            class="footer v-card"
            color="white"
            itemtype="http://schema.org/Organization"
    >
        <div class="footer-container">
            <v-layout wrap>
                <v-flex xs12 lg4 class="footer-content">
                    <img height="60px" src="/logo.png">
                    <p class="footer-desc">О компании. Продажа оригинальных Б/У автозапчастей оптом и в розницу.
                        На наших складах в Минске представлен широкий ассортимент для разных автомобилей.
                        Доставка по всей Беларуси</p>
                </v-flex>
                <v-flex xs12 lg4 class="footer-content">
                    <div class="footer-link">
                        <div class="footer-title">НАВИГАЦИЯ</div>
                        <nuxt-link v-for="(item,i) in items"
                                   :key="i"
                                   no-prefetch
                                   :to="item.link"
                        >{{ item.title }}</nuxt-link>
                    </div>
                </v-flex>
                <v-flex xs12 lg4 class="footer-content">
                    <div class="footer-info">
                        <div class="footer-title">КОНТАКТЫ</div>
                        <div class="footer-info-text"
                             itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                            <p itemprop="addressLocality">г. Минск</p>
                            <p itemprop="streetAddress">ул. Танковая, 10/1</p>
                        </div>
                        <div class="footer-info-text">
                            <p style="font-weight: bold">+375 25 96 88 915</p>
                            <p style="font-weight: bold">+375 33 35 78 742</p>
                        </div>
                        <div class="footer-info-text">
                            <p>Время работы:</p>
                            <p class="font-weight-medium">ПН-ВС: с 10.00 до 20.00</p>
                        </div>
                    </div>
                </v-flex>
            </v-layout>

            <div class="footer-more">
                <div>&copy; {{ new Date().getFullYear() }} Avtoridel</div>
            </div>
        </div>
    </v-footer>
</template>
<script>

    export default {

        data () {
            return {
                items: [
                    {
                        title: 'Каталог',
                        link: "/"
                    },
                    {
                        title: 'О нас',
                        link: "/about"
                    },
                    {
                        title: 'Гарантии',
                        link: "/contacts"
                    },
                    {
                        title: 'Контакты',
                        link: "/contacts"
                    },
                    {
                        title: 'Доставка и оплата',
                        link: "/delivery"
                    },
                    {
                        title: 'Войти',
                        link: "/admin/login"
                    }
                ]
            }
        }
    }
</script>
<style lang="scss">
    .footer {
        font-size: 16px;
        width: 100%;
        padding: 24px 24px 10px 24px;

        .footer-link{
            display: flex;
            flex-direction: column;

            a {
                text-decoration: none;
                color: black;
                cursor: pointer;
                margin-bottom: 15px;
            }

            a:hover{
                color: darkslategrey;
            }

        }

        .footer-title {
            font-weight: 600;
            margin-bottom: 20px;
        }

        .footer-info-text {
            margin-top: 10px;

            p {
                margin-bottom: 5px;
            }
        }

        .footer-more {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 10px;

            a {
                text-decoration: none;
                color: darkslategrey;
                cursor: pointer;
                text-align: right;
            }

            a:hover{
                color: black;
            }
        }



        @media screen and (min-width: 1301px) {

            margin-top: 20px;


            .footer-container {
                width: 100%;
                margin-left: auto;
                margin-right: auto;
                max-width: 1600px;

                .footer-content {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }

                .footer-content:first-child {
                    align-items: flex-start;
                }

                .footer-desc {
                    font-weight: 400;
                    max-width: 320px;
                    margin: 10px 0 0 5px;

                }

            }
        }

        @media screen and (max-width: 1300px)
        {
            padding-top: 0;

            .footer-content{
                margin-top: 16px;
            }
        }
    }
</style>