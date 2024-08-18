import React from "react";
import {
   InputGroup,
   InputLeftElement,
   Input,
   Flex,
   Checkbox,
   Text,
   Tooltip,
} from "@chakra-ui/react";

const PriceInput = ({ price, isOBO, handleInputChange }) => {
   return (
      <Flex flexDir={"row"} w={"full"}>
         <Flex flexDir={"column"} w={"full"}>
            <Text mt={2}>Price</Text>
            <InputGroup width="full">
               <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
               >
                  $
               </InputLeftElement>
               <Input
                  w={"full"}
                  value={price}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                        const numValue = parseFloat(value);
                        if (
                           !isNaN(numValue) &&
                           numValue >= 0 &&
                           numValue <= 9999.99
                        ) {
                           handleInputChange("price", value);
                        }
                     }
                  }}
                  onBlur={() => {
                     if (price !== "") {
                        handleInputChange(
                           "price",
                           parseFloat(price).toFixed(2)
                        );
                     }
                  }}
                  inputMode="decimal"
                  borderRadius={10}
                  borderColor="#E6E6E6"
                  borderWidth="2px"
               />
            </InputGroup>
         </Flex>
         <Flex flexDir={"column"} justify={"center"} pb={2} pr={4} pl={2}>
            <Tooltip label="Or Best Offer" borderRadius={50} top={-15}>
               <Text>OBO</Text>
            </Tooltip>
            <Checkbox
               pt={2}
               colorScheme={"green"}
               color={"#79A88E"}
               ml={4}
               isChecked={isOBO}
               onChange={(e) => handleInputChange("isOBO", e.target.checked)}
            />
         </Flex>
      </Flex>
   );
};

export default PriceInput;
