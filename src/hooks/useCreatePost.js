import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import {
   addDoc,
   arrayUnion,
   collection,
   doc,
   updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const useCreatePost = () => {
   const [isLoading, setIsLoading] = useState(false);
   const showToast = useShowToast();
   const authUser = useAuthStore((state) => state.user);
   const createPost = usePostStore((state) => state.createPost);
   const addPost = useUserProfileStore((state) => state.addPost);
   const userProfile = useUserProfileStore((state) => state.userProfile);
   const { pathname } = useLocation();

   const handleCreatePost = async (formState) => {
      if (isLoading) return;
      if (formState.selectedFiles.length === 0) {
         showToast("Error", "Please select at least one image", "error");
         return;
      }
      setIsLoading(true);

      const newPost = {
         itemName: formState.itemName,
         price: parseFloat(formState.price),
         pickupLocation: formState.pickupLocation,
         isOBO: formState.isOBO,
         caption: formState.caption,
         itemQuality: formState.itemQuality,
         category: formState.category,
         likes: [],
         createdAt: Date.now(),
         createdBy: authUser.uid,
      };

      try {
         const postDocRef = await addDoc(
            collection(firestore, "posts"),
            newPost
         );
         const userDocRef = doc(firestore, "users", authUser.uid);

         await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

         const imageURLs = await Promise.all(
            formState.selectedFiles.map(async (file, index) => {
               const imageRef = ref(storage, `posts/${postDocRef.id}_${index}`);
               await uploadString(imageRef, file, "data_url");
               return getDownloadURL(imageRef);
            })
         );

         await updateDoc(postDocRef, { imageURLs: imageURLs });

         newPost.imageURLs = imageURLs;

         if (
            userProfile &&
            authUser.user &&
            userProfile.uid === authUser.user.uid
         ) {
            createPost({ ...newPost, id: postDocRef.id });
         }

         if (
            pathname !== "/" &&
            userProfile &&
            authUser.user &&
            userProfile.uid === authUser.user.uid
         ) {
            addPost({ ...newPost, id: postDocRef.id });
         }

         showToast("Success", "Post created successfully", "success");
      } catch (error) {
         showToast("Error", error.message, "error");
      } finally {
         setIsLoading(false);
      }
   };

   return { isLoading, handleCreatePost };
};

export default useCreatePost;
