import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();

   return (
      <Flex direction="column" h="100vh">
         {/* Sticky Sidebar */}
         {pathname !== "/auth" && (
            <Box
               position="sticky"
               top={0}
               zIndex={1000}
               bg="white" // Add a background color if needed
               boxShadow="md" // Optional: adds a shadow for visual separation
            >
               <Sidebar />
            </Box>
         )}

         {/* Page Content */}
         <Box flex={1} w="100%" bg="white">
            {children}
         </Box>
      </Flex>
   );
};

export default PageLayout;
