<template>
    <div>
        <div class="container mt-4">
            <router-view></router-view>
            <div class="server-crash" v-if="$store.state.serverCrashes.length>0">
                <button @click="handleRestart" class="restart">Restart scanner</button>
                <div>Scanner Crash:</div>
                <pre v-html="JSON.stringify($store.state.serverCrashes,null,2)"/>
            </div>
        </div>
    </div>
</template>
<style>
    .server-crash {
        background: black;
        color: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50vh;
        overflow: scroll;
    }

    .server-crash .restart {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 10px 30px;
    }

    .server-crash pre {
        color: red;
    }
</style>
<script>
    import axios from 'axios';
    import store from './store';

    export default {
        store,
        mounted() {
            this.$store.dispatch('getMembers');
            this.$store.dispatch('subscribeEvents');
        },
        methods: {
            loopTilReload() {
                setInterval(async () => {
                    const response = (await axios.get('/'));
                    if (response.statusText === 'OK') {
                        if (confirm('Scanner back up, reload?')) {
                            window.location.reload();
                        }
                    }
                }, 1000)
            },
            handleRestart() {
                axios.get('/restart')
                    .then(() => {
                        if (confirm('Restart scanner?')) {
                            this.loopTilReload();
                        }
                    });
            }
        }
    }
</script>
