import { GetServerSideProps, InferGetServerSidePropsType, } from "next";
import React from "react";
import ChatPage from "../components/ChatPage";
import ChatsPage from "../components/ChatsPage";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";



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

