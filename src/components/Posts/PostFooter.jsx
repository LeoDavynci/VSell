import { Flex, Text } from "@chakra-ui/react";

const PostFooter = () => {
   return (
      <Flex
         justifyContent={"space-between"}
         alignItems={"center"}
         gap={4}
         w={"full"}
         pt={0}
         mb={2}
         mt={"auto"}
      >
         <Text fontSize="lg">Post Title</Text>
      </Flex>
   );
};

export default PostFooter;
