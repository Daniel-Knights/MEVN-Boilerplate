<template>
    <div>
        <h3>Contact</h3>
        <form @submit.prevent="formHandler()">
            <div class="form-group">
                <label for="ct-name">NAME</label>
                <input
                    type="text"
                    id="ct-name"
                    v-model="contact.name"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    :class="{
                        'alert-success': contactSuccess.name,
                        'alert-danger': contactSuccess.name === false,
                    }"
                />
            </div>
            <div class="form-group">
                <label for="ct-email">EMAIL</label>
                <input
                    type="text"
                    id="ct-email"
                    v-model="contact.email"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    :class="{
                        'alert-success': contactSuccess.email,
                        'alert-danger': contactSuccess.email === false,
                    }"
                />
            </div>
            <div class="form-group">
                <label for="ct-phone">PHONE NUMBER (OPTIONAL)</label>
                <input
                    type="text"
                    id="ct-phone"
                    v-model="contact.phone"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    :class="{
                        'alert-success': contactSuccess.phone,
                        'alert-danger': contactSuccess.phone === false,
                    }"
                />
            </div>
            <div class="form-group">
                <label for="ct-enquiry">MESSAGE</label>
                <textarea
                    id="ct-enquiry"
                    cols="30"
                    rows="10"
                    v-model="contact.message"
                    @focus="$hideLabel($event)"
                    @focusout="$showLabel($event)"
                    :class="{
                        'alert-success': contactSuccess.message,
                        'alert-danger': contactSuccess.message === false,
                    }"
                ></textarea>
            </div>
            <div class="form-submit">
                <input
                    type="submit"
                    :value="successMessage"
                    :class="{
                        'alert-submit-success': success,
                        'alert-submit-danger': success === false,
                    }"
                />
                <div v-if="loading" class="loading-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    name: 'contact',

    metaInfo() {
        return {
            title: 'Contact',
        };
    },

    data() {
        return {
            contact: {
                name: '',
                email: '',
                phone: '',
                message: '',
            },
            contactSuccess: {
                name: null,
                email: null,
                message: null,
            },
            successMessage: 'Send',
            success: null,
            loading: false,
        };
    },

    methods: {
        async sendEmail() {
            // Prevent button spam
            if (this.loading) return;

            this.loading = true;
            this.successMessage = ' ';

            await Axios.post('/direct', this.contact)
                .then(res => {
                    this.loading = false;
                    this.success = res.data.success;
                    this.successMessage = res.data.msg;

                    this.contact.name = '';
                    this.contact.email = '';
                    this.contact.phone = '';
                    this.contact.message = '';

                    setTimeout(() => {
                        this.successMessage = 'Send';
                        this.success = null;
                    }, 5000);
                })
                .catch(err => {
                    this.loading = false;
                    this.success = err.response.data.success;
                    this.successMessage = err.response.data.msg;

                    setTimeout(() => {
                        this.successMessage = 'Send';
                        this.success = null;
                    }, 5000);
                });
        },
        formHandler() {
            const { name, email, message } = this.contact,
                success = this.contactSuccess;

            // Individual input validation
            name !== '' ? (success.name = true) : (success.name = false);

            if (email !== '') {
                email.includes('@') && email.includes('.')
                    ? (success.email = true)
                    : (success.email = false);
            } else success.email = false;

            message !== '' ? (success.message = true) : (success.message = false);

            if (success.name && success.email && success.message) this.sendEmail();
        },
        labelHandler() {
            const inputs = this.$el.children[1].elements;

            // Prevent labels from reappearing
            inputs.forEach(i => {
                if (!i.previousSibling) return;
                if (i.previousSibling.localName !== 'label') return;

                if (i.value !== '') {
                    i.previousSibling.style.opacity = '0';
                    i.previousSibling.style.transform = 'scale(0.8)';
                } else {
                    i.previousSibling.style.opacity = '1';
                    i.previousSibling.style.transform = 'scale(1)';
                }
            });
        },
    },
    updated() {
        this.labelHandler();
    },
};
</script>
