import { IChat } from "../index";
import { useChatPageStore } from "../../../store/chatPageStore";

import styles from "./ChatItem.module.scss";

export default function ChatItem({ chatId, chatName, chatType, chatPhoto, lastMessageOwnerName, lastMessageText, lastMessageTime }: IChat) {
  const { openChatPage, setChatPageInfo } = useChatPageStore(state => state)

  function openChat() {
    setChatPageInfo({
      chatId,
      chatName,
      chatType,
      chatPhoto
    })
    openChatPage()
  }

  return (
    <div className={styles["chat_item"]} onClick={openChat}>
      <img src={`/${chatPhoto}`} alt="" className={styles["chat_photo"]} />
      <div className={styles["chat_details"]}>
        <span className={styles["chat_name"]}>{chatName}</span>
        <br />
        <span className={styles["chat_message"]}>{chatType === "group" ? `${lastMessageOwnerName}:` : ""} {lastMessageText.length >= 15 ? lastMessageText.slice(0,15) + "..." : lastMessageText}</span>
      </div>
      <div className={styles["chat_time_unread"]}>
        <span className={styles["chat_time"]} suppressHydrationWarning>
          {(new Date(parseInt(lastMessageTime)).toLocaleTimeString())}
        </span>
        <span className={styles["chat_unread_count"]}>1</span>
      </div>
    </div>
  );
}
