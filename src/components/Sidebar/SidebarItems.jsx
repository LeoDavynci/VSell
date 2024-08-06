import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import CreatePost from "./CreatePost";
import {
   Flex,
   Box,
   Input,
   IconButton,
   useMediaQuery,
   Button,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Checkbox,
   Wrap,
   WrapItem,
   Tag,
   TagLabel,
} from "@chakra-ui/react";
import Messages from "./Messages";
import Search from "./Search";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { SearchContext } from "../../store/searchContext";
import { IoSearchCircle } from "react-icons/io5";
import useAuthStore from "../../store/authStore";
import { FaFilter } from "react-icons/fa";

const SidebarItems = () => {
   const authUser = useAuthStore((state) => state.user);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchInputValue, setSearchInputValue] = useState("");
   const location = useLocation();
   const [isMobile] = useMediaQuery("(max-width: 768px)");
   const { setSearchTerm } = useContext(SearchContext);
   const navigate = useNavigate();

   const redirectToLogin = () => {
      navigate("/auth");
   };

   const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
      if (isSearchOpen) {
         clearSearch();
      }
   };

   const clearSearch = () => {
      setSearchInputValue("");
      setSearchTerm("");
      setIsSearchOpen(false);
   };

   const handleSearchChange = (e) => {
      setSearchInputValue(e.target.value);
   };

   const handleSearchSubmit = () => {
      setSearchTerm(searchInputValue);
   };

   const [showCategories, setShowCategories] = useState(false);
   const { filteredCategories, setFilteredCategories } =
      useContext(SearchContext);

   const categoryOptions = [
      { value: "All", label: "All" },
      { value: "Misc", label: "Misc" },
      { value: "Course Materials", label: "Course Materials" },
      { value: "Electronics", label: "Electronics" },
      { value: "Dorm Essentials", label: "Dorm Essentials" },
      { value: "Office Supplies", label: "School Supplies" },
      { value: "Furniture", label: "Furniture" },
      { value: "Clothing & Accessories", label: "Clothing & Accessories" },
      { value: "Vehicles", label: "Vehicles" },
      { value: "Fitness Equipment", label: "Fitness Equipment" },
      { value: "Entertainment", label: "Entertainment" },
      { value: "Kitchen & Dining", label: "Kitchen & Dining" },
      { value: "Event Tickets", label: "Event Tickets" },
      { value: "Books", label: "Books" },
      { value: "Beauty & Personal Care", label: "Beauty & Personal Care" },
      { value: "Collectibles & Art", label: "Collectibles & Art" },
   ];

   const toggleCategories = () => {
      setShowCategories(!showCategories);
   };

   const handleCategoryChange = (category) => {
      if (category === "All") {
         setFilteredCategories(["All"]);
      } else {
         setFilteredCategories((prev) => {
            const newCategories = prev.includes(category)
               ? prev.filter((c) => c !== category)
               : [...prev.filter((c) => c !== "All"), category];
            return newCategories.length === 0 ? ["All"] : newCategories;
         });
      }
   };

   return (
      <Flex flexDirection="column" height={"100%"} boxShadow="lg" rounded={20}>
         <Flex
            justifyContent="space-between"
            flexDirection={isSearchOpen ? "column" : "row"}
            h={"100%"}
         >
            {!isSearchOpen && (
               <Flex
                  h={"100%"}
                  w={"100%"}
                  flexDir={"row"}
                  justify={"space-between"}
               >
                  <Flex justifyContent="center" alignItems="center" pl={3}>
                     <Home />
                  </Flex>

                  <Flex
                     w={isMobile ? "100%" : "auto"}
                     paddingX={2}
                     justifyContent="end"
                     alignItems="center"
                  >
                     {location.pathname === "/" && (
                        <Box onClick={toggleSearch}>
                           <Search />
                        </Box>
                     )}
                     <Messages />
                     <CreatePost />
                     {authUser && <ProfileLink />}
                     {!authUser && (
                        <Button
                           bg={"#716FE9"}
                           _hover={{ bg: "#A2C0B0" }}
                           variant="solid"
                           color={"white"}
                           size={"lg"}
                           borderRadius={15}
                           w={"70px"}
                           onClick={redirectToLogin}
                           ml={1}
                        >
                           Login
                        </Button>
                     )}
                  </Flex>
               </Flex>
            )}

            {/* Search Functionality */}
            {isSearchOpen && (
               <Flex
                  flexDir={"column"}
                  height={"100%"}
                  w={"100%"}
                  bg={"#79A88E"}
                  rounded={showCategories ? 0 : 20}
                  roundedTop={20}
               >
                  <Flex
                     width="100%"
                     height="100%"
                     padding={2}
                     alignItems="center"
                     justifyContent="center"
                     gap={2}
                  >
                     <IconButton
                        bg={"none"}
                        icon={<CloseIcon color={"white"} size={30} />}
                        onClick={clearSearch}
                        _hover={{ bg: "#5C7F6C" }}
                        h={"40px"}
                        w={"40px"}
                        rounded={12}
                     />
                     <Input
                        rounded={12}
                        flex={1}
                        bg={"#719C83"}
                        border={"none"}
                        color={"white"}
                        h={"50px"}
                        value={searchInputValue}
                        onChange={handleSearchChange}
                     />
                     <IconButton
                        bg={"#719C83"}
                        icon={<IoSearchCircle color="white" size={35} />}
                        onClick={handleSearchSubmit}
                        h={"50px"}
                        w={"50px"}
                        rounded={12}
                        _hover={{ bg: "#5C7F6C" }}
                     />
                     <IconButton
                        bg="#719C83"
                        icon={<FaFilter color="white" size={20} />}
                        onClick={toggleCategories}
                        h="50px"
                        w="50px"
                        rounded={12}
                        _hover={{ bg: "#5C7F6C" }}
                     />
                  </Flex>
                  {showCategories && (
                     <Box
                        bg="#79A88E"
                        px={2}
                        pb={2}
                        roundedBottom={20}
                        boxShadow={"xl"}
                     >
                        <Wrap spacing={2}>
                           {categoryOptions.map((category) => (
                              <WrapItem key={category.value}>
                                 <Tag
                                    rounded={12}
                                    size="lg"
                                    bg={
                                       filteredCategories.includes(
                                          category.value
                                       )
                                          ? "#5C7F6C"
                                          : "#719C83"
                                    }
                                    color={
                                       filteredCategories.includes(
                                          category.value
                                       )
                                          ? "white"
                                          : "black"
                                    }
                                    cursor="pointer"
                                    onClick={() =>
                                       handleCategoryChange(category.value)
                                    }
                                    _hover={{
                                       bg: filteredCategories.includes(
                                          category.value
                                       )
                                          ? "#5C7F6C"
                                          : "#5C7F6C",
                                    }}
                                    transition="all 0.2s"
                                 >
                                    <TagLabel>{category.label}</TagLabel>
                                 </Tag>
                              </WrapItem>
                           ))}
                        </Wrap>
                     </Box>
                  )}
               </Flex>
            )}
         </Flex>
      </Flex>
   );
};

export default SidebarItems;
