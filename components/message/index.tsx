import React from "react";
import { Message } from "../../types/message";
import { useInView } from "react-intersection-observer";
function MessageBlock({ author, id, text, time }: Message) {
  let at = "";
  if (typeof window !== "undefined") {
    at = localStorage.getItem("id");
  }

  return (
    <div className={`message ${author === at ? "message-me" : ""}`}>
      <span className="message-text">{text}</span>
      <span className="message-date">{time}</span>
    </div>
  );
}

export default MessageBlock;
