import {
   Avatar,
   AvatarGroup,
   Button,
   Flex,
   Text,
   VStack,
   useDisclosure,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";

const ProfileHeader = () => {
   const { userProfile } = useUserProfileStore();
   const authUser = useAuthStore((state) => state.user);
   const visitingOwnProfileAndAuth =
      authUser && authUser.username === userProfile.username;
   const visitingAnotherProfileAndAuth =
      authUser && authUser.username !== userProfile.username;
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <Flex
         gap={{ base: 4, sm: 10 }}
         py={10}
         direction={{ base: "column", sm: "row" }}
      >
         <AvatarGroup
            size={{ base: "xl", md: "2xl" }}
            justifySelf={"center"}
            alignSelf={"flex-start"}
            mx={"auto"}
         >
            <Avatar
               name={""}
               src={userProfile.profilePicURL}
               variant={"rounded"}
            />
         </AvatarGroup>

         <VStack
            alignItems={"start"}
            gap={2}
            mx={"auto"}
            flex={1}
            justifyContent={"center"}
         >
            <Flex
               gap={4}
               direction={{ base: "column", sm: "row" }}
               justifyContent={{ base: "flex-start", md: "flex-start" }}
               alignItems={"center"}
               w={"full"}
            >
               <Text fontSize={{ base: "md", md: "xl" }}>
                  {userProfile.fullName}
               </Text>
            </Flex>

            <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
               <Text>
                  <Text as={"span"} fontWeight={"bold"} mr={1}>
                     {userProfile.listings.length}
                  </Text>
                  Listings
               </Text>
            </Flex>

            {visitingOwnProfileAndAuth && (
               <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                  <Button
                     bg="#5E2BFF"
                     color={"white"}
                     _hover={{ bg: "#C04CFD" }}
                     size={{ base: "xs", md: "sm" }}
                     onClick={onOpen}
                  >
                     Edit Profile
                  </Button>

                  {/* Log Out */}
                  <Button
                     bg="gray"
                     color={"white"}
                     _hover={{ bg: "gray.800" }}
                     size={{ base: "xs", md: "sm" }}
                  >
                     List an Item
                  </Button>
               </Flex>
            )}
            {visitingAnotherProfileAndAuth && (
               <Flex
                  gap={4}
                  alignItems={"center"}
                  justifyContent={"center"}
               ></Flex>
            )}
         </VStack>
         {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      </Flex>
   );
};

export default ProfileHeader;
