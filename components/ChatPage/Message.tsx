interface MessageProps {
  ownderId: string;
  ownerName: string;
  text: string;
  time: string;
  status: string;
}

export default function Message({
  ownderId,
  ownerName,
  text,
  time,
  status,
}: MessageProps) {
  return (
    <div
      className={`message_line ${
        ownerName === "me" ? "message_line--own" : ""
      }`}
    >
      <div className="message">
        <span className="message_text">{text}</span>
        <div className="message_details">
          <span className="message_time" suppressHydrationWarning>{time}</span>
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
