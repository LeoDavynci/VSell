import { Box } from "@chakra-ui/react";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
   return (
      <Box width="100%" height="70px" position={"sticky"} bg={"#79A88E"}>
         <SidebarItems />
      </Box>
   );
};

export default Sidebar;
