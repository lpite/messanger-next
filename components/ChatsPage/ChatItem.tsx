import { useChatPageStore } from "../../store/chatPageStore";

interface ChatItemProps {
  chatId: string,
  chatName: string,
  lastMessageText: string,
  lastMessageTime: string
}

export default function ChatItem({ chatId, chatName, lastMessageText, lastMessageTime }: ChatItemProps) {
  const { openChat } = useChatPageStore(state => state)

  return (
    <div className="chat_item" onClick={() => openChat({chatId,chatName})}>
      <img src="" alt="" className="chat_photo" />
      <div className="chat_details">
        <span className="chat_name">{chatName}</span>
        <br />
        <span className="chat_message">{lastMessageText}</span>
      </div>
      <div className="chat_time_unread">
        <span className="chat_time" suppressHydrationWarning>
          {(new Date(parseInt(lastMessageTime)).toLocaleTimeString())}
        </span>
        <span className="chat_unread_count">1</span>
      </div>
    </div>
  );
}
