<template>
    <div style="height: 100vh;
    display: flex;
    align-items: center;
padding: 0 10px 0 10px">
        <v-layout>
            <v-flex xs12 sm4 offset-sm4>
                <v-card
                        style="padding: 20px; max-width: 500px"
                >
                        <div class="its-login-hello" style="margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    width: 99.5%;">
                <span style="font-size: 17px;
    line-height: 24px;
    letter-spacing: .5px;
font-weight: bold">АВТОРИЗИРУЙТЕСЬ ДЛЯ ПРОДОЛЖЕНИЯ</span>
                        </div>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    v-model="login"
                                    :rules="loginRules"
                                    required
                                    label="Логин"
                                    outline
                                    required
                                    @keyup.enter="validate"
                            ></v-text-field>

                            <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    required
                                    label="Пароль"
                                    outline
                                    type="password"
                                    required
                                    @keyup.enter="validate"
                            ></v-text-field>
                            <div class="its-login-btn">
                                <v-btn
                                        block
                                        :disabled="disable"
                                        color="teal"
                                        :dark="!disable"
                                        @click="validate"
                                        style="margin: 0; height: 50px"
                                >Войти</v-btn>
                            </div>
                        </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    export default {

        layout: "empty",

        head() {
            return {
                title: 'Админ-панель | Авторизация'
            }
        },

        data() {
            return {
                disable: false,
                valid: true,
                login: '',
                loginRules: [
                    v => !!v || 'Поле логин обязательно',
                    v => (v && v.length <= 255) || 'Логин не может быть больше 50 симвалов'
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Поле пароль обязательно',
                    v => (v && v.length <= 255) || 'Пароль не может быть больше 50 симвалов'
                ],
            }
        },

        mounted(){
            const {message} = this.$route.query;

            if(message === 'login'){
                this.$store.dispatch('snackbar/show', `Войдите для начала`);
            }
            else if(message === 'session'){
                this.$store.dispatch('snackbar/show', `Время сессии истекло, войдите заново`);
            }

        },

        methods: {

            async loginUser(){
                this.disable = true;

                try{
                    const formData = {
                        login: this.login,
                        password: this.password
                    };

                    await this.$store.dispatch('auth/login', formData);
                    this.$router.push('/admin/orders');
                } catch (e) {
                    this.disable = false;
                }
            },

            validate() {
                if (this.$refs.form.validate()) {
                    this.loginUser()
                }
            }
        }
    }
</script>