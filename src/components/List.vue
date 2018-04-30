<template>
    <div>
        <div class="tg__users-list"  v-if="Object.keys(users).length > 0">
            <router-link class="tg__user-wrap" :to="`/${user.id}`" v-for="user in users" :key="user.id">
                <User :user="user" v-if="!user.hidden"/>
            </router-link>
        </div>
        <div class="tg__users-list tg__users-list--empty" v-else>
            Никого не нашли :{
        </div>
    </div>
</template>

<script>
import {HTTP} from '../libs/http.js';
import User from './User.vue';

export default {
    name: 'List',
    components: {
        User
    },
    computed: {
        currentUser() {
            return this.$store.state.currentChat;
        },
        users() {
            return this.$store.state.filteredUsers;
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            HTTP.get('/src/users.json').then((response)=>{
                let users = response.data.users;

                for(let user in users) {
                    users[user]['initials'] = this.makeInitials(users[user].name);
                }

                this.$store.commit('setUsers', users);

                if(this.$route.params.id) {
                    this.$store.commit('setCurrentUser', users[this.$route.params.id]);
                }
            }).catch(()=>{
                this.error = 'api error';
            })
        },
        makeInitials(userName) {
            if(!userName) {
                return;
            }

            let initials = userName.split(' ');

            return `${initials[0][0]}${initials[1] ? initials[1][0] : ''}`;
        }
    }
}
</script>
<style lang="scss">
    @import "~scss/_vars.scss";

    .tg {
        &__users-list {
            width: $listWidth;
            display: flex;
            flex-direction: column;
            border-right: 1px solid $borderColor;
            flex: 1 0 auto;
            height: calc(100vh - #{$navbarHeight});
            overflow-x: hidden;
            overflow-y: auto;

            &--empty {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        &__user-wrap {
            text-decoration: none;
        }
    }
</style>