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
import Axios from 'axios';

export default {
    name: 'photos',

    metaInfo() {
        return {
            title: 'Photos',
        };
    },

    data() {
        return {
            photos: [],
        };
    },

    methods: {
        async fetchPhotos() {
            const photos = await Axios.get(
                'https://pixabay.com/api/?key=<YOUR_API_KEY>&q=animals&per_page=100'
            );

            photos.data.hits.forEach(photo => {
                let imageObj = {
                    src: photo.webformatURL,
                    loading: photo.previewURL,
                };

                this.photos.push(imageObj);
            });
        },
    },

    created() {
        this.fetchPhotos();
    },
};
</script>

<style scoped lang="scss">
.img-container .images {
    @include flex-responsive;
    margin: 20px;

    .image {
        height: 300px;
        min-width: 300px;

        img[lazy='loading'] {
            filter: blur(10px) grayscale(100%);
        }

        img {
            height: 300px;
            min-width: 300px;
            object-fit: cover;
            filter: blur(0);
            transition: filter 0.2s;
            overflow: hidden;
        }
    }
}
</style>
