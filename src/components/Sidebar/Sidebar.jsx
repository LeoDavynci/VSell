import React from "react";
import { Box } from "@chakra-ui/react";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
   return (
      <Box
         position="fixed"
         top={0}
         left={0}
         right={0}
         height="70px"
         zIndex={1000}
         p={2}
         bg={"white"}
      >
         <Box bg="#79A88E" rounded={20} boxShadow="lg" height={"66px"}>
            <SidebarItems />
         </Box>
      </Box>
   );
};

export default Sidebar;
