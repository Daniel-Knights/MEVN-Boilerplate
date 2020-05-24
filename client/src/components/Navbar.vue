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
            <router-link v-else to="/" @click.native="logout"
                >Logout</router-link
            >
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
