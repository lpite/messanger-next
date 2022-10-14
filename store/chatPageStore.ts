import create from 'zustand'



interface ChatPageStore{
    isOpen:boolean,
    chatId:string,
    chatName:string,
    openChat:({chatId,chatName}:OpenChatParams)=>void,
    closeChat:()=>void
}

interface OpenChatParams{
    chatId:string,
    chatName:string
}

export const useChatPageStore = create<ChatPageStore>((set) => ({
    isOpen: false,
    chatId:"",
    chatName:"",
    openChat: ({chatId,chatName}) => set(()=>({  
        isOpen:true,
        chatId:chatId,
        chatName:chatName
    })),
    closeChat:()=>set(()=>({
        isOpen:false
    }))
}))