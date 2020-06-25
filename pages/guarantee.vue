<template>
    <div class="body-container">
        <v-card tile outlined>
            <v-card-title
                    style="background-color: #778899;"
                    class="headline white--text"
            >Гарантии</v-card-title>
            <v-card-text class="pt-4 black--text">
                <p class="body-1">Гарантия на проданный товар 14 дней(МКПП и остальное), двигатель - 30 дней.</p>

                <p class="mt-3 mb-1">Не распространяется</p>
                <ul>
                    <li>На оптику, кузовные детали и стекла</li>
                    <li>На прокладки, сальники, ремни ГРМ и ролики(при покупке двигателей и КПП)</li>
                    <li>При нарушении пломб, меток продавца</li>
                    <li>При возврате товара по причине ошибки покупателя(не понадобилось, не подходит, не
                    в этом причина неисправности и т.п.) возврат денежных средств осуществляется с удержанием 20% его
                    стоимости.</li>
                </ul>
                <p style="font-size: 13px!important;" class="overline mt-4">По истечении гарантийного срока товар возврату и обмену не подлежит!</p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {

        head() {
            return {
                title: 'Гарантии | ' + process.env.site_name
            }
        },

        mounted() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }
</script>