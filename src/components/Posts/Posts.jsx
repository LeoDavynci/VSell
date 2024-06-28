import { SimpleGrid } from "@chakra-ui/react";
import Post from "./Post";
import useWindowWidth from "./useWindowWidth";

const Posts = () => {
   const width = useWindowWidth();
   let columns;

   if (width >= 2021) {
      columns = 11;
   } else if (width >= 1791 && width <= 2020) {
      columns = 10;
   } else if (width >= 1561 && width <= 1790) {
      columns = 9;
   } else if (width >= 1461 && width <= 1560) {
      columns = 8;
   } else if (width >= 1231 && width <= 1460) {
      columns = 7;
   } else if (width >= 1061 && width <= 1230) {
      columns = 6;
   } else if (width >= 881 && width <= 1060) {
      columns = 5;
   } else if (width >= 701 && width <= 880) {
      columns = 4;
   } else if (width >= 531 && width <= 700) {
      columns = 3;
   } else if (width >= 360 && width <= 530) {
      columns = 2;
   } else {
      columns = 1;
   }

   return (
      <SimpleGrid columns={columns} spacing={2} justifyContent="center">
         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
            description="Durable, multipurpose trays ideal for organizing or serving. Various colors available."
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
            description="Adjustable, portable stand for comfortable viewing and typing. Compatible with most ipads."
         />
         <Post
            img="/img3.png"
            name="Brita"
            price="10"
            location="Rand"
            description="Water filtration pitcher for clean, great-tasting water. Reduces chlorine taste and odor."
         />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
            description="Charming mid-century designs. Solid wood construction with original upholstery. Perfect for adding character to any room."
         />
         <Post
            img="/img5.png"
            name="24' monitor"
            price=""
            location="Kissam"
            description="Pre-owned 24 inch computer display. Good condition, various sizes available. Perfect for home office or dual-screen setup."
         />
         <Post
            img="/img6.png"
            name="Treadmill"
            price="95"
            location="EBI"
            description="Home exercise equipment for walking or running indoors. Adjustable speed and incline. Foldable for easy storage."
         />

         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
            description="Durable, multipurpose trays ideal for organizing or serving. Various colors available."
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
            description="Adjustable, portable stand for comfortable viewing and typing. Compatible with most ipads."
         />
         <Post
            img="/img3.png"
            name="Brita"
            price="10"
            location="Rand"
            description="Water filtration pitcher for clean, great-tasting water. Reduces chlorine taste and odor."
         />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
            description="Charming mid-century designs. Solid wood construction with original upholstery. Perfect for adding character to any room."
         />
         <Post
            img="/img5.png"
            name="24' monitor"
            price=""
            location="Kissam"
            description="Pre-owned 24 inch computer display. Good condition, various sizes available. Perfect for home office or dual-screen setup."
         />
         <Post
            img="/img6.png"
            name="Treadmill"
            price="95"
            location="EBI"
            description="Home exercise equipment for walking or running indoors. Adjustable speed and incline. Foldable for easy storage."
         />
         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
            description="Durable, multipurpose trays ideal for organizing or serving. Various colors available."
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
            description="Adjustable, portable stand for comfortable viewing and typing. Compatible with most ipads."
         />
         <Post
            img="/img3.png"
            name="Brita"
            price="10"
            location="Rand"
            description="Water filtration pitcher for clean, great-tasting water. Reduces chlorine taste and odor."
         />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
            description="Charming mid-century designs. Solid wood construction with original upholstery. Perfect for adding character to any room."
         />
         <Post
            img="/img5.png"
            name="24' monitor"
            price=""
            location="Kissam"
            description="Pre-owned 24 inch computer display. Good condition, various sizes available. Perfect for home office or dual-screen setup."
         />
         <Post
            img="/img6.png"
            name="Treadmill"
            price="95"
            location="EBI"
            description="Home exercise equipment for walking or running indoors. Adjustable speed and incline. Foldable for easy storage."
         />
         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
            description="Durable, multipurpose trays ideal for organizing or serving. Various colors available."
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
            description="Adjustable, portable stand for comfortable viewing and typing. Compatible with most ipads."
         />
         <Post
            img="/img3.png"
            name="Brita"
            price="10"
            location="Rand"
            description="Water filtration pitcher for clean, great-tasting water. Reduces chlorine taste and odor."
         />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
            description="Charming mid-century designs. Solid wood construction with original upholstery. Perfect for adding character to any room."
         />
         <Post
            img="/img5.png"
            name="24' monitor"
            price=""
            location="Kissam"
            description="Pre-owned 24 inch computer display. Good condition, various sizes available. Perfect for home office or dual-screen setup."
         />
         <Post
            img="/img6.png"
            name="Treadmill"
            price="95"
            location="EBI"
            description="Home exercise equipment for walking or running indoors. Adjustable speed and incline. Foldable for easy storage."
         />
      </SimpleGrid>
   );
};

export default Posts;
