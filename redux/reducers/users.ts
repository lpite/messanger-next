import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type State = {
  users: Array<User>;
};
const initialState: State = {
  users: [],
};
interface User {
  id: string;
  socketId: string;
  isOnline: boolean;
  name: string;
}
const users = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<any>>) {
      state.users = action.payload;
    },
    changeUserStatus(state, action: PayloadAction<User>) {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        if (action.payload.isOnline) {
          state.users[state.users.indexOf(user)] = {
            isOnline: action.payload.isOnline,
            id: action.payload.id,
            socketId: action.payload.socketId,
            name: action.payload.name,
          };
        } else {
          state.users[state.users.indexOf(user)] = {
            isOnline: false,
            id: action.payload.id,
            socketId: user.socketId,
            name: user.name,
          };
        }
      } else {
        state.users.push({
          isOnline: action.payload.isOnline,
          id: action.payload.id,
          socketId: action.payload.socketId,
          name: action.payload.name,
        });
      }
    },
  },
});
export const { setUsers, changeUserStatus } = users.actions;

export default users.reducer;
