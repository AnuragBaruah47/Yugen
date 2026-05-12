import { create } from "zustand";


export const authStore = create((set) => ({
  authenticated: false,
  isAuthenticated: (user) =>
    set({
      authenticated: !!user,
    }),
}));
