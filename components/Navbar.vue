<template>
    <div>
        <v-app-bar
                app
                height="60px"
                color="white"
                class="navbar"
        >
            <v-app-bar-nav-icon class="navbar-open" @click.stop="showDrawer"></v-app-bar-nav-icon>

            <v-toolbar-items class="navbar-logo">
                <v-btn text no-prefetch to="/">
                    <img class="navbar-logo-img" @click="$router.push('/')" src="/logo.png">
                </v-btn>
            </v-toolbar-items>

            <div class="navbar-work">
                <v-icon large>alarm</v-icon>
                <div class="navbar-work-time">
                    <span>ПН-ПТ: с 9.00 до 18.00</span>
                    <span>СБ: с 9.00 до 16.00</span>
                    <span>ВС: выходной</span>
                </div>
            </div>
            <div class="navbar-phone">
                <v-btn  outlined
                        :href="`tel:+375 29 541 30 00`"
                        color="#B71C1C"
                > <v-icon left>phone</v-icon> +375 XX XXX XX XX</v-btn>
            </div>

            <v-toolbar-items class="navbar-btns">
                <v-btn text no-prefetch to="/">Каталог</v-btn>
                <v-btn text no-prefetch to="/about">О нас</v-btn>
                <v-btn text no-prefetch to="/contacts">Контакты</v-btn>
                <v-btn text no-prefetch to="/guarantee">Гарантии</v-btn>
                <v-btn text no-prefetch to="/delivery">Оплата и доставка</v-btn>
                <v-btn text no-prefetch to="/admin/login">Войти</v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>
<script>
    export default {

        data () {
            return {
                g_link: 'https://bamper.by/seller/3722/#scroll',
                items: [
                    { title: '4авто', link: '/admin/login' },
                    { title: 'Bampart.com', link: 'bampart' }
                ]
            }
        },

        methods: {
            showDrawer(){
                this.$store.dispatch('drawer/change', true);
            }
        }
    }
</script>
<style lang="scss">
    .navbar{
        width: 100%;
        position: fixed;
        z-index: 2;

        .navbar-logo{
            .v-btn--active::before{
                opacity: 0;
            }
        }

        .navbar-logo:hover {
            .v-btn--active::before{
                opacity: 0.12;
            }
        }
    }

    @media screen and (min-width: 1301px) {
        .v-toolbar__content{
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            max-width: 1600px;
            padding: 4px 12px;

            .navbar-side{
                display: none;
            }

            .navbar-logo-img{
                height: 50px;
                cursor: pointer;
            }

            .navbar-phone{
                display: flex;
                align-content: center;
            }

            .navbar-work{
                display: flex;
                align-items: center;
                font-weight: 400;
                margin-left: -10px;

                .navbar-work-time{
                    display: flex;
                    flex-direction: column;
                    margin: -5px 0 0 5px;

                    span{
                        height: 18px;
                    }
                }
            }

        }

        .navbar-open{
            display: none;
        }
    }

    @media screen and (max-width: 1300px)
    {

        .navbar-btns, .navbar-work, .navbar-phone{
            display: none;
        }

        .navbar-open{
            margin-left: 0!important;
        }

        .navbar-logo{
            width: 100%;
            justify-content: center;
            margin-left: -40px;

            img{
                height: 40px;
            }
        }

    }
</style>