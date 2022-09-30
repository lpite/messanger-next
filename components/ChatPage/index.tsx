import React from "react";
import { useSwipeable } from "react-swipeable";
import { useChatPageStore } from "../../store/chatPageStore";
import Message from "./Message";

export default function ChatPage() {
  const { isOpen, closeChat } = useChatPageStore((state) => state);

  const handlers = useSwipeable({
    onSwipedRight: () => {
      //chat on right swipe
      closeChat();
    },
  });

  const messagesElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    //scroll to bottom
    if (messagesElement && messagesElement.current) {
      messagesElement?.current.scrollTo(
        0,
        messagesElement.current.scrollHeight
      );
    }
  }, []);

  return (
    <div
      className={`chat_page ${isOpen ? "chat_page__open" : ""}`}
      {...handlers}
    >
      <div className="chat_header">
        <button onClick={closeChat} className="link_button">
          Chats
        </button>
        <div className="chat_info">
          <span className="chat_name">lpiteee</span>
          <span className="last_online">last seen a month ago</span>
        </div>
        <img src="" alt="" className="chat_image" />
      </div>
      <div className="chat_messages">
        <div style={{ overflow: "scroll" }} ref={messagesElement}>
          {Array(500)
            .fill("")
            .map((_, i) => (
              <Message
                key={i}
                ownderId="1"
                ownerName={i%2===0?"me":""}
                text="hi lorem impsum))"
                time={"20:15"}
                status="sent"
              />
            ))}
        </div>
      </div>
      <form action="" className="new_message">
        <input type="text" className="new_message__input" />
        <button className="new_message__button">s</button>
      </form>
    </div>
  );
}
