import create from "zustand";

interface User {
  id: string,
  login: string,
  displayName: string
}


interface ProfilePageStore {
  isOpen: boolean;
  id: string,
  login: string;
  displayName: string;
  openProfilePage: () => void,
  closeProfilePage: () => void,
  setUser: (user: User) => void
}

export const useProfilePageStore = create<ProfilePageStore>((set) => ({
  isOpen: false,
  id: "",
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
  setUser: (user) => set(() => ({
    id:user.id,
    login: user.login,
    displayName: user.displayName
  })),
}));
