<template>
	<div id="app">
		<Navbar />
		<router-view></router-view>
	</div>
</template>

<script>
import { mapActions } from "vuex";

import Navbar from "./components/Navbar.vue";

export default {
	name: "App",

	metaInfo() {
		return {
			title: "MEVN Boilerplate",
			titleTemplate: "%s | MEVN Boilerplate",
		};
	},

	components: {
		Navbar,
	},

	methods: {
		...mapActions(["attempt"]),
	},

	created() {
		this.attempt();
	},
};
</script>

<style></style>
