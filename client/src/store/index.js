import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import posts from "./modules/posts";
import auth from "./modules/auth";

export default new Vuex.Store({
	modules: {
		posts,
		auth
	},
});
