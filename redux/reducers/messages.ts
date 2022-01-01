import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  messages: [],
};
interface Message {}
const messages = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addMessage(state, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
    updateMessage(state, action: PayloadAction<any>) {
      const message = state.messages.find(
        (el) => el.local_id == action.payload.local_id
      );
      console.log(action.payload);

      if (message) {
        state.messages[state.messages.indexOf(message)] = {
          status: action.payload.status,
          id: action.payload.id,
          time: action.payload.time,
          text: message.text,
          image: action.payload.image,
          author_id: message.author_id,
          author_name: message.author_name,
          to: message.to,
          local_id: message.local_id,
        };
      }
    },
  },
});

export const { addMessage, updateMessage } = messages.actions;
export default messages.reducer;
