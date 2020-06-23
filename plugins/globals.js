import Vue from 'vue'
import DateFilter from '~/common/date.filter'

import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
    iconfont: 'mdi'
})

Vue.filter('date', DateFilter)