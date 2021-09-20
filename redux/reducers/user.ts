import { login } from "../types/user";

const initialState = {
  name: "",
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case login:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
