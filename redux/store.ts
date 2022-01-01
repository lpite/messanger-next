import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import messages from "./reducers/messages";
import me from "./reducers/me";
import users from "./reducers/users";

export function makeStore() {
  return configureStore({
    reducer: { messages, me, users },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
