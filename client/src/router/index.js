import Vue from "vue";
import VueRouter from "vue-router";

import VueMeta from "vue-meta";

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
	{
		path: "/",
		name: "index",
		component: () =>
			import(/* webpackChunkName: "index" */ "../views/index.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () =>
			import(/* webpackChunkName: "login" */ "../views/login.vue"),
	},
	{
		path: "/signup",
		name: "signup",
		component: () =>
			import(/* webpackChunkName: "signup" */ "../views/signup.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
