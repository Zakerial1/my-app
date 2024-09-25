import { configureStore } from '@reduxjs/toolkit';
import autorizationReducer from '../page/Slices/SliceRegistr'
import MessengsReducer from '../page/Slices/SliceMesseng'
export const store = configureStore({
  reducer: {
    autorization:autorizationReducer,
    Messengs:MessengsReducer
  },
})