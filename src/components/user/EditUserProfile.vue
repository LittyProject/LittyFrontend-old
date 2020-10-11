<template>
    <div class="page profile">
        <div class="section section--profile profile__content">
            <div class="section__heading mt-10">
                <span class="section__title">{{$t('updateUser.updateAccount')}}</span>
            </div>
            <div class="section__content">
                <form @submit.prevent="handleSubmit" class="form">
                    <p class="lead">{{$t('updateUser.editProfileDetails')}}</p>
                    <div class="profile__item">
                        <img :src="user.avatarURL" alt class="profile__image" />
                    </div>
                    <br />
                    <div class="form__input-group">
                        <ion-icon name="person-outline" class="form__icon"></ion-icon>
                        <input
                            type="text"
                            name="handle"
                            class="form__control"
                            v-model.trim="handle"
                        />
                        <label for="username" class="form__label">{{$t('auth.username')}}</label>
                    </div>
                    <div class="form__input-group">
                        <ion-icon name="person" class="form__icon"></ion-icon>
                        <input
                            type="email"
                            name="email"
                            class="form__control"
                            v-model.trim="email"
                        />
                        <label for="email" class="form__label">{{$t('auth.email')}}</label>
                    </div>
                    <Error :errors="errors" />
                    <div class="form__actions mt-3">
                        <a @click="handleBackBtn" class="btn btn--info">{{$t('back')}}</a>
                        <button type="submit" class="btn btn--clear btn--danger">{{$t('update')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import slugify from 'slugify';
import Error from '../error/Error.vue';

export default {
    name: 'EditUserProfile',
    components: {
        Error
    },
    data: function() {
        return {
            user: {},
            email: '',
            errors: []
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    methods: {
        ...mapActions(['saveUserData']),

        handleBackBtn() {
            this.$router.go(-1);
        },
        checkFields() {
            if (this.handle === this.getUserData.handle) {
                return true;
            }
        },
        handleSubmit() {
            const updatedUserDetails = {
                username: this.username === this.getUserData.username ? null : this.username,
                email: this.email === this.getUserData.email ? null : this.email
            };

            if (localStorage.getItem('token')) {
                axios
                    .put(`/api/users/@me`, updatedUserDetails)
                    .then(async res => {
                        if (res.data.error) {
                            this.error = res.data.error;
                        } else {
                            await this.$store.dispatch('saveUserData', res.data);
                            this.user = res.data.user;
                            this.$router.push({
                                path: '/user',
                                params: {
                                    handle: updatedUserDetails.id === null ? this.getUserData.id : updatedUserDetails.id
                                }
                            });
                        }
                    })
                    .catch(err => console.log(err));

                setTimeout(() => {
                    this.errors = [];
                }, 2500);
            }
        }
    },
    created() {
        if (localStorage.getItem('token') && _.isEmpty(this.getUserData)) {
            axios
                .get(`/api/users/@me`)
                .then(res => {
                    this.$store.dispatch('saveUserData', res.data);
                    this.$store.dispatch('toggleAuthState', true);
                    this.user = res.data;
                })
                .catch(err => err);
        } else {
            this.user = this.getUserData;
        }
        /** Assign model values */
        for (let key of Object.keys(this.$data)) {
            if (this.getUserData[key]) {
                this.$data[key] = this.getUserData[key];
            }
        }
    },
    mounted() {}
};
</script>


<style lang="scss">
@import '@/src/assets/scss/views/profile.scss';
@import '@/src/assets/scss/components/form.scss';
</style>
