import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index';
import Contact from '../components/Contact';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Index,
        },
        {
            path: '/im',
            name: 'Index',
            component: Index,
        },
        {
            path: '/:id',
            name: 'Contact',
            component: Contact
        }
    ],
    mode: 'history'
})