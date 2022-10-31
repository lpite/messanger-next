import React from "react";
import { useSwipeable } from "react-swipeable";
import { useChatPageStore } from "../../store/chatPageStore";
import { useProfilePageStore } from "../../store/profilePageStore";
import Message from "./Message/Message";
import NewMessageForm from "./NewMessageForm/NewMessageForm";

import styles from "./ChatPage.module.scss";
import useSWR from "swr";
import { supabase } from "../../lib/supaBase";


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

  const { data, mutate } = useSWR<IMessage[]>(["getMessages", login], async () => {
    if (login.length) {
      const { status, data } = await fetch(`/api/getMessages?chatId=1`).then(res => res.json())

      return data 
    }
    return []
  })

  const messagesElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    //scroll to bottom
    if (messagesElement && messagesElement.current) {
      messagesElement?.current.scrollTo(
        0,
        messagesElement.current.scrollHeight
      );
    }
  }, [data])

  if (!login.length) {
    return null;
  }

  const listenMessages = supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { event: "INSERT", schema: "public" }, async (payload: any) => {
      mutate(async (currentData) => {
        const { data } = await fetch(`/api/getMessages?chatId=1&messageId=${payload.new?.id}`).then(res => res.json())
        return [...currentData || [], data[0]]
      }, {
        revalidate: false
      })
    })
    .subscribe()

  return (
    <div
      className={isOpen ? styles["chat_page--open"] : styles["chat_page"]}
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
        <img src="/cat.jpg" alt="" className={styles.chat_image} />
      </div>
      <div className={styles["chat_messages"]}>
        <div style={{ overflowY: "scroll", scrollBehavior: "smooth" }} ref={messagesElement}>
          {data &&
            data
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
