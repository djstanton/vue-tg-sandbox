<template>
    <div class="tg__search-wrap">
        <label class="tg__search-helper">
            <i class="icon icon-search"></i>
            <input type="text" class="tg__search-field" v-bind:class="{'tg__search-field--dirty': search.length > 0}" v-model="search" placeholder="Поиск">
        </label>

        {{ filteredList }}
    </div>
</template>

<script>
export default {
    name: 'Search',
    components: {},
    data () {
        return {
            search: '',
        }
    },
    computed: {
        users() {
            return this.$store.state.users;
        },
        filteredList() {
            let filteredUsers = [];
            let filteredUsersToList = {};

            for(let user in this.users) {
                if(this.search.length && this.users[user].name.toLowerCase().includes(this.search.toLowerCase())) {
                    let obj = {};
                    obj[user] = this.users[user];
                    filteredUsers.push(obj);
                }
            }

            if(this.search.length) {
                for(let idx in filteredUsers) {
                    let key = Object.keys(filteredUsers[idx])[0];
                    filteredUsersToList[key] = filteredUsers[idx][key];
                }
            } else {
                filteredUsersToList = this.users;
            }

            this.$store.commit('filterUsers', filteredUsersToList);
        }
    },
}
</script>

<style lang="scss">
    @import "~scss/_vars.scss";

    .tg {
        &__search-wrap {
            width: $listWidth;
            padding: 0 11px;
        }

        &__search-helper {
            width: 276px;
            border-radius: 8px;
            text-align: center;
            display: flex;
            height: 29px;
            background: #F4F4F4;
            align-items: center;
            justify-content: center;

            .icon {
                margin-right: 2px;
            }
        }

        &__search-field {
            background: none;
            border: none;
            outline: none;
            font-size: 12px;
            line-height: 19px;
            padding-top: 4px;
            width: 40px;
            transition: width .2s ease-in-out;

            &:focus, &--dirty {
                width: 245px;
            }
        }
    }
</style>