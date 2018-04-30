import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        filteredUsers: {},
        currentChat: {},
        chats: {},
        users: {},
        currentUserId: 99
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentChat = user;
        },
        setChat(state, chatObj) {
            if(state.currentChat.id){
                state.chats[state.currentChat.id] = chatObj;
            }
        },
        setUsers(state, users) {
            state.users = users;
        },
        pushMessage(state, message) {
            let currentChatId = state.currentChat.id;
            let chat = state.chats[currentChatId];
            let dayChat = [];

            if(!chat[chat.length - 1]['today']) {
                chat.push({'today': []});
            }

            dayChat = chat[chat.length - 1]['today'];
            dayChat.push(message);

            state.users[currentChatId].lastMessage = message.message;
            state.users[currentChatId].lastMessageDate = message.time;
            state.users[currentChatId].unread = true;

        },
        filterUsers(state, users) {
            state.filteredUsers = users;
        }
    }
});
