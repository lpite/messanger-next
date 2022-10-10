import create  from "zustand";

interface SignInPageStore {
  isOpen: boolean;
  openSignInPage: () => void;
  closeSignInPage: () => void;
}

export const useSignInPageStore = create<SignInPageStore>((set) => ({
  isOpen: true,
  openSignInPage: () =>
    set(() => ({
      isOpen: true,
    })),
  closeSignInPage: () =>
    set(() => ({
      isOpen: false,
    })),
}));
