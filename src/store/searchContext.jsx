import React, { createContext, useState, useEffect } from "react";
import useSearchPosts from "../hooks/useSearchPosts";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
   const [searchTerm, setSearchTerm] = useState("");
   const { posts: searchPosts, isLoading: isSearching } =
      useSearchPosts(searchTerm);

   const value = {
      searchTerm,
      setSearchTerm,
      searchPosts,
      isSearching,
   };

   return (
      <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
   );
};
