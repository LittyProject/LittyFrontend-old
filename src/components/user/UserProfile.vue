<template>
    <div class="page profile">
        <section class="section section--profile mt-6 profile__content">
            <div class="section__heading mt-6 mb-3">
                <span class="section__title">Dashboard</span>
            </div>
            <div class="section__content">
                <div class="infobox__container" v-if="user">
                    <span class="lead">Your profile</span>
                    <div class="infobox__item">
                        <img :src="avatarURL" alt class="profile__image">
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">ID</span>
                        <span class="infobox__item--right">{{ user.id }}</span>
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Email</span>
                        <span class="infobox__item--right">{{ user.email }}</span>
                    </div>
                    <div class="infobox__item">
                        <span class="infobox__item--left">Username#tag</span>
                        <span class="infobox__item--right">{{ user.username }}#{{ user.tag }}</span>
                    </div>
                    <div class="infobox__actions mt-3" v-if="user">
                        <router-link
                            :to="{name: 'EditUser', params: { id: user.id }}"
                            class="btn btn--info"
                        >Edit</router-link>
                        <a
                            href="#"
                            @click.prevent="handleDeleteModal"
                            class="btn btn--danger"
                        >Delete Account</a>
                    </div>
                </div>
                <Modal name="deleteUser" ref="deleteUser">
                    <template slot="header">
                        <h2 class="text-upper">Delete Account</h2>
                    </template>
                    <template slot="body">
                        <p class="lead">Warning: This action cannot be undone</p>
                        <p
                            class="lead mt-6"
                        >Are you sure you want to permanently delete your account?</p>
                        <div class="actions mt-6">
                            <a
                                href="#"
                                @click.prevent="handleDelete"
                                class="btn btn--danger"
                            >Yes, Delete Account</a>
                        </div>
                    </template>
                </Modal>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import Modal from '@/src/components/layout/Modal.vue';

export default {
    name: 'Chat',
    components: {
        Modal
    },
    data: function() {
        return {
            user: null
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState', 'deleteUserAccount']),
        handleDeleteModal() {
            this.$refs.deleteUser.open();
        },
        handleDelete() {
            this.$refs.deleteUser.close();
            this.$store.dispatch('deleteUserAccount');
        }
    },
    created() {
        if (!this.$route.params.id) return this.$router.push({name: 'Home'});
        if (this.$route.params.id !== this.getUserData.id) return this.$router.push({name: 'Profile', params: this.$route.params});
        if (localStorage.getItem('token') && !!this.getUserData.email) {
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
    }
};
</script>


<style lang="scss">
@import '@/src/assets/scss/views/profile.scss';
@import '@/src/assets/scss/components/infobox.scss';
</style>
