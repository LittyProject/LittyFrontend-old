<template>
    <div class="page login">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">{{$t('auth.register')}}</span>
            </div>
            <div class="section__content">
                <form @submit.prevent="handleSubmit" class="form">
                    <span class="form__lead">
                        <ion-icon name="person-add-outline" class="icon"></ion-icon>{{$t('auth.welcome')}}
                    </span>
                    <br>
                    <div class="form__input-group">
                        <ion-icon name="person-outline" class="form__icon"></ion-icon>
                        <input
                            type="text"
                            name="username"
                            class="form__control"
                            required
                            v-model.trim="username"
                        >
                        <label for="username" class="form__label">{{$t('auth.username')}}</label>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="mail-outline" class="form__icon"></ion-icon>
                        <input
                            type="email"
                            name="email"
                            class="form__control"
                            required
                            v-model.trim="email"
                        >
                        <label for="email" class="form__label">{{$t('auth.email')}}</label>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="lock-closed-outline" class="form__icon"></ion-icon>
                        <input
                            type="password"
                            name="password"
                            class="form__control"
                            pattern=".{8,32}"
                            title="Password must be between 8 and 32 characters"
                            required
                            v-model.trim="password"
                        >
                        <label for="password" class="form__label">{{$t('auth.password')}}</label>
                    </div>
                    <vue-hcaptcha @verify="hcaptchaVerify"
                            :sitekey="'fc475a57-1ff7-4e44-bb2d-cf30cb485516'"></vue-hcaptcha>
                    <div class="form__info-group">
                        <span>{{$t('auth.haveAccount')}}</span>
                        <router-link to="/login" class="form__link btn btn--rounded">{{$t('auth.login')}}</router-link>
                    </div>
                    <Error :errorMessage="error"/>
                    <button type="submit" class="form__submit">{{$t('auth.register')}}</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import slugify from 'slugify';
import Error from '../error/Error.vue';
import setAuthToken from '../../utils/authToken';
import { mapActions, mapGetters } from 'vuex';
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

export default {
    name: 'Register',
    components: {
        Error,
        VueHcaptcha
    },
    data: function() {
        return {
            username: '',
            email: '',
            password: '',
            error: '',
            hcaptcha: ''
        };
    },
    computed: {
        ...mapGetters(['getSocket'])
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),
        hcaptchaVerify(e) {
            this.hcaptcha = e;
        },
        handleSubmit() {
            this.errors = [];

            if (this.username && this.email && this.password) {
                axios
                    .post('/api/auth/register', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        hcaptcha: this.hcaptcha,
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.error) {
                            this.error = res.data.error;
                        } else {
                            localStorage.setItem('token', res.data.token);
                            this.$store.dispatch('toggleAuthState', true);
                            this.$store.dispatch('saveUserData', true);

                            setAuthToken(res.data.token);

                            this.$router.push({
                                name: 'Chat',
                                params: { handle: res.data.id }
                            });
                        }
                    });
            }

            setTimeout(() => {
                this.error = "";
            }, 2500);
        }
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/src/assets/scss/components/form.scss';
</style>
