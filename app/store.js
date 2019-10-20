import Vuex from "vuex";
import Axios from "axios";

const store = new Vuex.Store({
    state: {
        members: [],
        selected: null,
        card: null,
        cardReady: false,
        noMatch: false,
        signIn: [],
    },
    getters: {
        member: state => {
            let id = state.members.findIndex(m => m.id == state.selected);
            return state.members[id] || {};
        }
    },
    mutations: {
        storeSignIns(state, payload) {

            state.signIn = payload;
        },
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
            payload.member.uid = payload.uid;
            this.dispatch('updateMember', payload.member);

            state.cardReady = false;
            state.card = null;
        },
        signIn(state, member) {
            if (member) {
                state.noMatch = false;
                state.signIn.unshift(member);
            }
            else {
                state.noMatch = true;
            }
        },
        noMatch(state) {
            state.noMatch = true;
        },
        cardOn(state, payload) {
            state.noMatch = false;
            state.card = payload;
            state.cardReady = true;
        },
        cardOff(state) {
            state.card = null;
            state.cardReady = false;
        }
    },
    actions: {
        async getMembers({commit}) {
            const members = (await Axios.get('/members')).data;
            commit('storeMembers', members);

            const signIns = (await Axios.get('/entries')).data;
            commit('storeSignIns', signIns);
        },
        async updateMember({commit}, payload) {
            const data = (await Axios.post('/member', payload)).data;
            commit('storeMembers', data);
        },
        subscribeEvents({commit}) {
            socket.on('card.on', card => commit('cardOn', card));
            socket.on('card.off', card => commit('cardOff', card));
            socket.on('member.sign_in', member => commit('signIn', member));
        }
    }
});

export default store;
