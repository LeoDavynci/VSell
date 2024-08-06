import React, { createContext, useState, useEffect } from "react";
import useSearchPosts from "../hooks/useSearchPosts";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
   const [searchTerm, setSearchTerm] = useState("");
   const { posts: searchPosts, isLoading: isSearching } =
      useSearchPosts(searchTerm);
   const [filteredCategories, setFilteredCategories] = useState(["All"]);
   const [filteredPosts, setFilteredPosts] = useState([]);

   useEffect(() => {
      if (filteredCategories.includes("All")) {
         setFilteredPosts(searchPosts);
      } else {
         const newFilteredPosts = searchPosts.filter((post) =>
            filteredCategories.includes(post.category)
         );
         setFilteredPosts(newFilteredPosts);
      }
   }, [searchPosts, filteredCategories]);

   const value = {
      searchTerm,
      setSearchTerm,
      searchPosts,
      isSearching,
      filteredCategories,
      setFilteredCategories,
      filteredPosts,
   };

   return (
      <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
   );
};
