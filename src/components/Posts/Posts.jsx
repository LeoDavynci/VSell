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
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
         />
         <Post img="/img3.png" name="Brita" price="10" location="Rand" />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
         />
         <Post img="/img5.png" name="24' monitor" price="" location="Kissam" />
         <Post img="/img6.png" name="Treadmill" price="95" location="EBI" />

         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
         />
         <Post img="/img3.png" name="Brita" price="10" location="Rand" />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
         />
         <Post img="/img5.png" name="24' monitor" price="" location="Kissam" />
         <Post img="/img6.png" name="Treadmill" price="95" location="EBI" />
         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
         />
         <Post img="/img3.png" name="Brita" price="10" location="Rand" />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
         />
         <Post img="/img5.png" name="24' monitor" price="" location="Kissam" />
         <Post img="/img6.png" name="Treadmill" price="95" location="EBI" />
         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
         />
         <Post img="/img3.png" name="Brita" price="10" location="Rand" />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
         />
         <Post img="/img5.png" name="24' monitor" price="" location="Kissam" />
         <Post img="/img6.png" name="Treadmill" price="95" location="EBI" />
         <Post
            img="/img1.png"
            name="Plastic Trays"
            price="50"
            location="Zeppos Tower"
         />
         <Post
            img="/img2.png"
            name="iPad Stand"
            price=""
            location="Zeppos Tower"
         />
         <Post img="/img3.png" name="Brita" price="10" location="Rand" />
         <Post
            img="/img4.png"
            name="Vintage Chairs"
            price="20"
            location="Sutherland House"
         />
         <Post img="/img5.png" name="24' monitor" price="" location="Kissam" />
         <Post img="/img6.png" name="Treadmill" price="95" location="EBI" />
      </SimpleGrid>
   );
};

export default Posts;
