import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import 'normalize.css';
import './../dist/css/sprite.css';

Vue.prototype.$eventBus = new Vue();

new Vue({
    el: '#tg',
    router,
    store,
    template: '<App/>',
    components: { App }
});
