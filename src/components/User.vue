<template>
    <div @click="selectChat()" class="tg__user" v-bind:class="{'current': (user.id == currentUser.id || user.id == $route.params.id)}">
        <div class="tg__user-avatar" v-bind:class="`tg__user-avatar--${user.id}`">
            <img v-if="user.photo" :src="user.photo.src" alt="" class="tg__user-avatar-src">
            <template v-else>
                {{ user.initials }}
            </template>
        </div>
        <div class="tg__user-info">
            <div class="tg__user-head">
                <div class="tg__user-name ellipsis">{{ user.name}}</div>
                <div class="tg__user-date ">
                    <i class="icon" v-if="!user.unread" v-bind:class="(user.id == currentUser.id || user.id == $route.params.id) ? 'icon-approve-white': 'icon-approve'"></i>
                    <i class="icon" v-bind:class="(user.id == currentUser.id || user.id == $route.params.id) ? 'icon-approve-white': 'icon-approve'"></i>
                    {{ user.lastMessageDate}}
                </div>
            </div>
            <div class="tg__user-message ellipsis">{{ user.lastMessage}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User',
    props: ['user'],
    computed: {
        currentUser() {
            return this.$store.state.currentChat;
        }
    },
    methods: {
        selectChat() {
            this.$store.commit('setCurrentUser', this.user);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~scss/_vars.scss";

    .tg {
        &__user-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__user-info {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
        }

        &__user-message {
            font-size: 13px;
            color: #AA9999;
            max-width: 200px;
        }

        &__user-date {
            font-size: 12px;
            color: #AA9999;
        }

        &__user {
            margin-right: -1px;
            transition: background-color .1s ease-in-out;
            display: flex;
            padding: 8px 10px;
            border-bottom: 1px solid $borderColor;

            &.current {
                background: #4C91C7;
                border-color: #4C91C7;

                .tg {
                    &__user-name, &__user-date, &__user-message {
                        color: #fff;
                    }
                }
            }
        }

        &__user-avatar-src {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        &__user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #FFF;
            font-weight: 500;
            margin-right: 10px;
            flex: 1 0 auto;
            max-width: 50px;
        }

        &__user-box {
            display: flex;
        }

        &__user-name {
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            color: #333333;
            margin: 3px 0;
            max-width: 150px;
        }
    }
</style>