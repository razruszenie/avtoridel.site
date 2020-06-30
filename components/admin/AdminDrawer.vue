<template>
    <div class="admin-navbar">
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >

            <v-list dense>

                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :to="item.link"
                >
                    <v-list-item-icon>
                        <v-badge
                                class="mt-1"
                                v-if="item.title === 'Заявки'"
                                :value="length === 0 ? '✔' : length"
                                :content="length === 0 ? '✔' : length"
                                :color="length === 0 ? 'success' : 'error'"
                                overlap
                        >
                            <v-icon>mdi-email</v-icon>
                        </v-badge>
                        <v-icon v-else>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue-grey darken-2"
                dark
        >
            <v-toolbar-title style="display: flex;align-items: center;">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <span style="margin-left: 10px">Панель администратора</span>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "AdminDrawer",

        computed: {

            length: {
                get() {
                    return this.$store.state.drawer.active
                },
                set(value) {
                    this.$store.commit('drawer/setActive', value)
                }
            },
        },

        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Настройки', icon: 'web', link: '/admin/promo' },
                    { title: 'Заявки', icon: 'dashboard', link: '/admin/orders' },
                    { title: 'Выйти', icon: 'lock_open', link: '/admin/logout' }
                ]
            }
        },

        watch: {
            '$route.path': {
                handler: function(after, before) {
                    if(after !== before){
                        this.$store.dispatch('drawer/getActiveCount');
                    }
                },
                deep: true,
                immediate: true
            }
        },

        mounted (){
            this.$store.dispatch('drawer/getActiveCount')
        },
    }
</script>
<style lang="scss">
    .navbar-search{
        height: 64px;
        align-items: center;
        display: flex;

        .navbar-search-container{
            display: flex;
            height: 64px;
            width: 500px;
            align-items: center;
        }
    }
</style>