<template>
    <div class="row">
        <div class="ip-block">
            {{ ips.length > 0 ? ips.join(' / ') : 'No internet' }}
        </div>
        <div class="col-6">
            <div class="row">
                <div class="col-10">
                    <div class="d-flex align-items-center justify-content-between">
                        <h1>Members</h1>
                        <div>
                            <router-link class="ml-auto" to="/csv/import">Import CSV</router-link>
                            <span>/</span>
                            <router-link class="ml-auto" to="/add/member">Add member</router-link>
                        </div>
                    </div>
                    <input type="text" placeholder="Search..." class="form-control mb-3"
                           v-model="search">
                </div>
            </div>
            <ul>
                <li class="member-list" v-for="member in members">
                    <router-link :to="`/member/${member.id}`">{{ member.name }}</router-link>
                </li>
            </ul>
        </div>
        <div class="col-6">
            <h1>Sign in</h1>
            <h3 v-if="$store.state.noMatch">Unregistered RFID</h3>
            <div v-else-if="$store.state.signIn[0]">
                <h3>Hello {{ $store.state.signIn[0].name }}</h3>
                <pre>{{ JSON.stringify($store.state.signIn[0],null,2) }}</pre>
            </div>
            <h2>Last 5 sign ins</h2>
            <ul>
                <li v-for="user in $store.state.signIn.slice(0,5)">
                    {{ user.name }} ({{ user.email }})
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    .ip-block {
        background: black;
        color: gainsboro;
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
    }
</style>
<script>
    import axios from "axios"

    export default {
        mounted() {
            axios.get('/ip')
                .then(response => {
                    this.ips = response.data;
                });
        },
        data() {
            return {
                search: '',
                ips: []
            }
        },
        computed: {
            members() {
                if (this.search) {
                    return this.$store.state.members.filter(m => {
                        return [
                            m.name,
                            m.id,
                            m.category,
                            m.user
                        ].map(f => new RegExp(this.search, 'ig').test(f)).includes(true)
                    });
                }
                return this.$store.state.members;
            }
        }
    }
</script>
