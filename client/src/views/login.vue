<template>
	<div>
		<h3>Login</h3>
		<form @submit.prevent="loginHandler()">
			<div class="form-group">
				<label for="email">Email</label>
				<input v-model="credentials.email" type="text" name="email" />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input v-model="credentials.password" type="text" name="password" />
			</div>
			<input type="submit" value="Login" />
			<span v-if="error" class="error" v-html="error"></span>
			<span v-if="getAuthMessage" class="error" v-html="getAuthMessage"></span>
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
					content: `The login page of ${this.$appName}`,
				},
				{
					property: "og:description",
					content: `The login page of ${this.$appName}`,
				},
			],
		};
	},

	data() {
		return {
			credentials: {
				email: "",
				password: "",
			},
			error: "",
		};
	},

	computed: {
		...mapGetters(["getAuthMessage"]),
	},

	methods: {
		...mapActions(["login", "changeAuthMessage"]),
		loginHandler() {
			const email = this.credentials.email;
			const password = this.credentials.password;

			this.error = "";
			this.changeAuthMessage("");

			// Simple validation
			if (email !== "" && password !== "") {
				if (email.includes("@") && email.includes(".")) {
					if (password.length >= 6) {
						this.login(this.credentials);
					} else {
						this.error = "Password must be at least 6 characters";
					}
				} else {
					this.error = "Invalid email";
				}
			} else {
				this.error = "Please fill required fields";
			}
		},
	},

	beforeDestroy() {
		this.changeAuthMessage("");
	},
};
</script>

<style></style>
