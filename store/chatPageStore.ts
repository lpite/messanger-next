import create from 'zustand'

interface ChatPageStore{
    isOpen:boolean,
    chatId:string,
    openChat:(id:string)=>void,
    closeChat:()=>void
}
export const useChatPageStore = create<ChatPageStore>((set) => ({
    isOpen: false,
    chatId:"",
    openChat: (id) => set(()=>({  
        isOpen:true,
        chatId:id
    })),
    closeChat:()=>set(()=>({
        isOpen:false
    }))
}))