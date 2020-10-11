<template functional>
    <div class="page home">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">About Litty</span>
            </div>
            <div class="section__content">
                <p class="section__lead">Litty is a place where you can boldly discuss with your friends about the issues bothering you, or play a nice game together. Remember that you can find your future friends here.</p>
                <div class="section__graphic">
                    <img src="@/src/assets/img/undraw_programmer_imem.svg" alt />
                </div>
                <span class="heading-lg center">Feautures</span>
                <div class="features">
                    <div class="features__item">
                        <span>
                            <a href="#" class="btn btn--info">Text chat</a> where you can talk with your friends
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            And more info soon...
                        </span>
                    </div>
                </div>
                <div class="center">
                    <a href="https://icons8.com/" class="btn btn--info">Icons by Icons8</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /client
export default {
    name: 'About',
    props: [],
    components: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/src/assets/scss/components/feature.scss';
</style>
