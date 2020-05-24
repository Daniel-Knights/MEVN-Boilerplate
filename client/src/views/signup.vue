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
				<input v-model="credentials.password" type="text" name="password" />
			</div>
			<input type="submit" value="Signup" />
			<span v-if="getAuthMessage" class="error" v-html="getAuthMessage"></span>
			<span v-if="error" class="error" v-html="error"></span>
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
					content: `The signup page of ${this.$appName}`,
				},
				{
					property: "og:description",
					content: `The signup page of ${this.$appName}`,
				},
			],
		};
	},

	data() {
		return {
			credentials: {
				name: "",
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
		...mapActions(["signup", "changeAuthMessage"]),
		signupHandler() {
			const name = this.credentials.name;
			const email = this.credentials.email;
			const password = this.credentials.password;

			this.error = "";
			this.changeAuthMessage("");

			// Simple validation
			if (email !== "" && password !== "" && this.name !== "") {
				if (email.includes("@") && email.includes(".")) {
					if (password.length >= 6) {
						this.signup(this.credentials);
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
