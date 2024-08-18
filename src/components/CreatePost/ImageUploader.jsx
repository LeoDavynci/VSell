import React, { useRef } from "react";
import { Button, Flex, Input, Box, Image, CloseButton } from "@chakra-ui/react";

const ImageUploader = ({ selectedFiles, onChange }) => {
   const imageRef = useRef(null);

   const handleImageChange = (event) => {
      const files = event.target.files;
      if (files.length + selectedFiles.length > 4) {
         // Show error (you might want to use a toast here)
         return;
      }

      const newFiles = Array.from(files).map((file) =>
         URL.createObjectURL(file)
      );
      onChange([...selectedFiles, ...newFiles]);
   };

   return (
      <Flex flexDir={"column"}>
         <Input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
            multiple
            accept="image/*"
         />
         <Button
            mt={4}
            borderRadius={10}
            onClick={() => imageRef.current.click()}
         >
            Upload Photo {"(up to 4)"}
         </Button>
         {selectedFiles.length > 0 && (
            <Flex mt={5} w={"full"} flexWrap="wrap" justifyContent={"center"}>
               {selectedFiles.map((file, index) => (
                  <Box key={index} position="relative" m={2}>
                     <Image
                        borderRadius={15}
                        src={file}
                        alt={`Image ${index + 1}`}
                        maxH="200px"
                        maxW="200px"
                     />
                     <CloseButton
                        position={"absolute"}
                        top={2}
                        right={2}
                        onClick={() => {
                           const newFiles = selectedFiles.filter(
                              (_, i) => i !== index
                           );
                           onChange(newFiles);
                        }}
                     />
                  </Box>
               ))}
            </Flex>
         )}
      </Flex>
   );
};

export default ImageUploader;
