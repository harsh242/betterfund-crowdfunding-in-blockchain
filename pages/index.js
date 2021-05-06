import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Box,
  Divider,
  Center,
  Img,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";

import { FaDonate } from "react-icons/fa";
const data = {
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Crypto Covid Fund",
  description:
    "A campaign by Indian Crypto Community to raise money for Covid Issues",
  id: "0x5d7676dB6119Ed1F6C696419058310D16a734dA9",
};

function CampaignCard() {
  return (
    <Flex w="max" alignItems="center" justifyContent="center" cursor="pointer">
      <NextLink href="/campaign/1">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW={{ base: "xs", md: "sm" }}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Img
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
          />

          <Box p="6">
            <Flex
              mt="1"
              justifyContent="space-between"
              alignContent="center"
              py={2}
            >
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {data.name}
              </Box>

              <Tooltip
                label="Contribute"
                bg={useColorModeValue("white", "gray.700")}
                placement={"top"}
                color={useColorModeValue("gray.800", "white")}
                fontSize={"1.2em"}
              >
                <chakra.a display={"flex"}>
                  <Icon
                    as={FaDonate}
                    h={7}
                    w={7}
                    alignSelf={"center"}
                    color={"teal.400"}
                  />{" "}
                </chakra.a>
              </Tooltip>
            </Flex>
            <Flex justifyContent="space-between" alignContent="center" py={2}>
              <Text color={"gray.500"}>{data.description}</Text>{" "}
            </Flex>
            <Flex alignContent="center" py={4}>
              {" "}
              <Text color={"gray.500"} pr={2}>
                by
              </Text>{" "}
              <Heading size="base" isTruncated>
                {data.id}
              </Heading>
            </Flex>
          </Box>
        </Box>
      </NextLink>
    </Flex>
  );
}

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
        <Container p={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          {" "}
          <Heading
            textAlign={useBreakpointValue({ base: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            as="h1"
            py={4}
          >
            Crowdfunding using the powers of Crypto & Blockchain 😄{" "}
          </Heading>
          <Button
            display={{ sm: "inline-flex" }}
            fontSize={"md"}
            fontWeight={600}
            color={"white"}
            bg={"teal.400"}
            href={"#"}
            _hover={{
              bg: "teal.300",
            }}
          >
            <NextLink href="/campaign/new">Create Campaign</NextLink>
          </Button>
        </Container>
        <Container p={{ base: "4", md: "12" }} maxW={"7xl"}>
          <Heading as="h2" size="lg">
            Open Campaigns 👇
          </Heading>
          <Divider marginTop="4" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
            <CampaignCard />
          </SimpleGrid>
        </Container>
      </main>
    </div>
  );
}
