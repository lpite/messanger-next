import { login } from "../types/user";
export const loginUser = (name: string) => ({
  type: login,
  payload: name,
});
