import { Avatar, Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
   const authUser = useAuthStore((state) => state.user);
   return (
      <Flex
         width={"60px"}
         height={"60px"}
         align={"center"}
         justify={"center"}
         mr={-1}
      >
         <Box>
            {authUser && (
               <Link
                  to={`/${authUser.username}`}
                  as={RouterLink}
                  cursor="pointer"
               >
                  <Avatar
                     variant="roundedSquare"
                     size={"md"}
                     src={authUser?.profilePicURL || ""}
                     borderRadius="12px"
                  />
               </Link>
            )}
         </Box>
      </Flex>
   );
};

export default ProfileLink;
