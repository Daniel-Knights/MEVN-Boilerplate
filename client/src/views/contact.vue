<template>
    <div>
        <h3>Contact</h3>
        <form @submit.prevent="formHandler()">
            <div class="form-group">
                <label for="name">NAME</label>
                <input
                    type="text"
                    name="name"
                    v-model="contact.name"
                    :class="{
                        'alert-success': contactSuccess.name,
                        'alert-danger': contactSuccess.name === false
                    }"
                />
            </div>
            <div class="form-group">
                <label for="email">EMAIL</label>
                <input
                    type="text"
                    name="email"
                    v-model="contact.email"
                    :class="{
                        'alert-success': contactSuccess.email,
                        'alert-danger': contactSuccess.email === false
                    }"
                />
            </div>
            <div class="form-group">
                <label for="phone">PHONE NUMBER (OPTIONAL)</label>
                <input
                    type="text"
                    name="phone"
                    v-model="contact.phone"
                    :class="{
                        'alert-success': contactSuccess.phone,
                        'alert-danger': contactSuccess.phone === false
                    }"
                />
            </div>
            <div class="form-group">
                <label for="enquiry">MESSAGE</label>
                <textarea
                    name="enquiry"
                    cols="30"
                    rows="10"
                    v-model="contact.message"
                    :class="{
                        'alert-success': contactSuccess.message,
                        'alert-danger': contactSuccess.message === false
                    }"
                ></textarea>
            </div>
            <input
                type="submit"
                :value="successMessage"
                :class="{
                    'alert-submit-success': success,
                    'alert-submit-danger': success === false
                }"
            />
            <div v-if="loading" class="loading-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </form>
    </div>
</template>

<script>
import Axios from "axios";

export default {
    name: "contact",

    data() {
        return {
            contact: {
                name: "",
                email: "",
                phone: "",
                message: ""
            },
            contactSuccess: {
                name: null,
                email: null,
                phone: null,
                message: null
            },
            successMessage: "Send",
            success: null,
            loading: false
        };
    },

    methods: {
        async sendEmail() {
            // Prevent button spam
            if (this.loading) return;

            this.loading = true;
            this.successMessage = " ";

            await Axios.post("/direct", this.contact)
                .then(res => {
                    this.loading = false;
                    this.success = res.data.success;
                    this.successMessage = res.data.msg;

                    this.contact.name = "";
                    this.contact.email = "";
                    this.contact.phone = "";
                    this.contact.message = "";

                    setTimeout(() => {
                        this.successMessage = "Send";
                        this.success = null;
                    }, 5000);
                })
                .catch(err => {
                    this.success = err.response.data.success;
                    this.successMessage = err.response.data.msg;
                });
        },
        formHandler() {
            const name = this.contact.name;
            const email = this.contact.email;
            const phone = this.contact.phone;
            const message = this.contact.message;

            const success = this.contactSuccess;

            const phoneTest = /^\d+$/;

            // Advanced validation
            name !== "" ? (success.name = true) : (success.name = false);

            if (email !== "") {
                email.includes("@") && email.includes(".")
                    ? (success.email = true)
                    : (success.email = false);
            } else success.email = false;

            if (phoneTest.test(phone) && phone !== "") {
                success.phone = true;
            } else if (!phoneTest.test(phone) && phone !== "") {
                success.phone = false;
            }

            message !== ""
                ? (success.message = true)
                : (success.message = false);

            if (
                success.name &&
                success.email &&
                success.phone &&
                success.message
            )
                this.sendEmail();
        }
    }
};
</script>
