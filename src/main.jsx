import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/outfit";

const styles = {
   global: (props) => ({
      body: {
         bg: mode("linear-gradient(to right, #79A88E, #79A88E)")(props),
         color: mode("gray.800", "whiteAlpha.900")(props),
         fontFamily: "Outfit, sans-serif",
      },
   }),
};
const config = {
   initialColorMode: "light",
   useSystemColorMode: false,
};

const colors = {
   main: {
      100: "#FAFAFA",
      200: "#EBEBEB",
   },
   primary: {
      100: "#79A88E",
      200: "#A2C0B0",
   },
   secondary: {
      100: "#716FE9",
      200: "#A5A4F8",
   },
};

const fonts = {
   body: "Roboto, sans-serif", // Apply the font to body
   heading: "Roboto, sans-serif", // Apply the font to headings
};

const theme = extendTheme({
   config,
   styles,
   colors,
   fonts,
});

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <ChakraProvider theme={theme}>
            <App />
         </ChakraProvider>
      </BrowserRouter>
   </React.StrictMode>
);
