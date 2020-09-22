<template>
    <div id="app">
        <Navbar />
        <transition name="loading">
            <Loading v-if="loading" />
        </transition>
        <keep-alive include="contact,login,signup">
            <router-view></router-view>
        </keep-alive>
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
import { mapActions } from 'vuex';

import Navbar from './components/Navbar';
import Loading from './components/Loading';

export default {
    name: 'App',

    metaInfo() {
        return {
            title: 'MEVN Boilerplate',
            titleTemplate: '%s | MEVN Boilerplate',
        };
    },

    components: {
        Navbar,
        Loading,
    },

    data() {
        return {
            loading: true,
        };
    },

    methods: {
        ...mapActions(['attempt', 'logout']),
        checkToken() {
            // Seven day JWT TTL
            const date = new Date();
            const auth = JSON.parse(localStorage.getItem('auth'));

            if (auth === null) return;
            if (date.getTime() > auth.ttl) return this.logout();

            this.attempt();
        },
    },

    created() {
        this.loading = true;
        this.checkToken();

        window.addEventListener('load', () => (this.loading = false));
    },
};
</script>

<style lang="scss">
.loading-leave-active,
.loading-leave-to {
    opacity: 0;
    transition: opacity 0.5s;
}

#smooth-scroll {
    display: block;
    margin-top: 10000px !important;
    font-size: 20px;
    transition: color 0.2s;

    &:hover {
        color: lighten($black, 50%);
    }
}
</style>
