import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  user: IUser | null;
  isLoggedIn: boolean;
};

type Actions = {
  setUser: (user: IUser | null) => void;
};

export const useUserStore = create<State & Actions>()(
  immer((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user: IUser | null) =>
      set((state) => {
        state.user = user;
        state.isLoggedIn = user !== null;
      }),
  }))
);
