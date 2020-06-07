<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link v-if="!getAuthenticated" to="/login"
                >Login</router-link
            >
            <router-link v-if="!getAuthenticated" to="/signup"
                >Signup</router-link
            >
            <router-link v-if="getAuthenticated" to="/" @click.native="logout"
                >Logout</router-link
            >
            <router-link v-if="getAuthenticated" to="/photos"
                >Photos</router-link
            >
            <a href="#smooth-scroll" v-smooth-scroll>Smooth Scroll</a>
        </nav>
    </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Navbar",

    computed: {
        ...mapGetters(["getAuthenticated"])
    },

    methods: {
        ...mapActions(["logout"])
    }
};
</script>

<style></style>
