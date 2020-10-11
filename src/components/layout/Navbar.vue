<template>
    <header>
        <nav class="nav">
            <div class="navbar__brand">
                <img :src="logo" class="navbar__brand--logo" />
                <router-link to="/" class="navbar__textbrand">Litty</router-link>
            </div>
            <span class="navbar__toggle">
                <ion-icon
                    name="menu"
                    @click="navToggleState = !navToggleState"
                    class="navbar__icon navbar__toggle--icon"
                ></ion-icon>
            </span>
            <ul class="navbar__nav" v-if="!isAuthorized">
                <li class="nav__item">
                    <router-link to="/" class="nav__link">{{$t('navbar.home')}}</router-link>
                </li>
                <li class="nav__item">
                    <router-link to="/about" class="nav__link">{{$t('navbar.about')}}</router-link>
                </li>
            </ul>
            <ul class="navbar__nav navbar__nav--right" v-if="!isAuthorized">
                <li class="nav__item">
                    <a
                        href="https://github.com/LittyProject"
                        target="_blank"
                        class="nav__link nav__link--rounded--primary"
                    >
                        <ion-icon name="logo-github" class="navbar__icon--github"></ion-icon> {{$t('navbar.opensource')}}
                    </a>
                </li>
                <li class="nav__item">
                    <router-link to="/login" class="nav__link nav__link--rounded">{{$t('navbar.login')}}</router-link>
                </li>
                <li class="nav__item">
                    <router-link to="/register" class="nav__link nav__link--rounded">{{$t('navbar.register')}}</router-link>
                </li>
            </ul>
            <SignedInLinks :logout="logout" :user="user" v-if="isAuthorized" />
        </nav>
        <nav class="snav" v-bind:class="{ 'snav--shown': navToggleState }">
            <Particle name="particlejs-nav" />
            <ul class="snav__nav" v-if="!isAuthorized">
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/" class="nav__link">{{$t('navbar.home')}}</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/about" class="nav__link">{{$t('navbar.about')}}</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/login" class="nav__link nav__link--rounded"
                        >{{$t('navbar.login')}}</router-link
                    >
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/register" class="nav__link nav__link--rounded"
                        >{{$t('navbar.register')}}</router-link
                    >
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <a
                        href="https://github.com/LittyProject"
                        target="_blank"
                        class="nav__link nav__link--rounded--primary"
                    >
                        <ion-icon name="logo-github" class="navbar__icon--github"></ion-icon> {{$t('navbar.opensource')}}
                    </a>
                </li>
            </ul>

            <ul class="snav__nav" v-if="isAuthorized">
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/" class="nav__link">{{$t('navbar.home')}}</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link to="/about" class="nav__link">{{$t('navbar.about')}}</router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <router-link
                        v-if="Object.keys(user).length > 0"
                        :to="{ name: 'Chat', params: { id: user.id } }"
                        class="nav__link nav__link--rounded"
                        >
                            <img :src="user.avatarURL" class="icon"/> {{ user.username }}#{{ user.tag }}
                        </router-link>
                </li>
                <li @click="this.closeSideNav" class="snav__item">
                    <button
                        @click.prevent="logout"
                        class="nav__link nav__link--btn nav__link--rounded"
                    >
                        {{$t('navbar.logout')}}
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Particle from '@/src/components/layout/Particle.vue';
import SignedInLinks from '@/src/components/layout/SignedInLinks.vue';

export default {
    name: 'Navbar',
    components: {
        Particle,
        SignedInLinks
    },
    data: function() {
        return {
            navToggleState: false,
            logo: require('../../assets/img/litty-logo.svg')
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized']),
        user() {
            return this.getUserData;
        }
    },
    methods: {
        ...mapActions(['toggleAuthState']),
        closeSideNav() {
            this.navToggleState = false;
        },
        logout() {
            if (localStorage.getItem('token')) {
                localStorage.clear();
                this.$store.dispatch('toggleAuthState', false);
                this.$router.push({ name: 'Login' });
            }
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.$store.dispatch('toggleAuthState', true);
        } else {
            localStorage.clear();
            this.$store.dispatch('toggleAuthState', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/src/assets/scss/components/navbar.scss';
</style>
