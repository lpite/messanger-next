import { addUsers } from "../types/users";
//поменять на нормальный тип нужно
export const setUsers = (users: Array<any>) => ({
  type: addUsers,
  payload: users,
});
