import React from "react";

import Link from "next/link";
import router from "next/router";

import { useSelector } from "react-redux";

import ChatBlock from "../components/chat-block";

function Main() {
  const { name } = useSelector(({ user }: any) => user);
  const { users } = useSelector(({ users }: any) => users);

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
          (el: { id: string; socketId: string; isOnline: boolean }) => (
            <ChatBlock chatId={el.id} online={el.isOnline} key={el.id} />
          )
        )}
      </main>
    </div>
  );
}

export default Main;
