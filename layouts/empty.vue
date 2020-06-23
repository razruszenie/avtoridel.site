<template>
    <v-app style="background-color: #ededed!important">
        <nuxt></nuxt>
        <Snackbar></Snackbar>
    </v-app>
</template>

<script>
    import Snackbar from '~/components/Snackbar'

    export default {
        name: "empty",

        components: {
            Snackbar: Snackbar
        },

        computed: {
            error() {
                return this.$store.getters.error
            }
        },

        watch: {
            error(value){
                this.$store.dispatch('snackbar/show', value.response.data.message);
            }
        }
    }
</script>