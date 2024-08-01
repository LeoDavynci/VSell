import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();

   return (
      <Flex direction="column" minHeight="100vh">
         {pathname !== "/auth" && pathname !== "/forgot-password" && (
            <Sidebar />
         )}
         <Box flex={1} w="100%" bg="white">
            {children}
            <Analytics />
            <SpeedInsights />
         </Box>
      </Flex>
   );
};

export default PageLayout;
