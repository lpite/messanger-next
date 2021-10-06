import { ADD_USER,REMOVE_USER,SET_USERS } from "../types/users";
//поменять на нормальный тип нужно
export const setUsers = (users: Array<any>) => ({
  type: SET_USERS,
  payload: users,
});
export const addUser = (user: any) => ({
  type: ADD_USER,
  payload: user,
});
export const removeUser = (user: any) => ({
  type: REMOVE_USER,
  payload: user,
});