import React from "react";
import { useProfilePageStore } from "../../store/profilePageStore";
import ChatItem from "./ChatItem";

export default function ChatsPage() {
  const { openProfilePage } = useProfilePageStore((state) => state);
  const [chats, setChats] = React.useState<{ chatId: string, chatName: string, lastMessageText: string, lastMessageTime: string }[]>([]);

  React.useEffect(() => {
    fetch("/api/getChats").then(res => res.json())
      .then(({ status, data }) => {
        if (status === "success") {
          setChats(data)
        }
      })
  }, [])
  return (
    <main className="chats_page">
      <div className="chats_header">
        <button
          className="link_button profile_button"
          onClick={openProfilePage}
        >
          Profile
        </button>
        <input type="text" className="chats_search" placeholder="Search" />
      </div>
      <div className="chats_list">
        {chats
          .map((chat, i) => (
            <ChatItem 
              key={i}  
              chatId={chat.chatId}
              chatName={chat.chatName}
              lastMessageText={chat.lastMessageText}
              lastMessageTime={chat.lastMessageTime}
            />
          ))}
      </div>
    </main>
  );
}
