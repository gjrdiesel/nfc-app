<template>
    <div>
        <div class="container mt-4">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import store from './store';

    export default {
        store,
        mounted() {
            this.$store.dispatch('getMembers');
            this.$store.dispatch('subscribeEvents');
        }
    }
</script>
