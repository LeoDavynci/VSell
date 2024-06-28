import {
   Alert,
   AlertIcon,
   Button,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);
   const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
   });

   const { loading, error, signup } = useSignUpWithEmailAndPassword();

   return (
      <>
         {/* Name */}
         <Input
            placeholder="Name"
            fontSize={14}
            type="text"
            borderColor="black"
            borderWidth="2px"
            borderRadius="10px"
            bg="white"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
         />

         {/* Username */}
         <Input
            placeholder="Username"
            fontSize={14}
            type="text"
            borderColor="black"
            borderWidth="2px"
            borderRadius="10px"
            bg="white"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
         />

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
               placeholder="password"
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

         {error && (
            <Alert status="error" fontSize={13} p={2} borderRadius={4}>
               <AlertIcon fontSize={12} />
               {error.message}
            </Alert>
         )}

         {/* Sign Up */}
         <Button
            w={"full"}
            color="white"
            bg="black"
            colorScheme="black"
            size={"sm"}
            fontSize={14}
            borderRadius="10px"
            isLoading={loading}
            onClick={() => signup(inputs)}
         >
            Sign Up
         </Button>
      </>
   );
};

export default Signup;
