<template>
    <div class="b-c-admin">Переадресация...</div>
</template>
<script>
    export default {
        layout: "admin",
        middleware: ['admin-auth'],

        head() {
            return {
                title: 'Админ-панель | Выход'
            }
        },

        beforeCreate() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/')
        }
    }
</script>