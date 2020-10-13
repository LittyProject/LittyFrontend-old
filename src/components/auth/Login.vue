<template>
    <div class="page login">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">{{$t('auth.login')}}</span>
            </div>
            <div class="section__content">
                <p class="section__lead">{{$t('auth.welcomeBack')}}</p>
                <form @submit.prevent="handleSubmit" class="form">
                    <span class="form__lead">
                        <ion-icon name="person-outline" class="icon"></ion-icon>{{$t('auth.seeAgain')}}
                    </span>
                    <br />
                    <div class="form__input-group">
                        <ion-icon name="mail-outline" class="form__icon"></ion-icon>
                        <input
                            type="email"
                            name="email"
                            class="form__control"
                            required
                            v-model.trim="email"
                        />
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
                        />
                        <label for="password" class="form__label">{{$t('auth.password')}}</label>
                    </div>
                    <div class="form__info-group">
                        <span>{{$t('auth.noAccount')}}</span>
                        <router-link to="/register" class="form__link btn btn--rounded">{{$t('auth.register')}}</router-link>
                    </div>
                    <Error :errorMessage="error" />
                    <button type="submit" class="form__submit">{{$t('auth.login')}}</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Error from '../error/Error.vue';
import { mapActions } from 'vuex';
import setAuthToken from '../../utils/authToken';

export default {
    name: 'Login',
    props: ['message'],
    components: {
        Error
    },
    data: function() {
        return {
            email: '',
            password: '',
            error: this.message
        };
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),

        handleSubmit() {
            this.error = '';
            if (this.email && this.password) {
                axios
                    .post('https://littyapi.ezhost.pl/auth/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.error) {
                            this.error = res.data.error;
                        } else {
                            localStorage.setItem('token', res.data.token);
                            this.$store.dispatch('toggleAuthState', true);
                            this.$store.dispatch('saveUserData', res.data);

                            setAuthToken(res.data.token);

                            this.$router.push({
                                name: 'Chat'
                            });
                        }
                    }).catch(err => this.error = err);
            }

            setTimeout(() => {
                this.error = '';
            }, 2500);
        }
    },
    mounted() {
        if (this.error) {
            setTimeout(() => {
                this.error = '';
            }, 2500);
        }
    }
};
</script>


<style lang="scss">
@import '@/src/assets/scss/components/form.scss';
</style>
