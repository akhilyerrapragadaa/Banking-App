import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css';

import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue)

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    }
});