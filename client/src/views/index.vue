<template>
	<Posts />
</template>

<script>
import Posts from "../components/Posts";

export default {
	name: "index",

	metaInfo() {
		return {
			title: "Home",
			meta: [
				{
					name: "description",
					content: `The home page of ${this.$appName}`,
				},
				{
					property: "og:description",
					content: `The home page of ${this.$appName}`,
				},
			],
		};
	},

	components: {
		Posts,
	},
};
</script>

<style></style>
