import { login } from "../types/user";
export const loginUser = (name: string, id: number) => ({
  type: login,
  payload: { name, id },
});
