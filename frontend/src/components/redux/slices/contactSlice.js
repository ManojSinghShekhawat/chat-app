import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    selectedContact: null,
  },
  reducers: {
    setSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },
  },
});
export const { setSelectedContact } = contactSlice.actions;
export default contactSlice.reducer;
