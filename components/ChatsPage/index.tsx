import React from "react";
import useSWR from "swr";

import { useProfilePageStore } from "../../store/profilePageStore";
import ChatItem from "./ChatItem";



export default function ChatsPage() {



  const { openProfilePage, login } = useProfilePageStore((state) => state);


  const { data, error } = useSWR([login], async () => {
    if (login.length) {
      const chats = await fetch("/api/getChats").then(res => res.json())
      return chats.data as { chatId: string, chatName: string, lastMessageText: string, lastMessageTime: string }[]

    }
    return [] as { chatId: string, chatName: string, lastMessageText: string, lastMessageTime: string }[]
     
  })


  if (!login.length) {
    return null;
  }

  return (
    <div className="chats_page">
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
        {data && 
          data
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
    </div>
  );
}
