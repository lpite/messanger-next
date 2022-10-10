import create from "zustand";

interface ProfilePageStore {
  isOpen: boolean;
  userName: string;
  email: string;
  displayName: string;
  openProfilePage:()=>void,
  closeProfilePage:()=>void,
  setUser:(user:any|null)=>void
}

export const useProfilePageStore = create<ProfilePageStore>((set) => ({
  isOpen: false,
  userName: "",
  email: "",
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
      userName:user?.user_metadata.name,
      email:user?.email
    })),
}));
