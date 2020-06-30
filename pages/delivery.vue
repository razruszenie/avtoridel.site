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
                        <p>Свой заказ Вы можете оплатить следующими способами:</p>
                        <h3>1. Наличными курьеру</h3>
                        <p class="mt-3">При доставке по Минску и РБ Вы оплачиваете наличными курьеру после получения заказа.</p>
                        <h3>2. Безналичный расчет</h3>
                        <p class="mt-3">Путем оплаты картой (курьер предоставит платежный терминал при доставке).</p>
                        <h3>3. Наложенный платеж</h3>
                        <p class="mt-3">При заказе по почте, Вы оплачиваете заказ в отделении Белпочты после
                            его получения наличными деньгами либо картой.</p>
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
                        text: "Вы можете забрать интересующий вас товар на нашем складе в Колодищи, Минский район, ул. Танковая, 10",
                        style: "border-left: 6px solid #40a4f4;"
                    },
                    {
                        title: 'По Беларуси',
                        text: "Доставка осуществляется транспортными компаниями(Возим-Бай, КИТ, ГлавДоставка), Белпочтой",
                        style: "border-left: 6px solid #a076f1;"
                    },
                    {
                        title: 'По СНГ',
                        text: "Доставка осуществляется транспортными компаниями(СДЭК, ЭНЕРГИЯ)",
                        style: "border-left: 6px solid #c681bd;"
                    },
                    {
                        title: 'По Европе',
                        text: "Доставка осуществляется транспортными компаниями(СДЭК, ЭНЕРГИЯ)",
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