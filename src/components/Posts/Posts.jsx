import { SimpleGrid } from "@chakra-ui/react";
import Post from "./Post";

const Posts = () => {
   return (
      <SimpleGrid columns={{ base: 3, md: 5, lg: 7 }} spacing={5} bg={"pink"}>
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
      </SimpleGrid>
   );
};

export default Posts;
