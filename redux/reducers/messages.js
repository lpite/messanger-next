import { newMessage, updateMessage } from "../types/messages";
import produce from "immer";
const initialState = {
  messages: [],
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case newMessage: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    case updateMessage: {
      let message = state.messages.find(
        (el) => el.local_id == action.payload.local_id
      );
      message.status = action.payload.status;
      message.id = action.payload.id;
      message.time = action.payload.time;
      const newMessages = produce(state.messages, (draft) => {
        let message = draft.find(
          (el) => el.local_id == action.payload.local_id
        );
        // console.log(draft);
        draft.push(4353);
        // console.log(message);
      });
      console.log(message);
      return {
        ...state,
      };
    }

    // case ""
    default:
      return state;
  }
}
