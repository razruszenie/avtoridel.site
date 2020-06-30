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
                            <span>ПН-ВС: с 10.00 до 20.00</span>
                        </div>
                    </div>
                </v-list-item-content>
            </v-list-item>

            <v-list-item  v-for="phone in phones"
                          :key="phone.number">
                <v-list-item-content>
                    <v-list-item-title>
                        <div class="d-flex align-center">
                            <v-btn  outlined
                                    :href="`tel:+` + phone.number"
                                    color="#97271d"
                            > <v-icon left>phone</v-icon> +{{ phone.number }}</v-btn>
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
                phones: [
                    {
                        number: '375 25 96 88 915'
                    },
                    {
                        number: '375 33 35 78 742'
                    },
                    {
                        number: '375 29 59 31 803'
                    },
                    {
                        number: '375 29 51 35 172'
                    },
                    {
                        number: '375 29 15 07 467'
                    },
                ],
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