<template>
    <div class="body-container">
        <v-card tile outlined>
            <v-card-title
                    style="background-color: #778899;"
                    class="headline white--text"
            >О нас</v-card-title>
            <v-card-text class="pt-4 black--text">
                <p>Наша компания занимается продажей оригинальных Б/У двигателей и других автозапчастей оптом и в розницу.</p>
                <p>Все запчасти контрактные - официально привезены из Европы (Франция, Бельгия) и
                    растаможены. На все двигатели Б/У мы предоставляем гарантию 30 дней. Мы доставляем
                    автозапчасти по всей Беларуси. На наших складах в Минске представлен широкий ассортимент
                    двигателей для разных автомобилей.Также привозим двигатели и другие запчасти ПОД ЗАКАЗ.</p>
                <ul>
                    <li>Также имеется своя точка на авторынке.</li>
                    <li>Мы дорожим нашей репутацией и заботимся о наших клиентах.</li>
                    <li>Постоянным клиентам скидки до 10%, специальные условия оптовым покупателям.</li>
                </ul>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {

        head() {
            return {
                title: 'О нас | ' + process.env.site_name
            }
        },

        mounted() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }
</script>