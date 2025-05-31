import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: [],
  loading: false,
  error: null,
};
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    fetchMessagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.loading = false;
    },
    fetchMessagesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    sendMessageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess(state, action) {
      state.messages.push(action.payload);
      state.loading = false;
    },
    sendMessageFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const {
  fetchMessagesRequest,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
} = messageSlice.actions;
export default messageSlice.reducer;
