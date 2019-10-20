<template>
    <div class="row">
        <div class="col-12">
            <router-link class="btn btn-default" to="/">&longleftarrow; Back</router-link>
        </div>
        <div class="col-10 offset-2">
            <h1>{{ $store.getters.member.name }}</h1>
            <pre>{{ JSON.stringify($store.getters.member,null,2) }}</pre>
            <button @click="scanMode=!scanMode" v-if="!scanMode" class="btn btn-default">Scan new card</button>
        </div>
        <div class="col-10 offset-2">
            <div class="scan" v-if="scanMode">
                <h1>New Card</h1>
                <div>
                    <pre v-if="$store.state.cardReady">{{ JSON.stringify($store.state.card,null,2) }}</pre>
                    <div class="py-5" v-else>
                        Please place a card on the scanner
                    </div>
                </div>
                <button class="btn" @click="scanMode=false">Cancel</button>
                <button class="btn btn-primary" v-if="$store.state.cardReady" @click="save">Save UID</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            let id = this.$route.params.id;
            this.$store.commit('selectMember', id)
        },
        data() {
            return {
                scanMode: false
            }
        },
        methods: {
            save() {
                this.$store.commit('saveUid', {
                    uid: this.$store.state.card.uid,
                    member: this.$store.getters.member
                });
            }
        }
    }
</script>
