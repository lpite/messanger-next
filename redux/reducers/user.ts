import { login } from "../types/user";

const initialState = {
  name: "",
  id: 0,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case login:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
      };
    default:
      return state;
  }
}
