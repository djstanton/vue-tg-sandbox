<template>
    <div>
        <Chat  :messages="messages"/>
        <Messageform/>
    </div>
</template>

<script>
import Chat from './Chat';
import Messageform from './Form';
import {HTTP} from '../libs/http.js';

export default {
    name: 'Contact',
    components: {
        Chat,
        Messageform
    },
    watch: {
        '$route.params.id'() {
            this.fetchData();
        }
    },
    data () {
        return {
          messages: []
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let userId = this.$route.params.id;
            let chat = this.$store.state.chats[userId];

            if(chat && chat.length) {
                this.messages = chat;
            } else {
                HTTP.get(`/src/user-${userId}.json`).then((response)=>{
                    let messages = response.data.messages;
                    this.$store.commit('setChat', messages);
                    this.messages = messages;
                }).catch(()=>{
                    this.error = 'api error';
                })
            }
        }
    }
}
</script>