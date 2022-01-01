import React from "react";
import styles from "./Styles.module.scss";
import { useSelector } from "react-redux";
import { Message } from "../../types/message";
import { useRouter } from "next/router";
import { AppState } from "../../redux/store";
function ChatBlock({ chatId, online, name }) {
  const { messages } = useSelector(({ messages }: AppState) => messages);
  const [lastMessage, setLastMessage] = React.useState<any>({});
  let id = 0;
  if (typeof window !== "undefined") {
    id = parseInt(localStorage.getItem("id"));
  }
  const router = useRouter();
  React.useEffect(() => {
    const newMessages = messages
      // .reverse()
      .find((el: Message) => el.author_id == chatId || el.to == chatId);
    // setLastMessage(

    // );
  }, [messages, chatId, id]);

  if (chatId === id) {
    return null;
  }
  if (!chatId) {
    return null;
  }
  function moveToPage() {
    router.push(`/chat/${chatId}`);
  }
  return (
    <div className={styles.chat_block} onClick={moveToPage} tabIndex={0}>
      <div
        className={styles.chat_block_image_wrapper}
        style={{
          background: `${online ? "var(--violet)" : "var(--black)"}`,
        }}
      >
        <img src="/cat.jpg" alt="" className={styles.chat_block_image} />
      </div>
      <span className={styles.chat_block_name}>{name ? name : chatId}</span>
      <span className={styles.chat_block_time}>
        {lastMessage?.time?.slice(15, 21)}
      </span>
      <span className={styles.chat_block_text}>{lastMessage?.text}</span>
    </div>
  );
}

export default ChatBlock;
