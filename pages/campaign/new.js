import React, { useState } from "react";
import Head from "next/head";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightAddon,
  InputGroup,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import factory from "../../smart-contract/factory";
import web3 from "../../smart-contract/web3";

import { useRouter } from "next/router";
import { useWallet } from "use-wallet";

export default function NewCampaign() {
  const { handleSubmit, errors, register, formState } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const wallet = useWallet();

  async function onSubmit(data) {
    console.log(
      data.minimumContribution,
      data.campaignName,
      data.description,
      data.imageUrl,
      data.target
    );
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          data.minimumContribution,
          data.campaignName,
          data.description,
          data.imageUrl,
          data.target
        )
        .send({
          from: accounts[0],
        });

      router.push("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="minimumContribution">
                  <FormLabel>Minimum Contribution</FormLabel>
                  <InputGroup>
                    {" "}
                    <Input
                      type="number"
                      {...register("minimumContribution")}
                    />{" "}
                    <InputRightAddon children="WEI" />
                  </InputGroup>
                </FormControl>
                <FormControl id="campaignName">
                  <FormLabel>Campaign Name</FormLabel>
                  <Input {...register("campaignName")} />
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Campaign Description</FormLabel>
                  <Input {...register("description")} />
                </FormControl>
                <FormControl id="imageUrl">
                  <FormLabel>Image URL</FormLabel>
                  <Input {...register("imageUrl")} />
                </FormControl>
                <FormControl id="target">
                  <FormLabel>Target</FormLabel>
                  <InputGroup>
                    <Input type="number" {...register("target")} />
                    <InputRightAddon children="WEI" />
                  </InputGroup>
                </FormControl>

                {error ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}> {error}</AlertDescription>
                  </Alert>
                ) : null}

                <Stack spacing={10}>
                  {wallet.status === "connected" ? (
                    <Button
                      bg={"teal.400"}
                      color={"white"}
                      _hover={{
                        bg: "teal.500",
                      }}
                      isLoading={formState.isSubmitting}
                      type="submit"
                    >
                      Create
                    </Button>
                  ) : (
                    <Stack spacing={3}>
                      <Button
                        color={"white"}
                        bg={"teal.400"}
                        _hover={{
                          bg: "teal.300",
                        }}
                        onClick={() => wallet.connect()}
                      >
                        Connect Wallet{" "}
                      </Button>
                      <Alert status="warning">
                        <AlertIcon />
                        <AlertDescription mr={2}>
                          Please Connect Your Wallet to Create a Campaign
                        </AlertDescription>
                      </Alert>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </main>
    </div>
  );
}
