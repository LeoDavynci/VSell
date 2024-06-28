import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   return (
      <>
         {/* Email */}

         <Input
            placeholder="Email"
            fontSize={14}
            type="email"
            borderColor="black"
            borderWidth="2px"
            borderRadius="10px"
            bg="white"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
         />

         {/* Password */}
         <InputGroup>
            <Input
               pr="4.5rem"
               type={show ? "text" : "password"}
               placeholder="Password"
               borderColor="black"
               borderWidth="2px"
               borderRadius="10px"
               bg="white"
               fontSize={14}
               value={inputs.password}
               onChange={(e) =>
                  setInputs({
                     ...inputs,
                     password: e.target.value,
                  })
               }
            />
            <InputRightElement width="4.5rem">
               <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  colorScheme="blackAlpha"
               >
                  {show ? "Hide" : "Show"}
               </Button>
            </InputRightElement>
         </InputGroup>

         {/* Log In */}
         <Button
            w={"full"}
            color="white"
            bg="black"
            colorScheme="black"
            size={"sm"}
            fontSize={14}
            borderRadius="10px"
         >
            Log in
         </Button>
      </>
   );
};

export default Login;
