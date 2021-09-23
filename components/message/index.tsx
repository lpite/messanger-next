import React from "react";
import { Message } from "../../types/message";
import styles from "./Styles.module.scss";

function MessageBlock({ author_id, author_name, id, text, time }: Message) {
  let at = 0;
  if (typeof window !== "undefined") {
    at = parseInt(localStorage.getItem("id"));
  }

  return (
    <div
      className={author_id === at ? styles.message_me : styles.message_others}
    >
      <span className={styles.message_text}>{text}</span>
      <span className={styles.message_date}>
        {time}
        <span className={styles.message_status}>?</span>
      </span>
    </div>
  );
}

export default MessageBlock;
