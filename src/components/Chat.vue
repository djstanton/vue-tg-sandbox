<template>
    <div class="tg__messages-wrap" ref="chatItemWrap">
        <div class="tg__messages-day" v-for="(day,index) in messages">
            <div class="tg__messages-day-text">{{ Object.keys(day)[0] }}</div>
            <div class="tg__messages-day" v-for="(messages, index) in day" :key="index">
                <div class="tg__message-item" v-for="(message, index) in messages">
                    <router-link :to="`/user/${message.from_user_id}`" class="tg__user-avatar" v-bind:class="['tg__user-avatar--' + message.from_user_id, {'tg__user-avatar--99' : message.from_user_id == currentUserId}]" v-if="!(index > 0 && (messages[index - 1].from_user_id == message.from_user_id))">
                        <img v-if="users[message.from_user_id] && users[message.from_user_id]['photo']" :src="users[message.from_user_id]['photo']['src']" alt="" class="tg__user-avatar-src">
                        <template v-else>
                            {{ users[message.from_user_id]['initials']}}
                        </template>
                    </router-link>
                    <div v-else>
                        <div class="tg__empty-avatar"></div>
                    </div>
                    <div class="tg__message-box">
                        <div class="tg__user-box"  v-if="!(index > 0 && (messages[index - 1].from_user_id == message.from_user_id))">
                            <router-link class="tg__user-name" :to="`/user/${message.from_user_id}`">{{ users[message.from_user_id]['name']}}</router-link>
                            <div class="tg__message-date">
                                <i class="icon icon-approve" v-if="!message.unread"></i><i class="icon icon-approve"></i> {{ message.time }}
                            </div>
                        </div>
                        <div class="tg__message" v-if="(index > 0 && (messages[index - 1].from_user_id == message.from_user_id))">
                            <div class="tg__message-text" v-html="message.message"></div>
                            <div class="tg__message-date">
                                <i class="icon icon-approve" v-if="!message.unread"></i><i class="icon icon-approve"></i> {{ message.time }}
                            </div>
                        </div>
                        <div v-else>
                            <div class="tg__message-text" v-html="message.message"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Chat',
    components: {},
    props: ['messages'],
    computed: {
        users() {
            return this.$store.state.users;
        }
    },
    watch: {
        $route() {
            this.avatarColorId = this.getRandomColor();
            setTimeout(()=>{
                this.scrollToBottom();
            }, 0);

        }
    },
    data () {
        return {
            avatarColorId: 1,
            currentUserId: this.$store.state.currentUserId
        }
    },
    created() {
        this.$eventBus.$on('messageSent', this.scrollToBottom);

        setTimeout(this.scrollToBottom, 0)
    },
    methods: {
        getUserById(id) {
            return 1;
        },
        getRandomColor() {
            return (Math.floor(Math.random() * 99) + 1)
        },
        scrollToBottom() {
            this.$refs.chatItemWrap.scrollTop = this.$refs.chatItemWrap.scrollHeight;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~scss/_vars.scss";

    .tg {
        &__messages-wrap {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            padding: 0 20px;
            overflow-y: auto;
        }

        &__message-item {
            display: flex;
            width: 100%;
            margin-bottom: 10px;
        }

        &__message-text {
            font-size: 13px;
        }

        &__user-avatar-src {
            width: 36px;
            height: 36px;
            border-radius: 50%;
        }

        &__user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #FFF;
            font-weight: 500;
            margin-right: 10px;
        }

        &__user-box {
            display: flex;
        }

        &__user-name {
            font-size: 13px;
            font-weight: 500;
            text-decoration: none;
            color: $blue;
            margin: 3px 0;
        }

        &__message-date, &__messages-day-text {
            color: #999999;
            font-size: 12px;
        }

        &__message-date {
            flex: 1 1 auto;
            min-width: 50px;
            text-align: right;
        }

        &__message-box, &__user-box {
            flex: 1 1 auto;
        }

        &__user-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__messages-day-text {
            width: 100%;
            text-align: center;
            margin: 13px auto;
        }

        &__empty-avatar {
            flex: 0 0 auto;
            width: 36px;
            margin-right: 10px;
        }

        &__message {
            display: flex;
            justify-content: space-between;
        }
    }

    .icon-approve {
        &+.icon-approve {
            margin-left: -7px;
        }
    }
</style>