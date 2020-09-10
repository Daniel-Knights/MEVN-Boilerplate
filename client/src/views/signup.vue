<template>
    <div>
        <h3>Signup</h3>
        <form @submit.prevent="signupHandler()">
            <div class="form-group">
                <label for="su-name">Name</label>
                <input
                    v-model="credentials.name"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="text"
                    id="su-name"
                />
            </div>
            <div class="form-group">
                <label for="su-email">Email</label>
                <input
                    v-model="credentials.email"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="text"
                    id="su-email"
                />
            </div>
            <div class="form-group">
                <label for="su-password">Password</label>
                <input
                    v-model="credentials.password"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    type="password"
                    id="su-password"
                />
            </div>
            <input type="submit" value="Signup" />
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'signup',

    metaInfo() {
        return {
            title: 'Signup',
        };
    },

    data() {
        return {
            credentials: {
                name: '',
                email: '',
                password: '',
            },
        };
    },

    methods: {
        ...mapActions(['signup']),
        signupHandler() {
            const { name, email, password } = this.credentials;

            // Simple validation
            if (email === '' || password === '' || name === '')
                return this.$toasted.show('Please fill required fields');
            if (!email.includes('@') || !email.includes('.'))
                return this.$toasted.show('Invalid email');
            if (password.length < 6)
                return this.$toasted.show('Password must be at least 6 characters');

            this.signup(this.credentials);
        },
    },
};
</script>
