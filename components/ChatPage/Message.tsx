import { useProfilePageStore } from "../../store/profilePageStore";

interface MessageProps {
  ownerId: string;
  ownerLogin: string;
  ownerName: string;
  text: string;
  time: string;
  status: string;
}

export default function Message({
  ownerId,
  ownerLogin,
  ownerName,
  text,
  time,
  status,
}: MessageProps) {

  const {
    id,
    login,
  } = useProfilePageStore(store => store)

  return (
    <div
      className={`message_line ${ownerId === id ? "message_line--own" : ""
        }`}
    >
      <div className="message">
        <span className="message_text">{text}</span>
        <div className="message_details">
          <span className="message_time" suppressHydrationWarning>{(new Date(parseInt(time))).toLocaleString()}</span>
          {ownerName === "me" ? (
            <img src="/messageStatus.svg" className="message_status" alt="" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
