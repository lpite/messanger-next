import { IChat } from ".";
import { useChatPageStore } from "../../store/chatPageStore";



export default function ChatItem({ chatId, chatName,chatType, lastMessageText, lastMessageTime }: IChat) {
  const { openChatPage,setChatPageInfo } = useChatPageStore(state => state)

  function openChat(){
    setChatPageInfo({
      chatId,
      chatName,
      chatType
    })
    openChatPage()
  }

  return (
    <div className="chat_item" onClick={openChat}>
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
