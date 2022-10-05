import React from "react";
import ChatPage from "../components/ChatPage";
import ChatsPage from "../components/ChatsPage";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";

export default function Index() {

  //Затичка
  if (false) {
    return <LoginPage />;
  }

  return (
    <>
      <ChatsPage />
      <ChatPage />
      <ProfilePage />;
    </>
  );
}
