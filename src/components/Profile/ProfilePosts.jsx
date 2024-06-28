import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 2000);
   }, []);

   return (
      <Grid
         templateColumns={{
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
         }}
         gap={3}
         columnGap={3}
      >
         {isLoading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
               <VStack key={idx} alignItems={"flex-start"} gap={4}>
                  <Skeleton w={"full"}>
                     <Box h={"300px"}>contents wrapped</Box>
                  </Skeleton>
               </VStack>
            ))}

         {!isLoading && (
            <>
               <ProfilePost
                  img="/img1.png"
                  name="Plastic Trays"
                  price="50"
                  location="Zeppos Tower"
                  description="Durable, multipurpose trays ideal for organizing or serving. Various colors available."
               />
               <ProfilePost
                  img="/img2.png"
                  name="iPad Stand"
                  price=""
                  location="Zeppos Tower"
                  description="Adjustable, portable stand for comfortable viewing and typing. Compatible with most ipads."
               />
               <ProfilePost
                  img="/img3.png"
                  name="Brita"
                  price="10"
                  location="Rand"
                  description="Water filtration pitcher for clean, great-tasting water. Reduces chlorine taste and odor."
               />
               <ProfilePost
                  img="/img4.png"
                  name="Vintage Chairs"
                  price="20"
                  location="Sutherland House"
                  description="Charming mid-century designs. Solid wood construction with original upholstery. Perfect for adding character to any room."
               />
            </>
         )}
      </Grid>
   );
};

export default ProfilePosts;
