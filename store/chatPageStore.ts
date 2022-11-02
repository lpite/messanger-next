import create from 'zustand'



interface ChatPageStore {
    isOpen: boolean,
    chatId: string,
    chatName: string,
    chatType: string,
    chatPhoto: string,
    openChatPage: () => void,
    closeChatPage: () => void,
    setChatPageInfo: (info: SetChatPageInfo) => void
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
    }))
}))