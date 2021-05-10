import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useWallet } from "use-wallet";
import { useForm } from "react-hook-form";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  InputRightAddon,
  InputGroup,
  FormControl,
  FormLabel,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Tooltip,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import NextLink from "next/link";

import web3 from "../../smart-contract/web3";
import Campaign from "../../smart-contract/campaign";
import factory from "../../smart-contract/factory";

export async function getStaticPaths() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  console.log(campaigns);
  const paths = campaigns.map((campaign, i) => ({
    params: { id: campaigns[i] },
  }));
  console.log("paths", paths);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const campaignId = params.id;
  const campaign = Campaign(campaignId);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      campaignId,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      name: summary[5],
      description: summary[6],
      image: summary[7],
      target: summary[8],
    },
  };
}

// export async function getServerSideProps(context) {
//   const campaignId = context.params.id;

//   return { props: { campaignId } };
// }

function StatsCard(props) {
  const { title, stat, info } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"sm"}
      border={"1px solid"}
      borderColor={"gray.500"}
      rounded={"lg"}
      transition={"transform 0.3s ease"}
      _hover={{
        transform: "translateY(-5px)",
      }}
    >
      <Tooltip
        label={info}
        bg={useColorModeValue("white", "gray.700")}
        placement={"top"}
        color={useColorModeValue("gray.800", "white")}
        fontSize={"1em"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber
              fontSize={"base"}
              fontWeight={"bold"}
              isTruncated
              maxW={{ base: "	10rem", sm: "sm" }}
            >
              {stat}
            </StatNumber>
          </Box>
          {/* <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box> */}
        </Flex>
      </Tooltip>
    </Stat>
  );
}

export default function CampaignSingle({
  campaignId,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
  name,
  description,
  image,
  target,
}) {
  const { handleSubmit, errors, register, formState } = useForm();
  const [error, setError] = useState("");
  const wallet = useWallet();

  async function onSubmit(data) {
    console.log(data);
    try {
      const campaign = Campaign(campaignId);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contibute().send({
        from: accounts[0],
        value: web3.utils.toWei(data.value, "ether"),
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
        <title>Campaign Details</title>
        <meta name="description" content="Create a Withdrawal Request" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {" "}
        <Box position={"relative"}>
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: 6 }}
          >
            <Stack spacing={{ base: 6 }}>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              >
                {name}
              </Heading>
              <Text
                color={useColorModeValue("gray.500", "gray.200")}
                fontSize={{ base: "lg" }}
              >
                {description}
              </Text>
              <Box mx={"auto"} w={"full"}>
                <SimpleGrid columns={{ base: 1 }} spacing={{ base: 5 }}>
                  <StatsCard
                    title={"Minimum Contribution in Wei"}
                    stat={minimumContribution}
                    info={
                      "You must contribute at least this much in Wei ( 1 ETH = 10 ^ 18 Wei) to become an approver"
                    }
                  />
                  <StatsCard
                    title={"Wallet Address of Campaign Creator"}
                    stat={manager}
                    info={
                      "The Campaign Creator created the campaign and can create requests to withdraw money."
                    }
                  />
                  <StatsCard
                    title={"Number of Requests"}
                    stat={requestsCount}
                    info={
                      "A request tries to withdraw money from the contract. Requests must be approved by approvers"
                    }
                  />
                  <StatsCard
                    title={"Number of Approvers"}
                    stat={approversCount}
                    info={
                      "Number of people who have already donated to this campaign"
                    }
                  />
                </SimpleGrid>
              </Box>
            </Stack>
            <Stack maxW={{ lg: "lg" }} spacing={{ base: 4 }}>
              <Stat
                bg={useColorModeValue("teal.50", "teal.700")}
                boxShadow={"lg"}
                rounded={"xl"}
                p={{ base: 4, sm: 6, md: 8 }}
                spacing={{ base: 8 }}
              >
                <StatLabel fontWeight={"medium"} isTruncated>
                  Campaign Balance (Ether)
                </StatLabel>
                <StatNumber
                  fontSize={"xl"}
                  fontWeight={"bold"}
                  isTruncated
                  maxW={{ base: "	10rem", sm: "sm" }}
                >
                  {balance > 0
                    ? web3.utils.fromWei(balance, "ether")
                    : "0, Become our First Donor 😄"}
                </StatNumber>
                <Text fontSize={"sm"} mt={"2"}>
                  * The balance is how much money this campaign has left to
                  spend.
                </Text>
              </Stat>

              <Stack
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                rounded={"xl"}
                p={{ base: 4, sm: 6, md: 8 }}
                spacing={{ base: 6 }}
              >
                <Stack spacing={4}>
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    color={useColorModeValue("teal.600", "teal.400")}
                  >
                    Contribute Now!
                  </Heading>
                </Stack>
                <Box mt={10}>
                  <Stack spacing={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl id="value">
                        <FormLabel>
                          Amount in Ether you want to contribute
                        </FormLabel>
                        <InputGroup>
                          {" "}
                          <Input {...register("value")} />{" "}
                          <InputRightAddon children="ETH" />
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
                            fontFamily={"heading"}
                            mt={4}
                            w={"full"}
                            bgGradient="linear(to-r, teal.400,green.400)"
                            color={"white"}
                            _hover={{
                              bgGradient: "linear(to-r, teal.400,blue.400)",
                              boxShadow: "xl",
                            }}
                            isLoading={formState.isSubmitting}
                            type="submit"
                          >
                            Contribute
                          </Button>
                        ) : (
                          <Alert status="warning" mt={4}>
                            <AlertIcon />
                            <AlertDescription mr={2}>
                              Please Connect Your Wallet to Contribute
                            </AlertDescription>
                          </Alert>
                        )}
                      </Stack>
                    </form>
                  </Stack>
                </Box>
              </Stack>

              <Stack
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                rounded={"xl"}
                p={{ base: 4, sm: 6, md: 8 }}
                spacing={{ base: 8 }}
              >
                <Stack spacing={4}>
                  <Button
                    fontFamily={"heading"}
                    w={"full"}
                    bgGradient="linear(to-r, teal.400,green.400)"
                    color={"white"}
                    _hover={{
                      bgGradient: "linear(to-r, teal.400,blue.400)",
                      boxShadow: "xl",
                    }}
                  >
                    <NextLink href={`/campaign/${campaignId}/requests`}>
                      View Withdrawal Requests
                    </NextLink>
                  </Button>
                  <Text fontSize={"sm"}>
                    * You can see where these funds are being used & if you have
                    contributed you can also approve those Withdrawal Requests
                    :)
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </main>
    </div>
  );
}
