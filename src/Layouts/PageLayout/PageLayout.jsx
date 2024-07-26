import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();

   return (
      <Flex direction="column" minHeight="100vh">
         {pathname !== "/auth" && <Sidebar />}
         <Box paddingTop="70px" flex={1} w="100%" bg="white">
            {children}
         </Box>
      </Flex>
   );
};

export default PageLayout;
