import { Box, Image, VStack } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

const Post = ({ img, name, price, location }) => {
   return (
      <VStack
         spacing={2}
         alignItems="center"
         justifyContent={"center"}
         padding={2}
         w="full"
         minW="100px"
         maxW="1fr"
      >
         <Box>
            <Box w="10rem" h="auto" position="relative">
               <Image
                  src={img}
                  borderRadius="10px"
                  objectFit="cover"
                  position="relative"
                  overflow={"hidden"}
                  w="10rem"
                  h="10rem"
               />
            </Box>
            <PostFooter name={name} price={price} location={location} />
         </Box>
      </VStack>
   );
};

export default Post;
