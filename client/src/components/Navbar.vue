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
        </nav>
        <scrollactive
            :activeClass="navSelected"
            :offset="0"
            :duration="1000"
            bezier-easing-value="0.5, 0, 0.35, 1"
            :modifyUrl="false"
            tag="div"
        >
            <a
                href="#smooth-scroll"
                class="scrollactive-item"
                id="smooth-scroll-nav"
                @mouseover="svgMouseover()"
                @mouseout="svgMouseout()"
            >
                Smooth Scroll
            </a>
            <div id="smooth-scroll-svg-container">
                <svg id="smooth-scroll-svg" width="120" height="30">
                    <rect
                        width="120"
                        height="30"
                        fill="rgba(255,255,255,0.5)"
                    />
                </svg>
            </div>
        </scrollactive>
    </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Navbar",

    data() {
        return {
            navSelected: "nav-loaded"
        };
    },

    computed: {
        ...mapGetters(["getAuthenticated"])
    },

    methods: {
        ...mapActions(["logout"]),
        svgMouseover() {
            const svg = document.getElementById("smooth-scroll-svg");

            svg.style.transform = "rotateY(0deg)";
            svg.style.maxHeight = "100%";
            svg.style.opacity = "1";
        },
        svgMouseout() {
            const svg = document.getElementById("smooth-scroll-svg");

            svg.style.transform = "rotateY(30deg)";
            svg.style.maxHeight = "50%";
            svg.style.opacity = "0";
        }
    },

    mounted() {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        const scrollLink = document.getElementById("smooth-scroll-nav");
        const svg = document.getElementById("smooth-scroll-svg");

        svg.style.width =
            svg.parentNode.previousSibling.offsetWidth + 20 + "px";

        if (mediaQuery.matches) {
            svg.style.display = "none";
            scrollLink.innerText = "Scroll";
        } else {
            svg.style.display = "block";
            scrollLink.innerText = "Smooth Scroll";
        }

        this.navSelected = "nav-selected";
    }
};
</script>

<style scoped lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    z-index: 100;
    background: linear-gradient(to right, $black, $light);

    nav {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 40%;
        height: 100%;

        a {
            position: relative;
            color: $white;
            transition: color 0.2s;
            z-index: 1;
        }

        a:hover {
            color: $light;
        }
    }

    .scrollactive-nav {
        margin: 0 50px;
        #smooth-scroll-nav {
            position: relative;
            transition: color 0.2s;
            z-index: 1;
        }
    }
}

#smooth-scroll-svg-container {
    @include flex-basic;

    #smooth-scroll-svg {
        position: absolute;
        margin-top: -22px;
        max-height: 50%;
        transform: rotateY(30deg);
        opacity: 0;
        border-radius: 5px;
        transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
}

.nav-loaded {
    color: initial;
}

.nav-selected {
    color: lighten($black, 20%) !important;
}
</style>
