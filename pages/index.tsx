import React from "react";
import ChatPage from "../components/ChatPage";
import ChatsPage from "../components/ChatsPage";
import LoginPage from "../components/LoginPage";
import { useChatPageStore } from "../store/chatPageStore";

export default function Index() {
  const { isOpen } = useChatPageStore((state) => state);

  //Затичка
  if (false) {
    return <LoginPage />;
  }
  return (
    <>
      <ChatsPage />
      <ChatPage />
    </>
  );
}
