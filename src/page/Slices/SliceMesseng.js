import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  value: 0,
  status: 'idle',
  messeng: [], // чаты
  currentMesseng: [{ idChat: 0, infoChat: ['Напишите первое сообщение '], usersChat: [0, 0] }], //актуальный чат
  arrUser: [{ Login: 'Login', Name: 'Name', Surname: 'surname', LastName: 'LastName', Passwort: "qwer123", NumberPhone: '+380000000000', userID: 0, contacts:"" }],
  // contacts: [{ Login: 'Login', Name: 'Name', Surname: 'surname', LastName: 'LastName', Passwort: "qwer123", NumberPhone: '+380000000000', userID: 0 }],
  autorizac: false
}
export const Messengs = createSlice({
  name: 'Messengs',
  initialState,
  reducers: {
    sendMesseng: (state, action) => {
      const { idChat, idMesseng, contentMesseng, parentMesseng, parentMessengID } = action.payload;
      const chatMesseng = state.messeng.find(chat => chat.idChat === idChat);
      if (chatMesseng) {
        chatMesseng.infoChat.push({ idMesseng, contentMesseng, parentMesseng, parentMessengID })
        state.currentMesseng[0].infoChat.push({ idMesseng, contentMesseng, parentMesseng, parentMessengID });
      }
      // state.currentMesseng.infoChat.push({ idMesseng, contentMesseng, parentMesseng, parentMessengID });
      // const chat = state.currentMesseng.find(chat => chat.idChat === idChat);
      // if (chat) {
      //   chat.infoChat.push({ idMesseng, contentMesseng, parentMesseng, parentMessengID });
      // } else {
      //   console.error(`Chat with id ${idChat} not found`);
      // }
      // const tempChat = state.messeng.find(chat => chat.idChat === state.currentMesseng[0].idChat)
      // if (tempChat) {
      //   tempChat.infoChat.push({ idMesseng, contentMesseng, parentMesseng, parentMessengID });
      // }
    },
    createChat: (state, action) => {
      // const { idChat, infoChat, usersChat } = action.payload;
      // const chatExists = state.messeng.some(chat => chat.usersChat[0] === usersChat[0] ||  chat.usersChat[1] === usersChat[1] || 
      //   chat.usersChat[1] === usersChat[0] || chat.usersChat[0] === usersChat[1]);
      // if (!chatExists) {
      state.messeng.push(action.payload);
      state.currentMesseng.push(action.payload);
    },
    searchChat: (state, action) => {
      const { userS, chats } = action.payload;
      // Проверяем, что userS определён и имеет хотя бы два элемента
      if (!userS && userS.length < 1) {
        console.error('userS не определён или недостаточно элементов.');
        return;
      }
      const chat = chats.filter((chat) => {
        // Проверяем, что в chat.usersChat есть минимум два пользователя
        if (!chat.usersChat && chat.usersChat.length < 2) {
          return false;
        }
        return (chat.usersChat[0] === userS[0] && chat.usersChat[1] === userS[1]) ||
          (chat.usersChat[0] === userS[1] && chat.usersChat[1] === userS[0]);
      });
      // логика что б не создавались дубли чатов с одиноковми ID юзеров 
      console.log(chat);
      console.log(chats);
      if (chat.length > 0) {
        // state.currentMesseng.filter((temp) => temp == false)
        state.currentMesseng = [chat[0]]; // Если найден чат, берем первый элемент
      } else {
        console.log(chat);
        console.error('Чат не найден.');
      }
    },
    createContact: (state, action) => {
      const currentUser = state.arrUser.find(curUser => curUser.userID == action.payload)
      
      
      .push(action.payload)
      // const arrContact = state.contacts.find(temp => temp.userID == action.payload.userID);
      // if (arrContact) {
      //   console.error("Такой пользователь уже есть в контактах");
      // }
      // else {
      //   state.contacts.push(action.payload)
      // }
    },
    deletecurrentMesseng: (state, action) => {
      state.currentMesseng = [{ idChat: 0, infoChat: ['Напишите первое сообщение '], usersChat: [0, 0] }];
    },
  }
})
export const Contacts = (state) => state.Messengs.contacts
export const CurrentMesseng = (state) => state.Messengs.currentMesseng;
export const arrMesseng = (state) => state.Messengs.messeng;
export const { sendMesseng, createChat, searchChat, createContact, deletecurrentMesseng } = Messengs.actions;
export default Messengs.reducer;