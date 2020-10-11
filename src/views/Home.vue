<template>
    <div class="page home">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title"></span>
            </div>
            <div class="section__content">
                <p class="section__lead">{{$t('about.info')}}</p>
                <router-link to="/about" class="btn btn--anim btn--white">{{$t('about.moreInfo')}}</router-link>
                <router-link to="/register" class="btn btn--anim btn--info">{{$t('navbar.register')}}</router-link>
                <div class="section__graphic">
                    <img src="@/src/assets/img/undraw_group_chat_v059.svg" alt />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /client
import Typed from 'typed.js';

export default {
    name: 'Home',
    props: [],
    components: {},
    mounted() {
        let options = {
            strings: [
                'Chat with Friends',
                'Discuss about everything',
                'Make new friendships',
                'Connect together',
                'Don\'t worry, be happy!',
                'Litty is Open-Source!'
            ],
            typeSpeed: 150,
            loop: true
        };

        new Typed('.section__title', options);
    }
};
</script>
