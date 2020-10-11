<template>
    <ul class="navbar__nav navbar__nav--right">
        <li class="nav__item">
            <router-link to="/servers" class="nav__link nav__link--rounded">Servers</router-link>
        </li>
        <li class="nav__item">
            <router-link
                v-if="Object.keys(this.user).length > 0"
                :to="{name: 'Chat', params: { id: this.user.id  }}"
                class="nav__link nav__link--rounded"
            ><img :src="this.user.avatarURL" class="icon"/> {{ this.user.username }}#{{ this.user.tag }}</router-link>
        </li>
        <li class="nav__item">
            <button
                @click.prevent="logout"
                class="nav__link nav__link--btn nav__link--rounded"
            >{{$t('navbar.logout')}}</button>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SignedInLinks',
    props: ['logout', 'user'],
    data: function() {
        return {};
    },
    computed: {
        ...mapGetters(['getUserData', 'isAuthorized'])
    },
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/src/assets/scss/components/navbar.scss';
</style>
