import { create } from "zustand"

const useAuthStore = create((set) => ({
    user: (() => {
        try {
          return JSON.parse(localStorage.getItem("user-info"));
        } catch {
          return null;
        }
      })(),
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
    setUser: (user) => set({user})
}))

export default useAuthStore;