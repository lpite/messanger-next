import React from "react";
import { Message } from "../../types/message";
import styles from "./Styles.module.scss";

function MessageBlock({
  author_id,
  author_name,
  id,
  text,
  time,
  status,
}: Message) {
  let at = 0;
  if (typeof window !== "undefined") {
    at = parseInt(localStorage.getItem("id"));
  }
  const messageStatuses = [
    { text: "sending...", color: "" },
    { text: "sent", color: "" },
    { text: "seen", color: "white" },
  ];
  return (
    <div
      className={author_id === at ? styles.message_me : styles.message_others}
    >
      <span className={styles.message_text}>{text}</span>
      <div className={styles.message_bottom}>
        <span className={styles.message_date}>{time}</span>
        <span
          className={styles.message_status}
          style={{ color: `${messageStatuses[status]?.color}` }}
        >
          {author_id !== at ? "" : messageStatuses[status]?.text}
        </span>
      </div>
    </div>
  );
}

export default MessageBlock;
