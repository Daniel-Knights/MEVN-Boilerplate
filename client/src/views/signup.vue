<template>
    <div>
        <h3>Signup</h3>
        <form @submit.prevent="signupHandler()">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    v-model="credentials.name"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="text"
                    name="name"
                />
            </div>
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
            <input type="submit" value="Signup" />
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
            }
        };
    },

    methods: {
        ...mapActions(["signup"]),
        signupHandler() {
            const name = this.credentials.name;
            const email = this.credentials.email;
            const password = this.credentials.password;

            // Simple validation
            if (email === "" || password === "" || name === "")
                return this.$toasted.show("Please fill required fields");
            if (!email.includes("@") || !email.includes("."))
                return this.$toasted.show("Invalid email");
            if (password.length < 6)
                return this.$toasted.show(
                    "Password must be at least 6 characters"
                );

            this.signup(this.credentials);
        }
    }
};
</script>
