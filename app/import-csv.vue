<template>
    <div class="row">
        <div class="col-12">
            <router-link class="btn btn-default" to="/">&longleftarrow; Back</router-link>
        </div>
        <div class="col-6 m-auto">
            <h1>Import a CSV</h1>
            <div class="alert alert-danger" role="alert">
                This is not finished
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="erase">
                <label class="form-check-label" for="erase">
                    Erase all data when importing?
                </label>
            </div>
            <div class="my-3">
                <input type="file" id="file">
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
