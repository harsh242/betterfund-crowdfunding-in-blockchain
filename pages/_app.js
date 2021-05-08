import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

import "@fontsource/space-grotesk";
import "@fontsource/space-grotesk.css";

const theme = extendTheme({
  fonts: {
    heading: "Space Grotesk",
    body: "Space Grotesk",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {" "}
      <ChakraProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
