<template>
    <div>
        <h3>Signup</h3>
        <form @submit.prevent="signupHandler()">
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="credentials.name" type="text" name="name" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="credentials.email" type="text" name="email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    v-model="credentials.password"
                    type="text"
                    name="password"
                />
            </div>
            <input type="submit" value="Signup" />
            <span
                v-if="getAuthMessage"
                class="alert-danger auth-alert"
                v-html="getAuthMessage"
            ></span>
            <span
                v-if="error"
                class="alert-danger  auth-alert"
                v-html="error"
            ></span>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "signup",

    metaInfo() {
        return {
            title: "Signup",
            meta: [
                {
                    name: "description",
                    content: `The signup page of ${this.$appName}`
                },
                {
                    property: "og:description",
                    content: `The signup page of ${this.$appName}`
                }
            ]
        };
    },

    data() {
        return {
            credentials: {
                name: "",
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
        ...mapActions(["signup", "changeAuthMessage"]),
        signupHandler() {
            const name = this.credentials.name;
            const email = this.credentials.email;
            const password = this.credentials.password;

            this.error = "";
            this.changeAuthMessage("");

            // Simple validation
            if (email === "" || password === "" || this.name === "")
                return (this.error = "Please fill required fields");
            if (!email.includes("@") || !email.includes("."))
                return (this.error = "Invalid email");
            if (password.length < 6)
                return (this.error = "Password must be at least 6 characters");

            this.signup(this.credentials);
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
