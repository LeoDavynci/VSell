import { create } from "zustand"

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    // used to update the number of listings on the user profile
    addPost: (post) => set(state => ({
        userProfile: {...state.userProfile,posts:[post.id,...state.userProfile.posts]}
    }))
}))

export default useUserProfileStore;