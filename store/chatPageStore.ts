import create from 'zustand'

interface ChatPageStore{
    isOpen:boolean,
    chatId:string,
    openChat:()=>void,
    closeChat:()=>void
}

export const useChatPageStore = create<ChatPageStore>((set) => ({
    isOpen: false,
    chatId:"",
    openChat: () => set(()=>({  
        isOpen:true
    })),
    closeChat:()=>set(()=>({
        isOpen:false
    }))
}))