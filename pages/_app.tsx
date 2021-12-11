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
import { addUser, removeUser, setUsers } from "../redux/actions/users";
import axios from "axios";
import { API_URL, appVersion } from "../config";

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
        const notification = new Notification(author_name, {
          body: text,
        });
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            notification.close();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  // @ts-ignore
  React.useEffect(() => {
    socket.on("new-message", (message: Message) => {
      if (message.author_id !== id) {
        dispatch(addMessage(message));
      }

      requestPermission(message.author_name, message.text, message.author_id);
    });
    socket.on("newUser", (user) => {
      dispatch(addUser(user));
    });

    socket.on("disconnectUser", (user) => {
      dispatch(removeUser(user));
    });
  }, [socket]);

  const { name } = useSelector(({ user }: any) => user);
  React.useEffect(() => {
    if (!name) {
      router.push("/login/");
    } else {
      axios.post(`${API_URL}api/users/get`).then(({ data }) => {
        console.log(data);
        dispatch(setUsers(data));
      });
    }
    if (typeof window !== "undefined") {
      window.onblur = () => {
        axios
          .post(`${API_URL}api/user/change/status`, {
            id: id,
            isOnline: false,
          })
          .catch(() => {});
      };
      window.onfocus = () => {
        axios.post(`${API_URL}api/users/get`).then(({ data }) => {
          console.log(data);
          dispatch(setUsers(data));
        });
        axios
          .post(`${API_URL}api/user/change/status`, {
            id: id,
            isOnline: true,
          })
          .catch(() => {});
      };
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

        <link rel="apple-touch-icon" href="/cat.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/cat.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/cat.png" sizes="76x76" />
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
  // window.addEventListener("scroll", (e) => {
  //   e.preventDefault();
  //   window.scrollTo(0, 0);
  // });
  axios.post(`${API_URL}api/check/app/version`).then(({ data }) => {
    if (data !== appVersion) {
      if (confirm("Update?")) {
        window.location.reload();
      }
    }
  });
}
export default MyApp;
