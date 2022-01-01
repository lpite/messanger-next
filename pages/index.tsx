import React from "react";

import Link from "next/link";
import router from "next/router";

import { useSelector } from "react-redux";

import ChatBlock from "../components/chat-block";
import { AppState } from "../redux/store";

function Main() {
  const { name } = useSelector(({ me }: AppState) => me);
  const { users } = useSelector(({ users }: AppState) => users);
  React.useEffect(() => {
    if (!name) {
      router.push("/login/");
    }
  }, [name]);

  return (
    <div className="container">
      <header className="header black-container">
        <Link href="/">
          <a className="header-button"></a>
        </Link>
        <span className="header-text">Chats</span>
        <div className="header-image"></div>
        {/* <img src="" alt="" className="header-image" /> */}
      </header>
      <main className="main-page">
        {users.map(
          (el: {
            id: string;
            socketId: string;
            isOnline: boolean;
            name: string;
          }) => (
            <ChatBlock
              chatId={el.id}
              online={el.isOnline}
              name={el.name}
              key={el.id}
            />
          )
        )}
      </main>
    </div>
  );
}

export default Main;
