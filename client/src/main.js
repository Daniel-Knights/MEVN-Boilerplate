import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-dk-lib';
import 'vue-dk-lib/dist/dkLib.css';
import './functions';

import Axios from 'axios';
Axios.defaults.baseURL = '/api';

import vOutsideEvents from 'vue-outside-events';
import VueLazyLoad from 'vue-lazyload';
import VueScrollactive from 'vue-scrollactive';
import Toasted from 'vue-toasted';

Vue.use(vOutsideEvents);
Vue.use(VueLazyLoad, {
    attempt: 1,
    error: require('./assets/img/svg/error.svg'),
    preLoad: 2,
});
Vue.use(VueScrollactive);
Vue.use(Toasted, {
    theme: 'outline',
    position: 'bottom-right',
    duration: 5000,
});

// Global variable for accessing the apps name
Vue.prototype.$appName = 'MEVN Boilerplate';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
