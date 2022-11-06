import React from "react";
import dynamic from "next/dynamic";

import ChatsPage from "../components/ChatsPage";
import LoginPage from "../components/SignInPage";
import { GetServerSideProps } from "next";
import { useProfilePageStore } from "../store/profilePageStore";
import { useSignInPageStore } from "../store/signInPageStore";

const ProfilePage = dynamic(() => import("../components/ProfilePage"), { ssr: false })
const ChatPage = dynamic(() => import("../components/ChatPage"), { ssr: false })


interface IndexProps { 
  user: {
    id: number,
    display_name: string,
    login: string,
    photo: string
  }  
}

export default function Index({ user }: IndexProps) {
  
  const { setUser } = useProfilePageStore(store => store)
  const { closeSignInPage } = useSignInPageStore(store => store)
  React.useEffect(() => {
    if (Object.keys(user).length) {
      setUser({
        id: user.id,
        displayName: user.display_name,
        login: user.login,
        photo: user.photo
      })
      closeSignInPage();
    }
  }, [])
  
  return (
    <>
      <LoginPage />
      <ChatsPage />
      <ChatPage />
      <ProfilePage />;
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const href = process.env.NODE_ENV === "development" ? "localhost:3000" : "lchap.vercel.app"

  const { data } = await fetch(`http://${href}/api/me/`, {
    headers: {
      "Cookie": `sessionId=${req.cookies["sessionId"]}`
    }
  }).then(res => res.json())
    .catch((error) => {
      return {}
    })
  return {
    props: {
      user:data||{} 
    },
  }
}

