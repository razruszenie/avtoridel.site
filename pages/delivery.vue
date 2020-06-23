<template>
    <div class="body-container">
        <v-card tile outlined>
            <v-card-title
                    style="background-color: #778899;"
                    class="headline white--text"
            >Доставка и оплата</v-card-title>
            <v-card-text class="pt-4 black--text">
                <v-layout wrap>
                    <v-flex xs12 sm6 pa-2
                            v-for="(item,i) in items"
                            :key="i"
                            class="dilivery-block"
                            :style="item.style">
                        <span class="delivery-text">{{ item.title }}</span>
                        <div class="dilivery-container">
                            <span>{{ item.text }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs12 mt-2>
                        <p>Свой заказ на Фирма.com, Вы можете оплатить следующими способами:</p>
                        <h3>1. Наличными в офисе Фирма</h3>
                        <p class="mt-3">Оплачивайте свой заказ наличными при получении товара в офисе Фирма.</p>
                        <h3>2. Банковским перечислением</h3>
                        <p class="mt-3">Оплачивайте свой заказ банковским перечислением (предоплата) - после получения счёта от Фирма.</p>
                        <h3>3. Банковской картой в офисе Фирма</h3>
                        <p class="mt-3">Оплачивайте свой заказ кредитной картой или дебетовой картой в момент получения товара - в офисе Фирма.</p>
                        <h3>4. Наличными курьеру</h3>
                        <p class="mt-3">Оплачивайте свой заказ наличными курьеру при получении товара по Вами указанному адресу.</p>
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
                title: 'Доставка и оплата | ' + process.env.site_name
            }
        },

        data () {
            return {
                items: [
                    {
                        title: 'Самовывоз',
                        text: "Nulla lacinia ante erat, ut euismod mi aliquet vel",
                        style: "border-left: 6px solid #40a4f4;"
                    },
                    {
                        title: 'По Беларуси',
                        text: "Donec lobortis felis eu sollicitudin gravida",
                        style: "border-left: 6px solid #a076f1;"
                    },
                    {
                        title: 'По СНГ',
                        text: "Aliquam hendrerit urna et ex posuere commodo",
                        style: "border-left: 6px solid #c681bd;"
                    },
                    {
                        title: 'По Европе',
                        text: "Maecenas orci lacus, commodo pharetra neque et",
                        style: "border-left: 6px solid #db2563;"
                    },

                ]
            }
        },

        mounted() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }
</script>
<style lang="scss">
    .dilivery-block{
        margin-bottom: 16px;

        .delivery-text{
            display: block;
            font-size: 19px;
            font-weight: 400;
            margin-bottom: 5px
        }

        .delivery-container{
            max-width: 550px;
        }
    }
</style>