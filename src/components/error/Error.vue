<template>
    <transition
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
    >
        <div v-show="this.errorMessage" class="mb-6 form__error">
            <transition
                name="fade"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                mode="out-in"
            >
                <span>{{ this.errorMessage }}</span>
            </transition>
        </div>
    </transition>
</template>


<script>
export default {
    name: 'Error',
    props: ['errorMessage']
};
</script>


<style lang="scss" scoped>
</style>
