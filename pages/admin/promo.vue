<template>
    <div class="b-c-admin">
        <v-card>
            <v-card-title>
                <span class="headline">Проомо</span>
            </v-card-title>
            <v-card-text>
                <v-form
                        ref="form"
                        class="create-form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-file-input
                            :key="inKey"
                            accept="image/*"
                            v-model="files"
                            :rules="imageRules"
                            label="Выберите изображение"
                    ></v-file-input>

                    <v-btn color="warning"
                           style="margin-left: 10px"
                           @click="validate"
                           :disabled="disable"
                           :dark="!disable">
                        Добавить
                    </v-btn>
                </v-form>

                <v-layout wrap class="mt-3">
                <v-flex v-if="promos.length !== 0"
                        :key="index"
                        v-for="(promo, index) in promos"
                        class="bampart-input-pd"
                        xs12 sm6 md3
                >
                    <div
                            class="imagewrap"
                    >
                        <a :href="'../' + promo.file"
                           target="_blank">
                            <img class="bampart-image-thmb"
                                 :src="'../' + promo.file"
                                 width="168"
                                 height="118">
                        </a>
                        <v-btn color="error" fab
                               small
                               dark
                               class="bampart-btn-thmb"
                               @click="deleteImage(promo._id, promo.file)"
                        >
                            <v-icon>cancel</v-icon>
                        </v-btn>

                    </div>
                </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
        <v-card class="mt-4">
            <v-card-title class="pb-0">
                <span class="headline">Курсы валют</span>
            </v-card-title>
            <v-card-text>
                <v-form
                        ref="formCur"
                        v-model="validCur"
                        onSubmit="return false;"
                        lazy-validation
                >
                    <v-layout wrap
                              style="margin: 0 -6px 0 -6px">
                        <v-flex xs12 md6 lg4>
                            <v-layout wrap class="pa-2">
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="USD"
                                            :rules="currencyRules"
                                            label="USD"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="EUR"
                                            :rules="currencyRules"
                                            label="EUR"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="RUB"
                                            :rules="currencyRules"
                                            label="RUB"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="BYN"
                                            :rules="currencyRules"
                                            label="BYN"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn color="primary"
                                   :dark="!disableCur"
                                   :disabled="disableCur"
                                   @click="validateCur()"
                            >Обновить</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        layout: "admin",
        middleware: ['admin-auth'],

        head() {
            return {
                title: 'Админ-панель | Промо'
            }
        },

        async asyncData({$axios}) {

            try {
                const res = await $axios.$get('api/news/promo');
                const resCur = await $axios.$get('api/currency');


                return {
                    promos: res, USD: resCur.USD || 1, EUR: resCur.EUR || 1, BYN: resCur.BYN || 1, RUB: resCur.RUB || 1, id: resCur._id
                }
            }
            catch (e) {
                console.log(e)
            }
        },

        data () {
            return {
                valid: true,
                disable: false,
                inKey: 0,
                files: [],
                imageRules: [
                    value => !value || value.size < 10000000 || 'Выберите изображение(не больше 10 mb)',
                ],


                validCur: true,
                disableCur: false,
                currencyRules: [
                    v => (v.toString().length <= 10) || 'Курс не может быть больше 10 символов',
                    v => (v && v >= 0) || 'Курс не может быть меньше 0',
                ],
            }
        },

        methods: {

            clear(){
                this.files = null
                this.file = ''
                this.inKey += 1
                this.$refs.form.resetValidation()
            },

            async fetchPromo(){
                const res = await this.$axios.$get('api/news/promo');
                this.promos = res
            },

            async addPromo(formData){

                try{
                    await this.$axios.$post('api/news/admin/promo', formData);

                    this.clear()
                    this.fetchPromo();
                    this.$store.dispatch('snackbar/show', `Успешно добавлено`);

                }
                catch (e) {
                    console.log(e)
                }
                finally {
                    this.disable = false;
                }

            },
            async deleteImage(id, path){

                if(confirm('Удалить изображение')) {
                        try {
                            await this.$axios.$delete('api/news/admin/promo/' + id, {
                                data: { path: path }
                            });

                            this.$store.dispatch('snackbar/show', `Изображение удалено`);

                            this.fetchPromo()
                        } catch (e) {
                            console.log(e)
                        } finally {
                            this.disable = false;
                        }
                }


            },
            validate() {
                if (this.$refs.form.validate()) {

                    if(this.promos.length < 4){
                        this.disable = true;

                        try{

                            let fd = new FormData();

                            fd.append("file", this.files, this.files.name);
                            this.addPromo(fd)

                        } catch (e) {
                            console.log(e)
                        }
                    }
                    else{
                        alert("Не больше 4 промо!!!")

                    }

                }
            },

            async updateCurrency() {

                const formData = {
                    USD: this.USD,
                    EUR: this.EUR,
                    BYN: this.BYN,
                    RUB: this.RUB,
                }

                try {
                    await this.$axios.$put('api/currency/admin/' + this.id, formData);

                    this.$store.dispatch('snackbar/show', `Успешно обновлено`);

                } catch (e) {
                    this.$store.dispatch('snackbar/show', `Не удалось обновить`);
                    console.log(e)
                } finally {
                    this.disableCur = false;
                }

            },

            async validateCur() {
                if (this.$refs.formCur.validate()) {
                    this.disableCur = true;
                    await this.updateCurrency()
                }
            },
        }
    }
</script>
<style lang="scss">
    .bampart-input-pd{
        padding: 10px 10px 0 10px;

        .imagewrap {
            display: inline-block;
            position: relative;

            .bampart-image-thmb{
                padding: .25rem;
                background-color: #fff;
                border: 1px solid #dee2e6;
                border-radius: .25rem;
                max-width: 100%;
                height: auto;
            }

            .bampart-btn-thmb{
                position: absolute;
                top: 0;
                right: 0;
                margin-right: 1px;
                margin-top: 1px;
            }
        }
    }
</style>
