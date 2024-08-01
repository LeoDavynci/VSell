import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";

const SwipeableGallery = ({ images, currentIndex, setCurrentIndex }) => {
   const [offset, setOffset] = useState(0);

   const handlers = useSwipeable({
      onSwiping: (eventData) => {
         const newOffset = eventData.deltaX;
         setOffset(newOffset);
      },
      onSwipedLeft: () => {
         if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
         }
         setOffset(0);
      },
      onSwipedRight: () => {
         if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
         }
         setOffset(0);
      },
      onSwipedDown: () => setOffset(0),
      onSwipedUp: () => setOffset(0),
      trackMouse: true,
      trackTouch: true,
   });

   useEffect(() => {
      setOffset(0);
   }, [currentIndex]);

   return (
      <Box {...handlers}>
         {images.map((src, index) => (
            <Image
               key={index}
               src={src}
               position="absolute"
               top="0"
               left="0"
               width="100%"
               height="100%"
               objectFit="cover"
               transform={`translateX(${
                  (index - currentIndex) * 100 +
                  (index === currentIndex ? offset / 5 : 0)
               }%)`}
               transition="transform 0.3s ease-out"
               opacity={index === currentIndex ? 1 : 0.5}
            />
         ))}
      </Box>
   );
};

export default SwipeableGallery;
