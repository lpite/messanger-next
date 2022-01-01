import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { socket } from "../socket";
import { Message } from "../types/message";
import { addMessage } from "../redux/reducers/messages";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import router from "next/router";
import axios from "axios";
import { API_URL } from "../config";
import store, { AppState } from "../redux/store";
import { changeUserStatus, setUsers } from "../redux/reducers/users";
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
  React.useEffect(() => {
    socket.on("new-message", (message: Message) => {
      if (message.author_id !== id) {
        dispatch(addMessage(message));
      }

      requestPermission(message.author_name, message?.text, message.author_id);
    });
    socket.on("newUser", (user) => {
      dispatch(changeUserStatus(user));
    });

    socket.on("disconnectUser", (user) => {
      dispatch(changeUserStatus(user));
    });
    // eslint-disable-next-line
  }, [socket]);

  const { name } = useSelector(({ me }: AppState) => me);
  React.useEffect(() => {
    if (!name) {
      router.push("/login/");
    } else {
      axios.post(`${API_URL}api/users/get`).then(({ data }) => {
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
    newConnection();
    // eslint-disable-next-line
  }, [name]);
  function newConnection() {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        id = parseInt(localStorage.getItem("id"));
      }
      if (id !== 0 && id && name) {
        socket.emit("new-connection", { id, name });
      } else {
        newConnection();
      }
    }, 1000);
  }
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
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
  // axios.post(`${API_URL}api/check/app/version`).then(({ data }) => {
  //   if (data !== appVersion) {
  //     if (confirm("Update?")) {
  //       window.location.reload();
  //     }
  //   }
  // });
}

export default MyApp;
