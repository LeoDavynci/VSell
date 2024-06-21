import { Box, Image, VStack } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

const Post = () => {
   return (
      <VStack
         spacing={2}
         alignItems="center"
         bg={"lime"}
         justifyContent={"center"}
         padding={2}
      >
         <Box bg={"purple"}>
            <Box w="9rem" h="9rem" position="relative" mb={2}>
               <Image
                  src="/img4.png"
                  borderRadius="10px"
                  objectFit="cover"
                  position="relative"
                  overflow={"hidden"}
                  w="9rem"
                  h="9rem"
               />
            </Box>
            <PostFooter />
         </Box>
      </VStack>
   );
};

export default Post;
