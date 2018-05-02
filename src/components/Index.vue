<template>
    <div class="tg__empty-chat">
        <i class="icon icon-empty_icon"></i>
        <div>
            Выберите, кому вы хотели бы написать
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
}
</script>
<style lang="scss" scoped>
    .tg__empty-chat {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #AA9999;
        flex-direction: column;
    }
    .icon {
        margin-bottom: 20px;
    }
</style>