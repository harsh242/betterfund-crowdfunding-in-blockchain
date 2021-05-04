import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {" "}
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
