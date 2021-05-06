import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>BetterFund</title>
        <meta
          name="description"
          content="Transparent Crowdfunding in Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Heading
          textAlign={useBreakpointValue({ base: "center" })}
          fontFamily={"heading"}
          color={useColorModeValue("gray.800", "white")}
          as="h1"
          size="lg"
          py={4}
        >
          Crowdfunding using the powers of Crypto & Blockchain 😄{" "}
        </Heading>

        <Image src="/static/tenor.gif" alt="loading" width="400" height="400" />
      </main>
    </div>
  );
}
