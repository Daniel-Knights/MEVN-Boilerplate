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
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "login",

    metaInfo() {
        return {
            title: "Login"
        };
    },

    data() {
        return {
            credentials: {
                email: "",
                password: ""
            }
        };
    },

    methods: {
        ...mapActions(["login"]),
        loginHandler() {
            const email = this.credentials.email;
            const password = this.credentials.password;

            // Simple validation
            if (email === "" || password === "")
                return this.$toasted.show("Please fill required fields");
            if (!email.includes("@") || !email.includes("."))
                return this.$toasted.show("Invalid email");
            if (password.length < 6)
                return this.$toasted.show(
                    "Password must be at least 6 characters"
                );

            this.login(this.credentials);
        }
    }
};
</script>
