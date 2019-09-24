<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <router-link to="/" class="navbar-brand">NFC App</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/" class="nav-item nav-link active">Home</router-link>
                        <router-link to="/scan" class="nav-item nav-link active">Scan Screen</router-link>
                    </div>
                </div>
            </div>
        </nav>
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
