<template>
    <div id="app">
        <Navbar />
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

import Navbar from "./components/Navbar.vue";

export default {
    name: "App",

    metaInfo() {
        return {
            title: "MEVN Boilerplate",
            titleTemplate: "%s | MEVN Boilerplate"
        };
    },

    components: {
        Navbar
    },

    methods: {
        ...mapActions(["attempt", "logout"])
    },

    created() {
        // Seven day JWT TTL
        const date = new Date();
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth === null) return;

        if (date.getTime() > auth.ttl + 604800000) return this.logout();

        this.attempt();
    }
};
</script>

<style>
#smooth-scroll {
    display: block;
    margin-top: 10000px !important;
    font-size: 20px;
}
</style>
