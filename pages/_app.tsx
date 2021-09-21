import "../styles/globals.css";
import type { AppProps } from "next/app";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import React from "react";
import { socket } from "../socket";
import { Message } from "../types/message";

import { useDispatch } from "react-redux";

function SocketIo() {
  const dispatch = useDispatch();
  async function requestPermission(author: string, text: string) {
    try {
      let permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("new", {
          body: "",
        });
      }
    } catch (error) {}
  }
  React.useEffect(() => {
    socket.on("new-message", (message: Message) => {
      dispatch({ type: "message", payload: message });
      requestPermission(message.author, message.text);
    });
    socket.on("new-user", (user) => {});
  }, [socket]);
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Provider store={store}>
        <SocketIo />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
if (typeof window !== "undefined") {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", Math.random().toString());
  }
}
export default MyApp;
