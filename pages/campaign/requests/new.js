import React from "react";
import Head from "next/head";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function NewRequest() {
  return (
    <div>
      <Head>
        <title>Create a Withdrawal Request</title>
        <meta name="description" content="Create a Withdrawal Request" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon />
            <NextLink href="/"> Back to Requests</NextLink>
          </Text>
          <Stack>
            <Heading fontSize={"4xl"}>Create a Withdrawal Request 💸</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="req-description">
                <FormLabel>Request Description</FormLabel>
                <Input />
              </FormControl>
              <FormControl id="min-contri">
                <FormLabel>Amount in Ether</FormLabel>
                <InputGroup>
                  {" "}
                  <Input type="number" /> <InputRightAddon children="ETH" />
                </InputGroup>
              </FormControl>

              <FormControl id="recipient-wallet-address">
                <FormLabel>Recipient Wallet Address</FormLabel>
                <Input />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                >
                  Create Withdrawal Request
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </main>
    </div>
  );
}
