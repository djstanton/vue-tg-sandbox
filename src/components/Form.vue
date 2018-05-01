<template>
    <form class="tg__form" v-bind:class="{'tg__form--dirty': isDirty}">
        <div class="tg__form-btns">
            <i class="icon icon-attach" @click="newMessageText = 'Это похоже на аттач?'"></i>
        </div>
        <div class="tg__form-area-wrap">
            <textarea autofocus v-on:keyup.enter="submitForm" type="text" class="tg__form-input" ref="textarea" @input="textareaResize" placeholder="Напишите сообщение" v-model="newMessageText"></textarea>
            <div class="tg__textarea-heighthelper" ref="textareahelper" v-html="newMessageText"></div>
        </div>

        <div class="tg__form-btns">
            <div class="tg__form-send" @click="submitForm()"></div>
            <i class="icon icon-speach" @click="newMessageText = 'Если постараться, будет голосовое'"></i>
        </div>

    </form>
</template>

<script>
    export default {
        name: 'Form',
        components: {},
        data () {
            return {
                newMessageText: ''
            }
        },
        computed: {
            isDirty() {
                return this.newMessageText.length > 0;
            }
        },
        watch: {
            $route() {
                this.$refs.textarea.focus();

            }
        },
        created() {
        },
        methods: {
            submitForm(event) {
                if(event) {
                    if(!event.shiftKey){
                        this.newMessageText = this.prepareMessage();
                        this.newMessageText = '';
                    }
                } else {
                    this.newMessageText = this.prepareMessage();
                    this.newMessageText = '';
                }

            },
            prepareMessage() {
                let newMessageToSend = {
                    "message": '',
                    "from_user_id": this.$store.state.currentUserId,
                    "time": "11:11",
                    "unread": true
                };
                let now = new Date();

                function replaceURLWithHTMLLinks(text) {
                    let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
                    return text.replace(exp,"<a href='$1'>$1</a>");
                };

                newMessageToSend.message = replaceURLWithHTMLLinks(this.newMessageText);
                newMessageToSend.time = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()}`;
                this.$store.commit('pushMessage', newMessageToSend);

                setTimeout(()=>{
                    this.$eventBus.$emit('messageSent');
                }, 0);
            },
            textareaResize() {
                this.$refs.textareahelper.style.width = this.$refs.textarea.offsetWidth + 'px';
                this.$refs.textarea.style.minHeight = this.$refs.textareahelper.scrollHeight + 'px';
            }
        }
    }
</script>
<style lang="scss">
    @import "~scss/_vars.scss";

    .tg {
        &__form {
            background: #fff;
            min-height: 50px;
            border-top: 1px solid $borderColor;
            display: flex;
            position: relative;
            z-index: 3;
            justify-content: space-between;
            flex: 0 0 auto;

            .icon {
                cursor: pointer;
            }

            &.tg__form--dirty {
                .tg__form-send {
                    opacity: 1;
                }

                .icon-speach {
                    transform: scale(0);
                }

                .tg__form-send {
                    transform: scale(1);
                }
            }

            .icon-speach,.tg__form-send {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                transition: transform .2s ease-in-out;
                cursor: pointer;
            }

            .icon-speach {
                transform: scale(1);
                left: 23px;
                top: 15px;
            }

            .tg__form-send {
                transform: scale(0);
                left: 6px;
            }
        }

        &__form-btns {
            flex: 0 0 auto;
            width: 60px;
            display: flex;
            justify-content: center;
            position: relative;
            align-items: flex-start;
            padding-top: 15px;
        }

        &__form-send {
            background: url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23828A99%22%20d%3D%22M4.7%2015.8c-.7%201.9-1.1%203.2-1.3%203.9-.6%202.4-1%202.9%201.1%201.8%202.1-1.1%2012-6.7%2014.3-7.9%202.9-1.6%202.9-1.5-.2-3.2-2.3-1.4-12.2-6.8-14-7.9s-1.7-.6-1.2%201.8c.2.8.6%202.1%201.3%203.9.5%201.3%201.6%202.3%203%202.5l5.8%201.1c.1%200%20.1.1.1.1s0%20.1-.1.1l-5.8%201.1c-1.3.4-2.5%201.3-3%202.7z%22%2F%3E%3C%2Fsvg%3E') 50% no-repeat;
            width: 50px;
            height: 50px;
            border: none;
            opacity: 0.8;
            transition: opacity .2s ease-in-out;
        }

        &__form-area-wrap {
            position: relative;
            flex: 1 1 auto;
            align-self: center;
        }

        &__textarea-heighthelper {
            position: absolute;
            opacity: 0;
            left: 99999px;
            visibility: hidden;
            font-size: 13px;
        }

        &__form-input {
            background: none;
            border: none;
            outline: none;
            font-size: 13px;
            resize: none;
            display: flex;
            flex: 1 1 auto;
            width: 100%;
            padding-top: 9px;
            height: 30px;
        }
    }
</style>