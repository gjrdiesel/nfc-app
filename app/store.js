import Vuex from "vuex";

const store = new Vuex.Store({
    state: {
        members: [],
        selected: null,
        card: null,
        cardReady: false,
        signIn: [],
    },
    getters: {
        member: state => {
            let id = state.members.findIndex(m => m['Member Id'] == state.selected);
            return state.members[id] || {};
        }
    },
    mutations: {
        storeMembers(state, payload) {

            state.members = payload;
        },
        selectMember(state, payload) {

            if (state.members.length < 1) {
                this.dispatch('getMembers');
            }

            state.selected = payload;
        },
        saveUid(state, payload) {
            let id = state.members.findIndex(m => m["Sandbox_Info : UID"] == payload.uid);
            if (id >= 0) {
                const name = state.members[id]['Display Name'];
                if (confirm(`UID already exists for ${name}, do you want to overwrite?`)) {
                    state.members[id]["Sandbox_Info : UID"] = '';
                }
                else {
                    return;
                }
            }

            id = state.members.indexOf(payload.member);
            state.members[id]["Sandbox_Info : UID"] = payload.uid;
            state.cardReady = false;
            state.card = null;
        },
        cardOn(state, payload) {
            state.card = payload;
            state.cardReady = true;

            let id = state.members.findIndex(m => m["Sandbox_Info : UID"] == state.card.uid);
            if (id >= 0) {
                state.signIn.unshift(state.members[id]);
            }
        },
        cardOff(state) {
            state.card = null;
            state.cardReady = false;
        }
    },
    actions: {
        async getMembers({commit}) {
            fetch('/members')
                .then(r => r.json())
                .then(m => commit('storeMembers', m));
        },
        subscribeEvents({commit}) {
            socket.on('card.on', card => commit('cardOn', card));
            socket.on('card.off', card => commit('cardOff', card));
        }
    }
});

export default store;
