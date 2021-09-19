import React from "react";
import Link from "next/link";
import Image from "next/image";
function ChatBlock() {
  return (
    <Link href="/chat/1">
      <a className="chat-link">
        <div className="chat-block">
          <img src="" alt="" className="chat-block-image" />
          <span className="chat-block-name">name</span>
          <span className="chat-block-time">time</span>
          <span className="chat-block-text">message</span>
        </div>
      </a>
    </Link>
  );
}

export default ChatBlock;
