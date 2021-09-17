import React from "react";
import Link from "next/link";
import ChatBlock from "../components/chat-block";

function Main() {
  return (
    <div className="container">
      <header className="header black-container">
        <Link href="/">
          <a className="header-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 14"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </a>
        </Link>
        <span className="header-text">Chats</span>
        <img src="" alt="" className="header-image" />
      </header>
      <main>
        <ChatBlock />
        <ChatBlock />

        <ChatBlock />
        <ChatBlock />
        <ChatBlock />
        <ChatBlock />
      </main>
    </div>
  );
}

export default Main;
