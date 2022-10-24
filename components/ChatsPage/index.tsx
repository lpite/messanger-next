import React from "react";
import useSWR from "swr";

import { useProfilePageStore } from "../../store/profilePageStore";
import ChatItem from "./ChatItem/ChatItem";

export interface IChat {
  chatId: string,
  chatName: string,
  chatType: string,
  lastMessageOwnerName: string,
  lastMessageText: string,
  lastMessageTime: string
}

export default function ChatsPage() {

  const { openProfilePage, login } = useProfilePageStore((state) => state);


  const { data, error } = useSWR(["getChats", login], async () => {
    if (login.length) {
      const chats = await fetch("/api/getChats").then(res => res.json())
      return chats.data as IChat[]

    }
    return [] as IChat[]
     
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
                chatType={chat.chatType}
                lastMessageOwnerName={chat.lastMessageOwnerName}
                lastMessageText={chat.lastMessageText}
                lastMessageTime={chat.lastMessageTime}
              />
            ))}
      </div>
    </div>
  );
}
