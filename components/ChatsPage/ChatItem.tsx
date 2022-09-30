import { useChatPageStore } from "../../store/chatPageStore";

export default function ChatItem() {
    const {openChat} = useChatPageStore(state=>state)

  return (
    <div className="chat_item" onClick={openChat}>
      <img src="" alt="" className="chat_photo" />
      <div className="chat_details">
        <span className="chat_name">Lpite</span>
        <br />
        <span className="chat_message">Hey hey</span>
      </div>
      <div className="chat_time_unread">
        <span className="chat_time" suppressHydrationWarning>
          {new Date().toLocaleTimeString().slice(0, 5)}
        </span>
        <span className="chat_unread_count">1</span>
      </div>
    </div>
  );
}
