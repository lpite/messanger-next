import React from "react";
import { Message } from "../../types/message";
import styles from "./Styles.module.scss";

import ReactTextFormat from "react-text-format";
import { API_URL } from "../../config";

function MessageBlock({
  author_id,
  author_name,
  id,
  text,
  image,
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
      {image ? (
        <img src={`${API_URL}${image}`}></img>
      ) : (
        <pre className={styles.message_pre}>
          <ReactTextFormat linkTarget="_blank">{text}</ReactTextFormat>
        </pre>
      )}

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
