<template>
    <div class="page">
        <Error :errorMessage="error"/>
        <div class="list">
            <a><ion-icon name="add-circle-outline"></ion-icon></a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/src/components/layout/Modal';
import { mapActions, mapGetters } from 'vuex';
import Error from '@/src/components/error/Error.vue';

export default {
    name: 'Dash',
    props: ['message'],
    components: {
        Modal: Modal,
        Error
    },
    data: function() {
        return {
            servers: null,
            servername: null,
            error: this.message,
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getServerData', 'getChannelData', 'getSocket']),
    },
    methods: {
        ...mapActions([])
    },
    created() {
        return;
    },
    mounted() {
        if (this.errorMessage) {
            setTimeout(() => {
                this.errorMessage = '';
            }, 2500);
        }
    }
};
</script>

<style lang="scss">
@import '@/src/assets/scss/views/dashboard.scss';
@import '@/src/assets/scss/components/form.scss';
</style>