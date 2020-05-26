<template>
    <div class="img-container">
        <h1>Photo Stream</h1>
        <div class="images">
            <div v-for="photo in photos" :key="photo.id" class="image">
                <img v-lazy="photo" />
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";

export default {
    name: "photos",

    metaInfo() {
        return {
            title: "Photos",
            meta: [
                {
                    name: "description",
                    content: `The photo page of ${this.$appName}`
                },
                {
                    property: "og:description",
                    content: `The photo page of ${this.$appName}`
                }
            ]
        };
    },

    data() {
        return {
            photos: []
        };
    },

    methods: {
        async fetchPhotos() {
            const photos = await Axios.get(
                "https://pixabay.com/api/?key=<API_KEY>&q=animals&per_page=100"
            );

            photos.data.hits.forEach(i => {
                let imageObj = {
                    src: i.webformatURL,
                    loading: i.webformatURL
                };

                this.photos.push(imageObj);
            });
        }
    },

    created() {
        this.fetchPhotos();
    }
};
</script>

<style></style>
