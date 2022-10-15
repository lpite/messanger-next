import create from 'zustand'



interface ChatPageStore {
    isOpen: boolean,
    chatId: string,
    chatName: string,
    chatType: string,
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
}

export const useChatPageStore = create<ChatPageStore>((set) => ({
    isOpen: false,
    chatId: "",
    chatName: "",
    chatType: "",
    openChatPage: () => set(() => ({  
        isOpen: true,
    })),
    closeChatPage: () => set(() => ({
        isOpen: false
    })),
    setChatPageInfo: ({ chatId, chatName, chatType }) => set(() => ({
        chatId: chatId,
        chatName: chatName,
        chatType: chatType,
    }))
}))