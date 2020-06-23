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
            <router-link to="/contact">Contact</router-link>
            <scrollactive
                active-class="nav-selected"
                :offset="0"
                :duration="1000"
                bezier-easing-value=".5,0,.35,1"
                :modifyUrl="false"
            >
                <a href="#smooth-scroll" class="scrollactive-item"
                    >Smooth Scroll</a
                >
            </scrollactive>
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

<style scoped lang="scss">
header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    z-index: 100;
    background: linear-gradient(to right, $dark, $light);

    nav {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 40%;
        height: 100%;

        a {
            color: $white;
            transition: color 0.2s;
        }

        a:hover {
            color: $light;
        }
    }
}

.nav-selected {
    font-weight: bold;
}
</style>
