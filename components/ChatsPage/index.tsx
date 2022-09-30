import ChatItem from "./ChatItem";

export default function ChatsPage() {
  return (
    <main className="chats_page">
      <div className="chats_header">
        <button className="link_button profile_button">Profile</button>
        <input type="text" className="chats_search" placeholder="Search" />
      </div>
      <div className="chats_list">
        {Array(30)
          .fill("")
          .map((_, i) => (
            <ChatItem key={i} />
          ))}
      </div>
    </main>
  );
}
