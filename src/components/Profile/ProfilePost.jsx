import {
   Box,
   Flex,
   GridItem,
   Image,
   Img,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ProfilePost = ({ img }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <GridItem
            cursor={"pointer"}
            borderRadius={10}
            overflow={"hidden"}
            borderColor={"black"}
            position={"relative"}
            aspectRatio={1 / 1}
            onClick={onOpen}
         >
            <Flex
               opacity={0}
               _hover={{ opacity: 1 }}
               position={"absolute"}
               top={0}
               left={0}
               right={0}
               bottom={0}
               bg={"blackAlpha.700"}
               transition={"all 0.03s ease"}
               zIndex={1}
               justifyContent={"center"}
            >
               <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                  <Flex color={"white"}>
                     <FaHeart size={25} />
                     <Text fontWeight={"bold"} ml={2}>
                        7
                     </Text>
                  </Flex>
               </Flex>
            </Flex>

            <Img src={img} w={"100%"} h={"100%"} objectFit={"cover"} />
         </GridItem>

         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            size={{ base: "500px", md: "6xl" }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader py={5}></ModalHeader>
               <ModalBody bg={"lightblue"} py={3} px={3}>
                  <Flex
                     gap={10}
                     w={{ base: "full", sm: "full", md: "full" }}
                     flexDirection={{ base: "column", md: "row" }}
                     bg={"lightgreen"}
                  >
                     <Box
                        borderRadius={30}
                        overflow="hidden"
                        flex={1}
                        w={"100%"}
                     >
                        <Image
                           src={img}
                           objectFit="cover"
                           position="relative"
                           overflow={"hidden"}
                        />
                     </Box>

                     <Flex
                        flex={1}
                        flexDirection="column"
                        px={0}
                        justifyContent={{ base: "start", md: "start" }}
                        bg={"lightpink"}
                     >
                        <Box
                           display="flex"
                           alignItems="baseline"
                           justifyContent={"space-between"}
                           pr={20}
                           bg={"lightcoral"}
                        >
                           <Text fontSize="sm" color="gray">
                              Posted 3 hours ago
                           </Text>
                           <Flex gap={1}>
                              <FaLocationDot color="gray" />
                              <Text fontSize="sm" color="gray">
                                 Zeppos Tower
                              </Text>
                           </Flex>
                        </Box>

                        <Flex
                           justifyContent="space-between"
                           alignContent="center"
                           pr={0}
                           bg={"lightgoldenrodyellow"}
                        >
                           <Box
                              fontSize="5xl"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                           >
                              Respawn Gaming Chair
                           </Box>
                        </Flex>
                     </Flex>
                  </Flex>
               </ModalBody>
               <ModalFooter py={5}></ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default ProfilePost;
