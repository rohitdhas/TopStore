import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification: ""
};

const notificationSlice = createSlice({
    initialState,
    name: "Notification",
    reducers: {
        updateNotification: (state, action) => {
            state.notification = action.payload;
        },
        resetNotification: (state) => {
            state.notification = "";
        }
    }
})

export const { updateNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;