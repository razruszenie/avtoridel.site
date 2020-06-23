<template>
    <v-app>
        <AdminDrawer></AdminDrawer>
        <v-content>
            <v-container
                    fluid
            >
                <transition
                        name="fade"
                        mode="out-in"
                >
                    <nuxt></nuxt>
                </transition>

            </v-container>
        </v-content>
        <Snackbar></Snackbar>
    </v-app>
</template>

<script>
    import Snackbar from '~/components/Snackbar'
    import AdminDrawer from '~/components/admin/AdminDrawer'

    export default {
        name: "admin",

        components: {
            Snackbar: Snackbar,
            AdminDrawer: AdminDrawer
        }
    }
</script>
<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.5s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>