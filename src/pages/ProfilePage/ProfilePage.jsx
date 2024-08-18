import {
   Container,
   Flex,
   Text,
   Link,
   SkeletonCircle,
   VStack,
   Skeleton,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { FaBug } from "react-icons/fa";

const ProfilePage = () => {
   const { username } = useParams();
   const { isLoading, userProfile } = useGetUserProfileByUsername(username);
   const userNotFound = !isLoading && !userProfile;
   const authUser = useAuthStore((state) => state.user);

   if (userNotFound) return <UserNotFound />;

   return (
      <Container maxW={"100%"} py={20} bg={"white"}>
         <Container
            maxW={{ base: "100%", md: "80%" }}
            minHeight={"100vh"}
            bg={"white"}
            pb={20}
         >
            <Flex
               py={10}
               px={4}
               pl={{ base: 4, md: 10 }}
               w={"full"}
               mx={"auto"}
               flexDirection={"column"}
            >
               {!isLoading && userProfile && <ProfileHeader />}
               {isLoading && <ProfileHeaderSkeleton />}
            </Flex>
            <Flex
               px={{ base: 2, sm: 4 }}
               maxW={"full"}
               mx={"auto"}
               borderTop={"1px solid"}
               borderColor={"white"}
               direction={"column"}
            >
               <ProfileTabs />
               <ProfilePosts />
               <Flex
                  flexDir={"row"}
                  justify={"center"}
                  align={"center"}
                  gap={5}
                  pt={40}
               >
                  <FaBug size={20} />
                  <Text fontSize={"12px"}>
                     Bug report or suggestions? Email us at vsell.web@gmail.com
                  </Text>
               </Flex>
            </Flex>
         </Container>
      </Container>
   );
};

export default ProfilePage;

const ProfileHeaderSkeleton = () => {
   return (
      <Flex
         gap={{ base: 4, sm: 10 }}
         py={10}
         direction={{ base: "column", sm: "row" }}
         justifyContent={"center"}
         alignItems={"center"}
      >
         <SkeletonCircle size="24" />

         <VStack
            alignItems={{ base: "center", sm: "flex-start" }}
            gap={2}
            mx={"auto"}
            flex={1}
         >
            <Skeleton height="12px" width="150px" />
            <Skeleton height="12px" width="100px" />
         </VStack>
      </Flex>
   );
};

const UserNotFound = () => {
   return (
      <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
         <Text fontSize={"2xl"}>User Not Found</Text>
         <Link
            as={RouterLink}
            to={"/"}
            color={"blue.500"}
            w={"max-content"}
            mx={"auto"}
         >
            Go home
         </Link>
      </Flex>
   );
};
