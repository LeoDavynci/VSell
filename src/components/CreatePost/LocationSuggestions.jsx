import React, { useState } from "react";
import { Input, Box, Text } from "@chakra-ui/react";
import { fetchSuggestedLocations } from "../../utils/locationUtils";

const LocationSuggestions = ({ value, onChange }) => {
   const [suggestedLocations, setSuggestedLocations] = useState([]);

   const handleInputChange = (e) => {
      const newValue = e.target.value.slice(0, 20);
      onChange(newValue);
      if (newValue.length > 1) {
         const suggestions = fetchSuggestedLocations(newValue);
         setSuggestedLocations(suggestions);
      } else {
         setSuggestedLocations([]);
      }
   };

   return (
      <>
         <Text mt={2}>Pickup Location</Text>
         <Input
            value={value}
            onChange={handleInputChange}
            borderRadius={10}
            borderColor="#E6E6E6"
            borderWidth="2px"
         />
         {suggestedLocations.length > 0 && (
            <Box
               mt={2}
               borderWidth={1}
               borderRadius={15}
               maxH="200px"
               overflowY="auto"
            >
               {suggestedLocations.map((location, index) => (
                  <Box
                     key={index}
                     p={2}
                     _hover={{ bg: "gray.100" }}
                     cursor="pointer"
                     onClick={() => {
                        onChange(location);
                        setSuggestedLocations([]);
                     }}
                  >
                     {location}
                  </Box>
               ))}
            </Box>
         )}
      </>
   );
};

export default LocationSuggestions;
