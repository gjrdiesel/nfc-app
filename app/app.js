import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex);
Vue.use(VueRouter);

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const routes = [
    {path: '/', component: files('./home.vue').default},
    {path: '/member/:id', component: files('./member.vue').default},
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
    router,
}).$mount('#app');
