import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    sendMessage: (state, action) => action.payload,
    clearMessage: () => null,
  },
});

export const { sendMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;