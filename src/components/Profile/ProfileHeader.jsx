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
import useLogout from "../../hooks/useLogout";
import { FaBug } from "react-icons/fa";

const convertTimestampToDate = (timestamp) => {
   const date = new Date(timestamp);

   // Extract the components of the date
   const year = date.getFullYear();
   const month = date.getMonth() + 1; // Months are zero-indexed
   const day = date.getDate();

   // Format the date as MM/DD/YYYY
   return `${month}/${day}/${year}`;
};

const DateDisplay = ({ timestamp }) => {
   const formattedDate = convertTimestampToDate(timestamp);
   return <div>Joined: {formattedDate}</div>;
};

const ProfileHeader = () => {
   const { userProfile } = useUserProfileStore();
   const authUser = useAuthStore((state) => state.user);
   const visitingOwnProfileAndAuth =
      authUser && authUser.username === userProfile.username;
   const visitingAnotherProfileAndAuth =
      authUser && authUser.username !== userProfile.username;
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { handleLogout, isLoggingOut } = useLogout();
   return (
      <Flex gap={{ base: 4, sm: 10 }} py={10} direction={"column"} w={"full"}>
         <Flex flexDirection="row" justify={"center"} align={"center"} gap={5}>
            <Flex>
               <AvatarGroup
                  size={{ base: "xl", md: "2xl" }}
                  justifySelf={"center"}
                  alignSelf={"flex-start"}
                  mx={"auto"}
               >
                  <Avatar
                     name={userProfile?.fullName || "User"}
                     src={userProfile.profilePicURL}
                     variant={"rounded"}
                  />
               </AvatarGroup>
            </Flex>
            <Flex>
               <VStack
                  alignItems={"start"}
                  gap={0}
                  mx={"auto"}
                  flex={1}
                  justifyContent={"center"}
               >
                  <Flex
                     direction={{ base: "column", sm: "row" }}
                     justifyContent={{ base: "flex-start", md: "flex-start" }}
                     alignItems={"start"}
                     w={"full"}
                  >
                     <Text fontSize={{ base: "20px", md: "30px" }}>
                        {userProfile.fullName}
                     </Text>
                  </Flex>

                  <Flex
                     alignItems={"center"}
                     gap={{ base: 2, sm: 4 }}
                     justifyItems={"center"}
                     w={"full"}
                  >
                     <Text>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                           {userProfile.posts.length}
                        </Text>
                        Listings
                     </Text>
                  </Flex>

                  <Flex w={"full"}>
                     <Text fontSize={"15px"}>{userProfile.email}</Text>
                  </Flex>

                  <Flex w={"full"} fontSize={"15px"}>
                     <DateDisplay timestamp={userProfile.createdAt} />
                  </Flex>
               </VStack>
            </Flex>
         </Flex>
         <Flex alignItems={"center"} justifyContent={"center"}>
            {visitingOwnProfileAndAuth && (
               <Flex
                  gap={4}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mt={2}
               >
                  <Button
                     bg="#79A88E"
                     color={"white"}
                     _hover={{ bg: "#A2C0B0" }}
                     size={{ base: "xs", md: "sm" }}
                     onClick={onOpen}
                  >
                     Edit Profile
                  </Button>

                  <Button
                     bg="#79A88E"
                     color={"white"}
                     _hover={{ bg: "#A2C0B0" }}
                     size={{ base: "xs", md: "sm" }}
                     isLoading={isLoggingOut}
                     onClick={handleLogout}
                  >
                     Log Out
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
         </Flex>

         {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      </Flex>
   );
};

export default ProfileHeader;
