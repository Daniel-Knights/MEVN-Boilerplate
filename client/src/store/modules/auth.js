import Axios from "axios";
import router from "../../router/index";

const actions = {
	async signup({ commit }, credentials) {
		if (
			credentials.name !== "" &&
			credentials.email !== "" &&
			credentials.password !== ""
		) {
			await Axios.post("auth/signup", credentials)
				.then((res) => {
					localStorage.setItem("token", res.data.token);
					commit("setUser", res.data.userInfo);
					commit("setToken", res.data.token);
					commit("setAuthenticated", true);
					commit("setAuthMessage", "");
					router.push("/");
				})
				.catch((err) => {
					commit("setAuthMessage", err.response.data.msg);
				});
		}
	},

	async login({ commit }, credentials) {
		if (credentials.email !== "" && credentials.password !== "") {
			await Axios.post("auth/login", credentials)
				.then((res) => {
					localStorage.setItem("token", res.data.token);
					commit("setUser", res.data.userInfo);
					commit("setToken", res.data.token);
					commit("setAuthenticated", true);
					commit("setAuthMessage", "");
					router.push("/");
				})
				.catch((err) => {
					commit("setAuthMessage", err.response.data.msg);
				});
		}
	},

	async attempt({ commit }) {
		const token = localStorage.getItem("token");

		if (token !== null) {
			await Axios.get("auth/user", {
				headers: {
					"Content-type": "application/json",
					"x-auth-token": token,
				},
			})
				.then((res) => {
					commit("setUser", res.data[0]);
					commit("setAuthenticated", true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	},

	logout({ commit }) {
		localStorage.removeItem("token");
		commit("setUser", null);
		commit("setToken", null);
		commit("setAuthenticated", false);
	},

	changeAuthMessage({ commit }, message) {
		commit("setAuthMessage", message);
	},
};

const mutations = {
	setUser: (state, user) => (state.user = user),
	setToken: (state, token) => (state.token = token),
	setAuthMessage: (state, message) => (state.authMessage = message),
	setAuthenticated: (state, bool) => (state.authenticated = bool),
};

const state = {
	user: null,
	token: null,
	authenticated: false,
	authMessage: "",
};

const getters = {
	getUser: (state) => state.user,
	getToken: (state) => state.token,
	getAuthenticated: (state) => state.authenticated,
	getAuthMessage: (state) => state.authMessage,
};

export default {
	state,
	getters,
	actions,
	mutations,
};
