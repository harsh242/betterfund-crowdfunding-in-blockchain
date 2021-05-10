import Head from "next/head";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
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
import { useWallet } from "use-wallet";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import web3 from "../../../../smart-contract/web3";
import Campaign from "../../../../smart-contract/campaign";

export default function NewRequest() {
  const router = useRouter();
  const { id } = router.query;
  const { handleSubmit, errors, register, formState } = useForm();
  const [error, setError] = useState("");
  const wallet = useWallet();

  async function onSubmit(data) {
    console.log(data);
    const campaign = Campaign(id);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(data.description, web3.utils.toWei(data.value, "ether"), data.recipient)
        .send({ from: accounts[0] });

      router.push(`/campaign/${id}/requests`);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="description">
                  <FormLabel>Request Description</FormLabel>
                  <Input {...register("description")} />
                </FormControl>
                <FormControl id="value">
                  <FormLabel>Amount in Ether</FormLabel>
                  <InputGroup>
                    {" "}
                    <Input type="number" {...register("value")} />{" "}
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                </FormControl>

                <FormControl id="recipient">
                  <FormLabel>Recipient Ethereum Wallet Address</FormLabel>
                  <Input {...register("recipient")} />
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
                      Create Withdrawal Request
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
                          Please Connect Your Wallet First to Create a Campaign
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
