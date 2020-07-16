import Axios from "axios";
import router from "../../router/index";

const actions = {
    async signup({ commit }, credentials) {
        if (
            credentials.name !== "" &&
            credentials.email !== "" &&
            credentials.password !== ""
        ) {
            await Axios.post("/auth/signup", credentials)
                .then(res => {
                    const date = new Date();
                    const auth = {
                        token: res.data.token,
                        ttl: date.getTime() + 604800000
                    };

                    localStorage.setItem("auth", JSON.stringify(auth));

                    commit("setUser", res.data.userInfo);
                    commit("setToken", res.data.token);
                    commit("setAuthenticated", true);
                    router.push("/");
                })
                .catch(err => {
                    this._vm.$toasted.show(err.response.data.msg);
                });
        }
    },

    async login({ commit }, credentials) {
        if (credentials.email !== "" && credentials.password !== "") {
            await Axios.post("/auth/login", credentials)
                .then(res => {
                    const date = new Date();
                    const auth = {
                        token: res.data.token,
                        ttl: date.getTime() + 604800000
                    };

                    localStorage.setItem("auth", JSON.stringify(auth));

                    commit("setUser", res.data.userInfo);
                    commit("setToken", res.data.token);
                    commit("setAuthenticated", true);
                    router.push("/");
                })
                .catch(err => {
                    this._vm.$toasted.show(err.response.data.msg);
                });
        }
    },

    async attempt({ commit }) {
        const token = JSON.parse(localStorage.getItem("auth")).token;

        if (token !== null) {
            await Axios.get("/auth/user", {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token
                }
            })
                .then(res => {
                    commit("setUser", res.data[0]);
                    commit("setToken", token);
                    commit("setAuthenticated", true);
                })
                .catch(err => {
                    console.log(err);

                    localStorage.removeItem("auth");
                });
        }
    },

    logout({ commit }) {
        localStorage.removeItem("auth");

        commit("setUser", null);
        commit("setToken", null);
        commit("setAuthenticated", false);
    }
};

const mutations = {
    setUser: (state, user) => (state.user = user),
    setToken: (state, token) => (state.token = token),
    setAuthenticated: (state, bool) => (state.authenticated = bool)
};

const state = {
    user: null,
    token: null,
    authenticated: false
};

const getters = {
    getUser: state => state.user,
    getToken: state => state.token,
    getAuthenticated: state => state.authenticated
};

export default {
    state,
    getters,
    actions,
    mutations
};
