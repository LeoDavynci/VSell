import {
   Avatar,
   AvatarGroup,
   Button,
   Flex,
   Text,
   VStack,
} from "@chakra-ui/react";

const ProfileHeader = () => {
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
            <Avatar name={""} src="/headshot.jpg" variant={"rounded"} />
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
               <Text fontSize={{ base: "md", md: "xl" }}>Vince Lin</Text>
            </Flex>

            <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
               <Text>
                  <Text as={"span"} fontWeight={"bold"} mr={1}>
                     4
                  </Text>
                  Listings
               </Text>
            </Flex>

            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
               <Button
                  bg="#5E2BFF"
                  color={"white"}
                  _hover={{ bg: "#C04CFD" }}
                  size={{ base: "xs", md: "sm" }}
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
         </VStack>
      </Flex>
   );
};

export default ProfileHeader;
