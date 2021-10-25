import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userData';
import notificationReducer from './notification';

export default configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer
    },
})