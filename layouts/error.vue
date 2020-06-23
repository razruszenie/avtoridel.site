<template>
    <v-container
            class="text-center"
            fill-height
            style="height: calc(100vh - 58px);"
    >
        <v-row align="center">
            <v-col>
                <h1 class="display-2" style="color: #97271d" v-if="error.statusCode === 404">Страница не найдена</h1>
                <h1 class="display-2" style="color: #97271d" v-else-if="error.message === 'Network Error'">Проблемы подключения к интернету</h1>
                <h1 class="display-2" style="color: #97271d"  v-else>Произошла ошибка "{{ error.message }}"</h1>

                <p>Для продолжения работы с приложением перейдите</p>

                <v-btn to="/"
                       color="#97271d"
                       outlined
                >
                    На главную
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        props: ['error'],
        mounted() {
            if(this.error.statusCode === 401){
                this.$router.push('/admin/login?message=session');
            }
        }
    }
</script>