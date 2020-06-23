<template>
    <div class="container">
        <h1>Latest Posts</h1>
        <div class="create-post">
            <label for="create-post">Say Something...</label>
            <input
                v-model="text"
                type="text"
                id="create-post"
                placeholder="Create a post"
            />
            <button @click="createHandler()">Post!</button>
        </div>
        <!-- CREATE POST HERE -->
        <hr />
        <p class="alert-danger" v-if="error">{{ error }}</p>
        <div class="posts-container">
            <div
                class="post"
                v-for="(post, index) in getPosts.data"
                :index="index"
                :key="post._id"
            >
                {{ post.created_at }}
                <i @click="deleteHandler(post._id)" class="fa fa-trash"></i>
                <p class="text">{{ post.text }}</p>
            </div>
        </div>
        <Pagination
            v-if="getPosts.total > 5"
            :fetch="fetchPosts"
            :get="getPosts"
            class="pagination"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Pagination from "./Pagination";

export default {
    name: "PostComponent",

    components: {
        Pagination
    },

    data() {
        return {
            error: "",
            text: ""
        };
    },

    computed: {
        ...mapGetters(["getPosts", "getAuthenticated"])
    },

    methods: {
        ...mapActions(["createPost", "deletePost", "fetchPosts"]),
        createHandler() {
            if (this.getAuthenticated) {
                if (this.text !== "") {
                    this.createPost(this.text);
                    this.error = "";
                } else {
                    this.error = "Post cannot be blank";
                }
            } else {
                this.error = "Must be logged in to create post";
            }
        },
        deleteHandler(id) {
            const post = {
                id,
                page: this.getPosts.current_page
            };

            if (this.getAuthenticated) {
                this.deletePost(post);
            } else {
                this.error = "Must be logged in to delete post";
            }
        }
    },

    async created() {
        await this.fetchPosts();
    }
};
</script>

<style scoped lang="scss">
#create-post {
    margin: 0 20px;
    padding: 5px;
    width: 300px;
    border: 1px solid $dark;
    border-radius: 5px;
}

.post {
    position: relative;
    border: 1px solid $primary;
    background-color: $light;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;

    .created-at {
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 15px 5px 15px;
        background-color: $dark;
        color: $white;
        font-size: 13px;
    }

    .text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }

    i {
        cursor: pointer;
        position: absolute;
        right: 10px;
    }
}
</style>
