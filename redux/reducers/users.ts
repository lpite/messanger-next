import produce from "immer";
import { SET_USERS, ADD_USER, REMOVE_USER } from "../types/users";
type State = {
  users: Array<{ id: string; socketId: string; online: boolean }>;
};
const initialState: State = {
  users: [],
};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER: {
      if (!state.users.find((el) => el.id === action.payload.id)) {
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      }
      const newUsers = produce(state.users, (draft) => {
        const user = draft.find((el) => el.id === action.payload.id);
        if (user) {
          draft[draft.indexOf(user)] = {
            id: user.id,
            socketId: user.socketId,
            online: true,
          };
        }
      });
      return {
        ...state,
        users: newUsers,
      };
    }
    case REMOVE_USER: {
      const newUsers = produce(state.users, (draft) => {
        const user = draft.find((el) => el.id === action.payload.id);
        if (user) {
          draft[draft.indexOf(user)] = {
            id: user.id,
            socketId: user.socketId,
            online: false,
          };
        }
      });
      return {
        ...state,
        users: newUsers,
      };
    }
    default:
      return state;
  }
}
