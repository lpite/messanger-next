import React from "react";
import { useSwipeable } from "react-swipeable";
import { supabase } from "../../lib/supaBase";
import { useChatPageStore } from "../../store/chatPageStore";
import { useProfilePageStore } from "../../store/profilePageStore";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";

interface IMessage {
  text: string,
  time: string,
  owner_id:string,
  owner_login: string,
  owner_name: string
}


export default function ChatPage() {
  const { isOpen, closeChat, chatName, chatId } = useChatPageStore((state) => state);
  const { login } = useProfilePageStore(state => state)

  const handlers = useSwipeable({
    onSwipedRight: () => {
      //chat on right swipe
      closeChat();
    },
  });
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const messagesElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    //scroll to bottom
    if (messagesElement && messagesElement.current) {
      messagesElement?.current.scrollTo(
        0,
        messagesElement.current.scrollHeight
      );
    }
  }, [messages]);

  const listenMessages = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: "chat_id=eq.1" },
      async (payload) => {
        setMessages([...messages, payload.new as IMessage])
      }
    )
    .subscribe()


  React.useEffect(() => {
    if (login.length) {
      fetch(`/api/getMessages/?id=1`).then(res => res.json())
        .then(({ status, data }) => {
          if (status === "success") {
            setMessages(data)
          }
        })
    }

  }, [login])

  if (!login.length) {
    return null;
  }

  return (
    <div
      className={`chat_page ${isOpen ? "chat_page__open" : ""}`}
      {...handlers}
    >
      <div className="chat_header">
        <button onClick={closeChat} className="link_button header_button">
          Chats
        </button>
        <div className="chat_info">
          <span className="chat_name">{chatName}</span>
          <span className="last_online">last seen a month ago</span>
        </div>
        <img src="" alt="" className="chat_image" />
      </div>
      <div className="chat_messages">
        <div style={{ overflowY: "scroll" }} ref={messagesElement}>
          {messages
            .map((message, i) => (
              <Message
                key={i}
                ownerId={message.owner_id}
                ownerLogin={message.owner_login}
                ownerName={message.owner_name}
                text={message.text}
                time={message.time}
                status="sent"
              />
            ))}
        </div>
      </div>
      <NewMessageForm />
    </div>
  );
}
