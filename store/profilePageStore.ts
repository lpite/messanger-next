import create from "zustand";

interface ProfilePageStore {
  isOpen: boolean;
  login: string;
  displayName: string;
  openProfilePage:()=>void,
  closeProfilePage:()=>void,
  setUser:(user:{login:string,displayName:string})=>void
}

export const useProfilePageStore = create<ProfilePageStore>((set) => ({
  isOpen: false,
  login: "",
  displayName: "",
  openProfilePage: () =>
    set(() => ({
      isOpen: true,
    })),
  closeProfilePage: () =>
    set(() => ({
      isOpen: false,
    })),
    setUser:(user) =>set(()=>({
      login:user.login,
      displayName:user.displayName
    })),
}));
