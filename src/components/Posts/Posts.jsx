import React, { useContext, useEffect, useState } from "react";
import { SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import Post from "./Post";
import useWindowWidth from "./useWindowWidth";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { SearchContext } from "../../store/searchContext";

const Posts = () => {
   const { isLoading: feedLoading, posts: feedPosts } = useGetFeedPosts();
   const { searchPosts, isSearching, searchTerm } = useContext(SearchContext);
   const [displayPosts, setDisplayPosts] = useState([]);
   const width = useWindowWidth();

   useEffect(() => {
      if (searchTerm.trim()) {
         setDisplayPosts(searchPosts);
      } else {
         setDisplayPosts(feedPosts);
      }
   }, [searchTerm, searchPosts, feedPosts]);

   const getColumnCount = (width) => {
      if (width >= 2021) return 11;
      if (width >= 1791 && width <= 2020) return 10;
      if (width >= 1561 && width <= 1790) return 9;
      if (width >= 1461 && width <= 1560) return 8;
      if (width >= 1231 && width <= 1460) return 7;
      if (width >= 1061 && width <= 1230) return 6;
      if (width >= 881 && width <= 1060) return 5;
      if (width >= 701 && width <= 880) return 4;
      if (width >= 531 && width <= 700) return 3;
      if (width >= 360 && width <= 530) return 2;
      return 1;
   };
   const columns = getColumnCount(width);

   const isLoading = isSearching || feedLoading;

   return (
      <>
         {isLoading ? (
            <Center>
               <Spinner size="xl" />
            </Center>
         ) : (
            <SimpleGrid columns={columns} spacing={2} justifyContent="center">
               {displayPosts.length > 0 ? (
                  displayPosts.map((post) => <Post key={post.id} post={post} />)
               ) : (
                  <Center>No posts available</Center>
               )}
            </SimpleGrid>
         )}
      </>
   );
};

export default Posts;
