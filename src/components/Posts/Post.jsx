import { Box, Image, VStack } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

const Post = () => {
   return (
      <VStack spacing={4} align="stretch">
         <Box w="150px" h="0" pb="150px" position="relative">
            <Image
               src="/img1.png"
               borderRadius="lg"
               objectFit="cover"
               position="absolute"
               top={0}
               left={0}
               right={0}
               bottom={0}
            />
         </Box>
         <PostFooter />
      </VStack>
   );
};

export default Post;
