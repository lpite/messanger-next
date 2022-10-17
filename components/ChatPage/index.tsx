import React from "react";
import { useSwipeable } from "react-swipeable";
import { io, Socket } from "socket.io-client";
import { useChatPageStore } from "../../store/chatPageStore";
import { useProfilePageStore } from "../../store/profilePageStore";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";

import styles from "./ChatPage.module.scss";
//TODO css modules


interface IMessage {
  text: string,
  time: string,
  owner_id: string,
  owner_login: string,
  owner_name: string
}

export default function ChatPage() {
  const { isOpen, closeChatPage, chatName, chatId, chatType } = useChatPageStore((state) => state);
  const { login } = useProfilePageStore(state => state)

  const handlers = useSwipeable({
    onSwipedRight: () => {
      //chat on right swipe
      closeChatPage();
    },
  });

  // const { data } = useSWR(["getMessages", login], async () => {
  //   if (login.length) {
  //     const { status, data } = await fetch(`/api/getMessages/?id=1`).then(res => res.json())

  //     return data || [] as IMessage[]
  //   }
  //   return [] as IMessage[];
  // })

  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const messagesElement = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //TODO: FIX THIS SHIT
  // setMessages(data)
  // }, [data]);
  React.useEffect(() => {
    //scroll to bottom
    const timeout = setTimeout(() => {
      if (messagesElement && messagesElement.current) {
        messagesElement?.current.scrollTo(
          0,
          messagesElement.current.scrollHeight
        );
      }
    }, 50);
    () => {
      clearTimeout(timeout)
    }
  }, [messages])



  React.useEffect(() => {
    if (login.length && !messages.length) {
      fetch(`/api/getMessages/?id=1`).then(res => res.json())
        .then(({ status, data }) => {
          if (status === "success") {
            setMessages(data)
          }
        })
    }

  }, [login])
  let socket: Socket;

  React.useEffect(() => {
    initSocket();
    return () => {
      if (socket) {
        socket?.off("connect");
        socket?.off("newMessage");
        
      }
    };
  }, [login])
  async function initSocket() {
    if (login.length) {
      await fetch("/api/listenMessages/");
      socket = io()
      socket.on("connect", () => {
        console.log("connected")
      })

      socket.on("newMessage", msg => {
        console.log(msg)
        console.log(messages)

        setMessages((prev) => [...prev, msg])
      })
    }
  }

  if (!login.length) {
    return null;
  }
  return (
    <div
      className={`chat_page ${isOpen ? "chat_page__open" : ""}`}
      {...handlers}
    >
      <div className={styles.chat_header}>
        <button onClick={closeChatPage} className="link_button header_button">
          Chats
        </button>
        <div className={styles.chat_info}>
          <span className={styles.chat_name}>{chatName}</span>
          <span className={styles.last_online}>{chatType === "user" ? "last seen a month ago" : ""}</span>
        </div>
        <img src="" alt="" className={styles.chat_image} />
      </div>
      <div className="chat_messages">
        <div style={{ overflowY: "scroll", scrollBehavior: "smooth" }} ref={messagesElement}>
          {messages &&
            messages
              .map((message, i) => (
                <Message
                  key={`${message.text}_${message.time}`}
                  ownerId={message.owner_id}
                  ownerLogin={message.owner_login}
                  ownerName={message.owner_name}
                  text={message.text}
                  time={message.time}
                  status="sent"
                />
              ))}
        </div>
      </div>
      <NewMessageForm />
    </div>
  );
}
