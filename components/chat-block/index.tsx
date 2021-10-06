import React from "react";
import Link from "next/link";
import styles from './Styles.module.scss'
function ChatBlock({chatId,online}) {
  let id = 0;
  if (typeof window !== "undefined") {
    id = parseInt(localStorage.getItem("id"));
  }
  if (chatId === id) {
    return null;
    
  }
  if (!chatId) {
    return null;
  }
  return (
    <Link href={`/chat/${chatId}`} scroll={false}>
      <a className={styles.chat_link}>
        <div className={styles.chat_block}>
          <div  className={styles.chat_block_image_wrapper} style={{background:`${online?"var(--violet)":"var(--black)"}`}}>
          <img src="/cat.jpg" alt=""  className={styles.chat_block_image}/>
          </div>
          <span className={styles.chat_block_name}>{chatId}</span>
          <span className={styles.chat_block_time}>time</span>
          <span className={styles.chat_block_text}>message</span>
        </div>
      </a>
    </Link>
  );
}

export default ChatBlock;
