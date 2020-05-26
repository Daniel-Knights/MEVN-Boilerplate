import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import VueAxios from "vue-axios";

import vOutsideEvents from "vue-outside-events";
import VueLazyLoad from "vue-lazyload";

Vue.use(VueAxios, Axios);
Vue.use(vOutsideEvents);
Vue.use(VueLazyLoad, {
    attempt: 1,
    error: require("./assets/img/svg/error.svg"),
    preLoad: 1.9,
    observer: true,
    observerOptions: {
        rootMargin: "0px",
        threshold: 0.1
    }
});

// Global variable for accessing the apps name
Vue.prototype.$appName = "MEVN Boilerplate";

// Set base url for Axios
// Works in both development and production
Axios.defaults.baseURL = window.location.origin + "/api/";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
