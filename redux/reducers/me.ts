import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  id: 0,
};
interface LoginPayload {
  name: string;
  id: number;
}
const me = createSlice({
  name: "me",
  initialState: initialState,
  reducers: {
    loginMe(state, action: PayloadAction<LoginPayload>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});
export const { loginMe } = me.actions;

export default me.reducer;
