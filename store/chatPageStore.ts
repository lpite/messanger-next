import create from 'zustand'
import { IMessage } from '../components/ChatPage'



interface ChatPageStore {
    isOpen: boolean,
    chatId: string,
    chatName: string,
    chatType: string,
    chatPhoto: string,
    messages: IMessage[],
    openChatPage: () => void,
    closeChatPage: () => void,
    setChatPageInfo: (info: SetChatPageInfo) => void
    setMessages: (messages: IMessage[]) => void

}

interface OpenChatParams {
    chatId: string,
    chatName: string
}
interface SetChatPageInfo {
    chatId: string,
    chatName: string,
    chatType: string,
    chatPhoto: string
}

export const useChatPageStore = create<ChatPageStore>((set) => ({
    isOpen: false,
    chatId: "",
    chatName: "",
    chatType: "",
    chatPhoto: "",
    messages: [],
    openChatPage: () => set(() => ({  
        isOpen: true,
    })),
    closeChatPage: () => set(() => ({
        isOpen: false
    })),
    setChatPageInfo: ({ chatId, chatName, chatType, chatPhoto }) => set(() => ({
        chatId: chatId,
        chatName: chatName,
        chatType: chatType,
        chatPhoto: chatPhoto
    })),
    setMessages: (messages) => set(() => ({
        messages: messages
    }))

}))