import { SimpleGrid } from "@chakra-ui/react";
import Post from "./Post";
import useWindowWidth from "./useWindowWidth";

const Posts = () => {
   const width = useWindowWidth();
   let columns;

   if (width >= 1200) {
      columns = 7;
   } else if (width >= 992) {
      columns = 6;
   } else if (width >= 768) {
      columns = 5;
   } else if (width >= 576) {
      columns = 4;
   } else {
      // eslint-disable-next-line no-unused-vars
      columns = 3;
   }

   return (
      <SimpleGrid
         columns={columns}
         spacing={0}
         bg={"pink"}
         justifyContent="center"
      >
         <Post />
      </SimpleGrid>
   );
};

export default Posts;
