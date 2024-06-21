import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();

   return (
      <Flex direction="column" h="100vh">
         {/* Top Bar */}

         {pathname !== "/auth" ? (
            <Box h="70px">
               <Sidebar />
            </Box>
         ) : null}

         {/* Page Content */}
         <Box flex={1} h="calc(100% - 50px)" w={"100%"} bg={"white"}>
            {children}
         </Box>
      </Flex>
   );
};

export default PageLayout;
