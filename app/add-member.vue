<template>
    <div class="row">
        <div class="col-12">
            <router-link class="btn btn-default" to="/">&longleftarrow; Back</router-link>
        </div>
        <div class="col-4 offset-2">
            <h1>{{ member.name || 'New Member' }}</h1>
            <input type="text" class="form-control mb-3" v-model="member.name" placeholder="Full Name">
            <input type="text" class="form-control mb-3" v-model="member.email" placeholder="Email">
            <input type="text" class="form-control mb-3" v-model="member.category" placeholder="Category">
            <input type="text" class="form-control mb-3" v-model="member.uid" placeholder="UID">
            <button class="btn btn-primary" v-if="!scanMode" @click="save">Save Member</button>
            <button :disabled="isLoading" @click="scanMode=!scanMode" v-if="!scanMode" class="btn btn-default">Scan
                RFID
            </button>
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
                <button :disabled="isLoading" class="btn btn-primary" v-if="$store.state.cardReady" @click="save">Save
                    UID
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import Axios from "axios";

    export default {
        mounted() {
            let id = this.$route.params.id;
            this.$store.commit('selectMember', id)
        },
        watch: {
            '$store.state.card'(card) {
                if (card.uid) {
                    this.member.uid = card.uid;
                }
            }
        },
        data() {
            return {
                scanMode: false,
                member: {},
                isLoading: false,
            }
        },
        methods: {
            save() {
                this.isLoading = true;
                Axios.post('/member/create', this.member)
                    .then(() => {
                        this.$store.dispatch('getMembers');
                        this.member = {};
                        this.scanMode = false;
                        this.isLoading = false;
                    })
            }
        }
    }
</script>
