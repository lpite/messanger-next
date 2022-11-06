import create from "zustand";

interface User {
  id: number,
  login: string,
  displayName: string,
  photo:string
}


interface ProfilePageStore {
  isOpen: boolean;
  id: number,
  login: string;
  displayName: string;
  photo:string,
  openProfilePage: () => void,
  closeProfilePage: () => void,
  setUser: (user: User) => void
}

export const useProfilePageStore = create<ProfilePageStore>((set) => ({
  isOpen: false,
  id: 0,
  login: "",
  displayName: "",
  photo:"",
  openProfilePage: () =>
    set(() => ({
      isOpen: true,
    })),
  closeProfilePage: () =>
    set(() => ({
      isOpen: false,
    })),
  setUser: (user) => set(() => ({
    id:user.id,
    login: user.login,
    displayName: user.displayName,
    photo:user.photo
  })),
}));
