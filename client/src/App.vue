<template>
    <div id="app">
        <Navbar />
        <router-view></router-view>
        <a href="#home" id="smooth-scroll" v-smooth-scroll
            >Smooth Scroll Example (Click Me To Go Back Up)</a
        >
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
        ...mapActions(["attempt"])
    },

    created() {
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
