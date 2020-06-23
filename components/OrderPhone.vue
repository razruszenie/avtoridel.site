<template>
    <div>
        <v-dialog
                v-model="dialogPhone"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="d-flex justify-center headline pa-4"
                        style="background-color: #778899; color: white"
                >
                    <div style="width: calc(100% - 90px);
    text-align: center;">Заказ артикула - {{ article }}</div>

                    <v-btn text
                           icon
                           style="position: absolute;
    right: 0;
    margin-top: 0;
    margin-right: 20px;"
                           @click="dialogPhone = false"
                           color="#B71C1C">
                        <v-icon large>close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-layout wrap class="mt-3">
                            <v-flex xs12>
                                <v-text-field
                                        label="Ваше имя"
                                        v-model="name"
                                        :rules="nameRules"
                                        required
                                        clearable
                                        outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 class="d-flex">
                                <v-autocomplete
                                        outline
                                        v-model="country"
                                        :items="countries"
                                        @change="changeMask"
                                        style="max-width: 90px"
                                        required
                                ></v-autocomplete>
                                <v-text-field
                                        label="Номер телефона"
                                        type="tel"
                                        v-model="phone"
                                        :rules="phoneRules"
                                        v-mask="mask"
                                        required
                                        clearable
                                        outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="more"
                                        :rules="moreRules"
                                        label="Дополнительная информация"
                                        outline
                                        clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 class="mt-4 d-flex justify-center">
                                <v-btn
                                        large
                                        :dark="!disable"
                                        :disabled="disable"
                                        @click="validate"
                                        color="#B71C1C"
                                >
                                    Отправить
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import AwesomeMask from 'awesome-mask'

    export default {

        directives: {
            'mask': AwesomeMask
        },

        data () {
            return {
                valid: true,
                disable: false,
                country: '+375',
                countries: ['+375', '+7'],
                mask: '99 99 999 99',
                name: '',
                nameRules: [
                    v => !!v || 'Поле имя обязательно',
                    v => (v && v.length <= 50) || 'Имя не может быть больше 50 символов'
                ],
                phone: '',
                phoneRules: [
                    v => !!v || 'Поле телефон обязательно',
                    v => (v && (v.length === 12 && this.country === '+375')
                        ||  (v.length === 13 && this.country === '+7')) || 'Введите коректный номер'
                ],
                more: '',
                moreRules: [
                    v => (v.length <= 255) || 'Дополнительно не может быть больше 255 символов'
                ]
            }

        },

        computed: {
            dialogPhone: {
                get () {
                    return this.$store.state.phone.dialogPhone
                },
                set (value) {
                    this.$store.commit('phone/setDialog', value)
                }
            },

            article() {
                return this.$store.getters['phone/article']
            },
        },


        methods: {
            changeMask(){
                if(this.country === '+375'){
                    this.mask = '99 99 999 99'
                }
                else{
                    this.mask = '999 999 99 99'
                }
                this.phone = ''
            },
            async fetchOrder(){
                try{

                    const formData = {
                        "name": this.name,
                        "prefix": this.country,
                        "phone": this.phone,
                        "more": this.more,
                        "part": this.article
                    }

                    await this.$axios.$post('api/order', formData);

                    localStorage.setItem('user', JSON.stringify(formData));

                    this.dialogPhone = false;

                    this.$store.dispatch('snackbar/show', `Заявка успешно отправлена. Наш менеджер
                    свяжеться с вами в ближайшее время`);

                }
                catch (e) {
                    console.log(e)
                }
                finally {
                    this.disable = false;
                }

            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.disable = true;
                    this.fetchOrder();
                }
            },
        },

        mounted() {
            const user = JSON.parse(localStorage.getItem("user"));

            if(user){
                this.name = user.name
                this.country = user.prefix
                this.phone = user.phone
            }
        }
    }
</script>