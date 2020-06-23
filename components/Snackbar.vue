<template>
    <v-snackbar
            v-model="snackbar"
    >
        {{ text }}
        <v-btn
                color="warning"
                text
                @click="$store.dispatch('snackbar/remove')"
        >
            Закрыть
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {

        computed: {
            snackbar: {
                get () {
                    return this.$store.state.snackbar.snackbar
                },
                set (value) {
                    this.$store.commit('snackbar/setSnackbar', value)
                }
            },

            text() {
                return this.$store.getters['snackbar/text']
            }
        },

        watch: {
            snackbar: {
                handler: function(val, oldVal) {
                    if(val){
                        setTimeout(function(){
                            this.$store.dispatch('snackbar/remove');
                        }.bind(this), 3000);
                    }
                },
                deep: true
            }
        }
    }
</script>