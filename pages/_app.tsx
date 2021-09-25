import "../styles/globals.css";
import type { AppProps } from "next/app";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import React from "react";
import { socket } from "../socket";
import { Message } from "../types/message";

import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import router from "next/router";
import { addMessage } from "../redux/actions/messages";

function SocketIo() {
  let id = 0;
  if (typeof window !== "undefined") {
    id = parseInt(localStorage.getItem("id"));
  }
  const dispatch = useDispatch();
  async function requestPermission(
    author_name: string,
    text: string,
    author_id: number
  ) {
    try {
      let permission = await Notification.requestPermission();
      if (permission === "granted" && author_id !== id) {
        new Notification(author_name, {
          body: text,
        });
      }
    } catch (error) {}
  }
  //@ts-ignore
  React.useEffect(() => {
    socket.on("new-message", (message: Message) => {
      if (message.author_id !== id) {
        dispatch(addMessage(message));
      }

      requestPermission(message.author_name, message.text, message.author_id);
    });
    socket.on("new-user", (user) => {});
  }, [socket]);

  //@ts-ignore
  const { name } = useSelector(({ user }) => user);
  React.useEffect(() => {
    if (!name) {
      router.push("/login/");
    }
  }, [name]);
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <title>Messanger</title>
        <meta name="description" content="Messanger" />
        <link rel="icon" href="/cat.jpg" />
      </Head>
      <Provider store={store}>
        <SocketIo />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
if (typeof window !== "undefined") {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", (Math.random() * 10000000).toFixed());
  }
}
export default MyApp;
