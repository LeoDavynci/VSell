import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
   const { isLoading, posts } = useGetUserPosts();

   const noPostsFound = !isLoading && posts.length === 0;
   if (noPostsFound) return <NoPostsFound />;

   return (
      <Grid
         templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
         }}
         gap={3}
         columnGap={3}
      >
         {isLoading &&
            [0, 1, 2].map((_, idx) => (
               <VStack key={idx} alignItems={"flex-start"} gap={4}>
                  <Skeleton w={"full"}>
                     <Box h={"300px"}>contents wrapped</Box>
                  </Skeleton>
               </VStack>
            ))}

         {!isLoading && (
            <>
               {posts.map((post) => (
                  <ProfilePost post={post} key={post.id} />
               ))}
            </>
         )}
      </Grid>
   );
};

export default ProfilePosts;

const NoPostsFound = () => {
   <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Listings Found</Text>
   </Flex>;
};
