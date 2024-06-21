import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, Heading, Text } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/outfit/100.css";
import "@fontsource/outfit/200.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/outfit/900.css";

const styles = {
   global: (props) => ({
      body: {
         bg: mode("linear-gradient(to right, #5E2BFF, #FC6DAB)")(props),
         color: mode("gray.800", "whiteAlpha.900")(props),
      },
   }),
};
const config = {
   initialColorMode: "light",
   useSystemColorMode: false,
};

const fonts = {
   heading: `'outfit', sans-serif`,
   body: `'outfit', sans-serif`,
   mono: `'outfit', sans-serif`,
};

const theme = extendTheme({
   config,
   styles,
   fonts,
});

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <ChakraProvider theme={theme}>
            <Heading>$$$$$$$</Heading>
            <Text>$$$$$$$$$$$$$$$$$$</Text>
            <App />
         </ChakraProvider>
      </BrowserRouter>
   </React.StrictMode>
);
