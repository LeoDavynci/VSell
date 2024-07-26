import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchPosts = (searchTerm) => {
   const [posts, setPosts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const searchPosts = async () => {
         if (!searchTerm.trim()) {
            setPosts([]);
            return;
         }

         setIsLoading(true);
         const postsRef = collection(firestore, "posts");
         const q = query(postsRef);

         try {
            const querySnapshot = await getDocs(q);
            const allPosts = querySnapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));

            const lowercaseSearchTerm = searchTerm.toLowerCase();
            const filteredPosts = allPosts.filter((post) =>
               post.itemName.toLowerCase().includes(lowercaseSearchTerm)
            );

            setPosts(filteredPosts);
         } catch (error) {
            console.error("Error searching posts:", error);
         } finally {
            setIsLoading(false);
         }
      };

      searchPosts();
   }, [searchTerm]);

   return { posts, isLoading };
};

export default useSearchPosts;
