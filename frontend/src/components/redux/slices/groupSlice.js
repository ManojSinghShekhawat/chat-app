import { createSlice } from "@reduxjs/toolkit";
const groupSlice = createSlice({
  name: "group",
  initialState: {
    selectedGroup: null,
  },
  reducers: {
    setSelectedGroup(state, action) {
      state.selectedGroup = action.payload;
    },
  },
});
export const { setSelectedGroup } = groupSlice.actions;
export default groupSlice.reducer;
