<template>
    <div>
        <h3>Login</h3>
        <form @submit.prevent="loginHandler()">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    v-model="credentials.email"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="text"
                    name="email"
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    v-model="credentials.password"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="password"
                    name="password"
                />
            </div>
            <input type="submit" value="Login" />
            <span
                v-if="error"
                class="alert-danger  auth-alert"
                v-html="error"
            ></span>
            <span
                v-if="getAuthMessage"
                class="alert-danger  auth-alert"
                v-html="getAuthMessage"
            ></span>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "login",

    metaInfo() {
        return {
            title: "Login",
            meta: [
                {
                    name: "description",
                    content: `The login page of ${this.$appName}`
                },
                {
                    property: "og:description",
                    content: `The login page of ${this.$appName}`
                }
            ]
        };
    },

    data() {
        return {
            credentials: {
                email: "",
                password: ""
            },
            error: ""
        };
    },

    computed: {
        ...mapGetters(["getAuthMessage"])
    },

    methods: {
        ...mapActions(["login", "changeAuthMessage"]),
        loginHandler() {
            const email = this.credentials.email;
            const password = this.credentials.password;

            this.error = "";
            this.changeAuthMessage("");

            // Simple validation
            if (email === "" || password === "")
                return (this.error = "Please fill required fields");
            if (!email.includes("@") || !email.includes("."))
                return (this.error = "Invalid email");
            if (password.length < 6)
                return (this.error = "Password must be at least 6 characters");

            this.login(this.credentials);
        }
    },

    beforeDestroy() {
        this.changeAuthMessage("");
    }
};
</script>

<style scoped>
.auth-alert {
    margin: 10px auto;
    padding: 5px 0;
    width: 300px;
    border-radius: 5px;
}
</style>
