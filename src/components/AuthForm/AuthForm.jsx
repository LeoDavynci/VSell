import { Box, Button, Flex, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"
import React, { useState } from "react"

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

  return <>
      <Box border={"1px solid white"} padding={5}>
          <VStack spacing={4}>
              
              <Box border={"1px solid white"} borderRadius={4} padding={5}>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                      <Box mx={2} fontSize={14}>
                          {isLogin ? "Don't have an account?": "Already have an account?"}
                      </Box>
                      <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                          {isLogin ? "Sign up": "Log in"}
                      </Box>
                  </Flex>
            </Box>

              {!isLogin ? (
                <Input
                  placeholder="Name"
                  fontSize={14}
                  type="username"
              />
              ) : null }

              <Input
                  placeholder="Email"
                  fontSize={14}
                  type="email"
              />
              
              <InputGroup>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                  />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick} colorScheme="blackAlpha" color="white">
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
              </InputGroup>


              {!isLogin ? (
                  <Input
                      placeholder="Confirm Password"
                      fontSize={14}
                      type="password"
                  />
              ) : null}

              <Button w={"full"} colorScheme="black" size={"sm"} fontSize={14}>
                  {isLogin? "Log in" : "Sign Up" }
              </Button>
          
      </VStack>
    </Box >
</>
}

export default AuthForm