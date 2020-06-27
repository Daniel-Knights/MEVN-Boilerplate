import Axios from "axios";

const actions = {
	async fetchPosts({ commit }, page) {
		const pageCheck = page ? page : 1;

		await Axios.get(`/api/posts?page=${pageCheck}`)
			.then((res) => {
				res.data["path"] = window.location.origin;

				commit("setPosts", res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	},

	async createPost({ dispatch }, text) {
		const token = localStorage.getItem("token");

		if (token !== null) {
			await Axios.post(
				"/api/posts",
				{
					data: text,
				},
				{
					headers: {
						"Content-type": "application/json",
						"x-auth-token": token,
					},
				}
			)
				.then((res) => {
					dispatch("fetchPosts");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	},

	async deletePost({ dispatch }, post) {
		const token = localStorage.getItem("token");

		if (token !== null) {
			await Axios.delete(`/api/posts/${post.id}`, {
				headers: {
					"Content-type": "application/json",
					"x-auth-token": token,
				},
			}).then((res) => {
				dispatch("fetchPosts", post.page);
			});
		}
	},
};

const mutations = {
	setPosts: (state, posts) => (state.posts = posts),
};

const state = {
	posts: [],
};

const getters = {
	getPosts: (state) => state.posts,
};

export default {
	state,
	getters,
	actions,
	mutations,
};
