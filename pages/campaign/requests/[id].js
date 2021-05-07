import React from "react";
import Head from "next/head";
import NextLink from "next/link";

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
  Spacer,
} from "@chakra-ui/react";

export default function Requests() {
  return (
    <div>
      <Head>
        <title>Campaign Withdrawal Requests</title>
        <meta name="description" content="Create a Withdrawal Request" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {" "}
        <Container p={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box p="4">
              <Heading
                textAlign={useBreakpointValue({ base: "left" })}
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
                as="h3"
              >
                Withdrawal Requests
              </Heading>
            </Box>
            <Spacer />
            <Box p="4">
              {" "}
              <Button
                display={{ sm: "inline-flex" }}
                justify={"flex-end"}
                fontSize={"md"}
                fontWeight={600}
                color={"white"}
                bg={"teal.400"}
                href={"#"}
                _hover={{
                  bg: "teal.300",
                }}
              >
                <NextLink href="/campaign/requests/new">
                  Add Withdrawal Request
                </NextLink>
              </Button>
            </Box>
          </Flex>{" "}
        </Container>
      </main>
    </div>
  );
}
