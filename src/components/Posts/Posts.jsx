import React, { useContext, useEffect, useState } from "react";
import {
   SimpleGrid,
   Spinner,
   Center,
   Button,
   Flex,
   Text,
} from "@chakra-ui/react";
import Post from "./Post";
import useWindowWidth from "./useWindowWidth";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { SearchContext } from "../../store/searchContext";

const Posts = () => {
   const { isLoading: feedLoading, posts: feedPosts } = useGetFeedPosts();
   const {
      searchPosts,
      isSearching,
      searchTerm,
      filteredCategories,
      filteredPosts,
   } = useContext(SearchContext);
   const [displayPosts, setDisplayPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const width = useWindowWidth();

   const postsPerPage = 24;

   useEffect(() => {
      let filteredPosts = searchTerm.trim() ? searchPosts : feedPosts;

      if (
         filteredCategories.length > 0 &&
         !filteredCategories.includes("All")
      ) {
         filteredPosts = filteredPosts.filter((post) =>
            filteredCategories.includes(post.category)
         );
      }

      setDisplayPosts(filteredPosts);
      setCurrentPage(1);
   }, [searchTerm, searchPosts, feedPosts, filteredCategories]);

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

   // Pagination logic
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost);

   const totalPages = Math.ceil(displayPosts.length / postsPerPage);

   const nextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   };

   const prevPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
   };

   return (
      <>
         {isLoading ? (
            <Center>
               <Spinner size="xl" />
            </Center>
         ) : (
            <>
               <SimpleGrid
                  columns={columns}
                  spacing={2}
                  justifyContent="center"
               >
                  {currentPosts.length > 0 ? (
                     currentPosts.map((post) => (
                        <Post key={post.id} post={post} />
                     ))
                  ) : (
                     <Center>No posts available</Center>
                  )}
               </SimpleGrid>
               {displayPosts.length > postsPerPage && (
                  <Flex justifyContent="center" alignItems="center" mt={4}>
                     <Button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        mr={2}
                     >
                        Previous
                     </Button>
                     <Text mx={4}>
                        Page {currentPage} of {totalPages}
                     </Text>
                     <Button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                     >
                        Next
                     </Button>
                  </Flex>
               )}
            </>
         )}
      </>
   );
};

export default Posts;
