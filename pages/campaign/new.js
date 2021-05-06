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
export default function New() {
  return (
    <div>
      <Head>
        <title>New Campaign</title>
        <meta name="description" content="Create New Campaign" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon />
            <NextLink href="/"> Back to Home</NextLink>
          </Text>
          <Stack>
            <Heading fontSize={"4xl"}>Create a New Campaign 📢</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="min-contri">
                <FormLabel>Minimum Contribution</FormLabel>
                <InputGroup>
                  {" "}
                  <Input type="number" /> <InputRightAddon children="WEI" />
                </InputGroup>
              </FormControl>
              <FormControl id="campaign-name">
                <FormLabel>Campaign Name</FormLabel>
                <Input />
              </FormControl>
              <FormControl id="campaign-description">
                <FormLabel>Campaign Description</FormLabel>
                <Input />
              </FormControl>
              <FormControl id="image-url">
                <FormLabel>Image URL</FormLabel>
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
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </main>
    </div>
  );
}
