<template>
    <div>
        <h3>Login</h3>
        <form @submit.prevent="loginHandler()">
            <div class="form-group">
                <label for="li-email">Email</label>
                <input
                    v-model="credentials.email"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="text"
                    id="li-email"
                />
            </div>
            <div class="form-group">
                <label for="li-password">Password</label>
                <input
                    v-model="credentials.password"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="password"
                    id="li-password"
                />
            </div>
            <input type="submit" value="Login" />
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'login',

    metaInfo() {
        return {
            title: 'Login',
        };
    },

    data() {
        return {
            credentials: {
                email: '',
                password: '',
            },
        };
    },

    methods: {
        ...mapActions(['login']),
        loginHandler() {
            const { email, password } = this.credentials;

            // Simple validation
            if (email === '' || password === '')
                return this.$toasted.show('Please fill required fields');
            if (!email.includes('@') || !email.includes('.'))
                return this.$toasted.show('Invalid email');
            if (password.length < 6)
                return this.$toasted.show('Password must be at least 6 characters');

            this.login(this.credentials);
        },
    },
};
</script>
