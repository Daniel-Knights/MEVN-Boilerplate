<template>
    <Posts />
</template>

<script>
import Posts from "../components/Posts";

export default {
    name: "index",

    metaInfo() {
        return {
            title: "Home"
        };
    },

    components: {
        Posts
    }
};
</script>

<style></style>
