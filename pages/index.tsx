import React from "react";
import dynamic from "next/dynamic";

import ChatsPage from "../components/ChatsPage";
import LoginPage from "../components/LoginPage";

const ProfilePage = dynamic(() => import("../components/ProfilePage"), { ssr: false })
const ChatPage = dynamic(() => import("../components/ChatPage"), { ssr: false})


export default function Index() {

  return (
    <>
      <LoginPage />
      <ChatsPage />
        <ChatPage />
        <ProfilePage />;
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { status, data } = await fetch("http://localhost:3000/api/me/", {
//     headers: {
//       "Cookie": `sessionId=${req.cookies["sessionId"]}`
//     }
//   }).then(res => res.json())
//     .catch((error) => {
      
//     })
//   return {
//     props: {
    
//     },
//   }
// }

