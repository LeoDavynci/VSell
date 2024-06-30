import {
   Alert,
   AlertIcon,
   Button,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   const { loading, error, login } = useLogin();
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

         {error && (
            <Alert status="error" fontSize={13} p={2} borderRadius={4}>
               <AlertIcon fontSize={12} />
               {error.message}
            </Alert>
         )}

         {/* Log In */}
         <Button
            w={"full"}
            h={"2.25rem"}
            color="white"
            bg="black"
            size={"sm"}
            fontSize={16}
            borderRadius="10px"
            isLoading={loading}
            onClick={() => login(inputs)}
         >
            Log in
         </Button>
      </>
   );
};

export default Login;
