<template>
    <div class="tg__wrap">
        <Navbar/>
        <div class="tg__content">
            <List />
            <div class="tg__chat-wrap">
                <router-view class="tg__chat"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Index from './components/Index';
    import List from './components/List';
    import Navbar from './components/Navbar';

    export default {
    name: 'app',
    components: {
        Index,
        List,
        Navbar
    },
    data () {
        return {
          appData: {}
        }
    }
}
</script>

<style lang="scss">
    @import "scss/_vars.scss";
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&subset=cyrillic');

    html, body {
        height: 100%;
    }

    * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    .tg {
        &__wrap {
            flex-direction: column;
        }

        &__wrap, &__content {
            display: flex;
        }

        &__chat-wrap {
            flex: 1 1 100%;
        }

        &__chat {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            height: calc(100vh - #{$navbarHeight});
            overflow-x: hidden;
            overflow-y: auto;
            width: calc(100vw - #{$listWidth});
        }

        &__user-avatar {
            @for $i from 1 through 100 {
                &--#{$i} {
                    background-color: hsl(random(360),$s-min+random($s-max+-$s-min),$l-min+random($l-max+-$l-min));
                }
            }
        }
    }

    .icon-approve, .icon-approve-white {
        background-color: #fff;
        position: relative;
        border-radius: 0 0 20px;
        z-index: 1;
        transition: background-color .1s ease-in-out;

        &+.icon-approve, &+.icon-approve-white {
            margin-left: -11px;
            z-index: 0;
        }
    }

    .icon-approve-white {
        background-color: #4C91C7;
    }
</style>