<template>
    <div class="tg__navbar">
        <Search />
        <Currentuser />
    </div>
</template>

<script>
    import Search from './Search';
    import Currentuser from './Currentuser';

    export default {
        name: 'Navbar',
        components: {
            Search,
            Currentuser
        }
    }
</script>

<style lang="scss" scoped>
    @import "~scss/_vars.scss";

    .tg {
        &__navbar {
            display: flex;
            height: $navbarHeight;
            align-items: center;
            border-bottom: 1px solid $borderColor;
        }
    }
</style>