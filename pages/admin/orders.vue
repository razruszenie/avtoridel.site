<template>
    <div class="b-c-admin">
        <v-card id="order-scroll">
            <v-simple-table fixed-header>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-xs-left">Поступил</th>
                        <th class="text-xs-left">Заказ</th>
                        <th class="text-xs-left">Клиент</th>
                        <th class="text-xs-left">Телефон</th>
                        <th class="text-xs-left">Дополнительно</th>
                        <th class="text-xs-left">Обработать</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in items" :key="item._id">
                        <td>{{ item.viewed_at | date }}</td>
                        <td>{{ item.part }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>
                            <span v-if="item.more !== ''">{{ item.more }}</span>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <v-tooltip v-if="item.status === 0"
                                    bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn color="success"
                                           v-on="on"
                                           @click="successOrder(item._id)"
                                           small dark>
                                        <v-icon>done</v-icon>
                                    </v-btn>
                                </template>
                                <span>Завершить</span>
                            </v-tooltip>
                            <span v-else>Рассмотрено {{ item.viewed_at | date }}</span>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div style="padding: 10px; border-top: .6px solid #dee2e6;" class="text-center">
                <v-pagination
                        :length="page_count"
                        :total-items="total"
                        total-visible="7"
                        v-model="page"
                        @input="goToPage(page)"
                ></v-pagination>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        layout: "admin",
        middleware: ['admin-auth'],

        head() {
            return {
                title: 'Админ-панель | Заявки'
            }
        },

        async asyncData({$axios, query}) {

            try{
                const qp = query.page
                let res = []

                if (typeof (qp) !== 'undefined'){

                    res = await $axios.$get('api/order/admin?page=' + qp);
                }
                else{
                    res = await $axios.$get('api/order/admin');
                }

                return {
                    items: res.docs,
                    page: res.page,
                    page_count: res.totalPages,
                    total: res.totalDocs
                }

            }
            catch (e) {

                return {
                    items: [], page: 1,
                    page_count: 0, total: 0
                }
            }

        },

        methods: {

            async successOrder(id) {
                try {
                    await this.$axios.$put(encodeURI('api/order/admin/' + id));

                    const qp = this.$route.query.page;

                    let res = [];

                    if (typeof (qp) !== 'undefined'){
                        res = await this.$axios.$get('api/order/admin?page=' + qp);
                    }
                    else{
                        res = await this.$axios.$get('api/order/admin');
                    }

                    this.$store.dispatch('drawer/getActiveCount')

                    this.$store.dispatch('snackbar/show', `Успешно рассмотрено`);

                    this.items = res.docs;
                    this.page = res.page;
                    this.page_count = res.totalPages;
                    this.total = res.totalDocs;
                } catch (e) {
                    console.log(e)
                }
            },

            async goToPage(){
                try {

                    document.getElementById("order-scroll").scrollIntoView(true);
                    window.scroll(0, window.scrollY - 60);

                    const res = await this.$axios.$get('api/order/admin?page=' + this.page);

                    this.items = res.docs;
                    this.page = res.page;
                    this.page_count = res.totalPages;
                    this.total = res.totalDocs;

                    this.$router.push('?page=' + this.page);

                } catch (e) {
                    console.log(e)
                }
            }

        }
    }
</script>