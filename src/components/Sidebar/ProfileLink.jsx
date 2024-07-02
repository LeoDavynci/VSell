import { Avatar, Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
   const authUser = useAuthStore((state) => state.user);
   return (
      <Flex width={"70px"} height={"70px"} align={"center"} justify={"center"}>
         <Box>
            {authUser && (
               <Link
                  to={`/${authUser.username}`}
                  as={RouterLink}
                  cursor="pointer"
               >
                  <Avatar size="md" src={authUser?.profilePicURL || ""} />
               </Link>
            )}
         </Box>
      </Flex>
   );
};

export default ProfileLink;
