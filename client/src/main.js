import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import VueAxios from "vue-axios";

import vOutsideEvents from "vue-outside-events";
import VueLazyLoad from "vue-lazyload";
import VueScrollactive from "vue-scrollactive";

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
Vue.use(VueScrollactive);

// Global variable for accessing the apps name
Vue.prototype.$appName = "MEVN Boilerplate";

// Set base url for Axios
const env = process.env.VUE_APP_NODE_ENV;

if (env === "development") {
    Axios.defaults.baseURL = "http://localhost:3000/api/";
} else if (env === "production") {
    Axios.defaults.baseURL = window.location.origin + "/api/";
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
