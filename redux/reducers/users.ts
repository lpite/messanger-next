import { addUsers } from "../types/users";

const initialState = {
  users: [],
};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case addUsers:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
