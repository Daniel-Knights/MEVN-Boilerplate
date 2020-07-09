<template>
    <div id="app">
        <Navbar />
        <Loading v-if="loading" />
        <router-view></router-view>
        <scrollactive
            :offset="0"
            :duration="1000"
            bezier-easing-value=".5,0,.35,1"
            :modifyUrl="false"
        >
            <a href="#home" id="smooth-scroll" class="scrollactive-item"
                >Smooth Scroll Example (Click Me To Go Back Up)</a
            >
        </scrollactive>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

export default {
    name: "App",

    metaInfo() {
        return {
            title: "MEVN Boilerplate",
            titleTemplate: "%s | MEVN Boilerplate"
        };
    },

    components: {
        Navbar,
        Loading
    },

    data() {
        return {
            loading: true
        };
    },

    methods: {
        ...mapActions(["attempt", "logout"]),
        checkToken() {
            // Seven day JWT TTL
            const date = new Date();
            const auth = JSON.parse(localStorage.getItem("auth"));

            if (auth === null) return;

            if (date.getTime() > auth.ttl) return this.logout();

            this.attempt();
        }
    },

    created() {
        this.loading = true;
        this.checkToken();

        window.addEventListener("load", () => {
            this.loading = false;

            // Lazy load Fontawesome kit
            const script = document.createElement("script");
            script.src = "https://kit.fontawesome.com/6994a6ed7d.js";
            script.crossOrigin = "anonymous";

            document.getElementsByTagName("head")[0].appendChild(script);
        });
    }
};
</script>

<style lang="scss">
#smooth-scroll {
    display: block;
    margin-top: 10000px !important;
    font-size: 20px;
    transition: color 0.2s;
}

#smooth-scroll:hover {
    color: lighten($black, 50%);
}
</style>
