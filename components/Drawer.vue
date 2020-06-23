<template>
    <div>
    <v-navigation-drawer
            v-model="drawer"
            absolute
            height="100vh"
            width="260px"
            temporary
            style="position: fixed"
    >
        <v-list
                dense
                nav
        >
            <v-list-item
                    no-prefetch
                    v-for="(item,i) in items"
                    :key="i"
                    :to="item.link"
                    v-if="item.title !== 'Отзывы'"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item
                    v-else
                    target="_blank" :href="g_link"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <div class="drawer-work">
                        <v-icon large>alarm</v-icon>
                        <div class="drawer-work-time">
                            <span>ПН-ПТ: с 9.00 до 18.00</span>
                            <span>СБ: с 9.00 до 16.00</span>
                            <span>ВС: выходной</span>
                        </div>
                    </div>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        <div class="d-flex align-center">
                            <v-btn  outlined
                                    :href="`tel:+375 XX XXX XX XX`"
                                    color="#97271d"
                            > <v-icon left>phone</v-icon> +375 XX XXX XX XX</v-btn>
                        </div>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>


    </v-navigation-drawer>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                g_link: 'https://bamper.by/seller/3722/#scroll',
                items: [
                    {
                        title: 'Главная',
                        link: "/"
                    },
                    {
                        title: 'О нас',
                        link: "/about"
                    },
                    {
                        title: 'Контакты',
                        link: "/contacts"
                    },
                    {
                        title: 'Гарантии',
                        link: "/guarantee"
                    },
                    {
                        title: 'Оплата и доставка',
                        link: "/delivery"
                    },
                    {
                        title: 'Войти',
                        link: "/admin/login"
                    }
                ]
            }
        },

        computed: {

            drawer: {
                get() {
                    return this.$store.state.drawer.drawer
                },
                set(value) {
                    this.$store.commit('drawer/setDrawer', value)
                }
            }
        },
    }
</script>

<style lang="scss">
    .drawer-work{
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 400;
        margin-left: -4px;

        .drawer-work-time{
            display: flex;
            flex-direction: column;
            margin: -5px 0 0 5px;

            span{
                height: 18px;
            }
        }
    }
</style>