import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();

   return (
      <Flex direction="column" minHeight="100vh">
         {pathname !== "/auth" &&
            pathname !== "/forgot-password" &&
            pathname !== "/welcome" && <Sidebar />}
         <Box flex={1} w="100%" bg="white">
            {children}
            <Analytics />
         </Box>
      </Flex>
   );
};

export default PageLayout;
