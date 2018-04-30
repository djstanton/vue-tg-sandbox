<template>
    <div v-if="currentUser" class="tg__current-user">
       <div class="tg__current-user-name">{{ currentUser.name }}</div>
       <div class="tg__current-user-status">Был(а) {{ Math.floor(Math.random() * 5) + 5}} минут назад</div>
    </div>
</template>

<script>
export default {
    name: 'Currentuser',
    components: {},
    data () {
        return {
          appData: {}
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.users[this.$route.params.id];
        }
    },
}
</script>

<style lang="scss">
    .tg {
        &__current-user {
            padding: 0 17px;
        }

        &__current-user-name {
            color: #333333;
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 5px;
        }

        &__current-user-status {
            color: #999999;
            font-size: 13px;
        }
    }
</style>