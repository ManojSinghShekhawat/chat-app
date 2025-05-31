//configur redux store
import { configureStore } from "@reduxjs/toolkit";

import messageReducer from "./slices/messageSlice";
import userReducer from "./slices/userSlice";
import contactReducer from "./slices/contactSlice";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userReducer,
    contact: contactReducer,
  },
});

export default store;
