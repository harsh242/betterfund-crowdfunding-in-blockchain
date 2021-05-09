import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import NextLink from "next/link";

import web3 from "../../smart-contract/web3";
import Campaign from "../../smart-contract/campaign";

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
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
  name,
  description,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [campaignData, setCampaignData] = useState([]);

  async function getSummary() {
    try {
      const campaign = Campaign(id);
      const summary = await campaign.methods.getSummary().call();

      console.log("summary ", summary);

      setCampaignData(summary);
      return summary;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSummary();
  }, []);
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
                {campaignData[5]}
              </Heading>
              <Text
                color={useColorModeValue("gray.500", "gray.200")}
                fontSize={{ base: "lg" }}
              >
                {campaignData[6]}
              </Text>
              <Box mx={"auto"} w={"full"}>
                <SimpleGrid columns={{ base: 1 }} spacing={{ base: 5 }}>
                  <StatsCard
                    title={"Minimum Contribution in Wei"}
                    stat={campaignData[0]}
                    info={
                      "You must contribute at least this much in Wei ( 1 ETH = 10 ^ 18 Wei) to become an approver"
                    }
                  />
                  <StatsCard
                    title={"Wallet Address of Campaign Creator"}
                    stat={campaignData[4]}
                    info={
                      "The Campaign Creator created the campaign and can create requests to withdraw money."
                    }
                  />
                  <StatsCard
                    title={"Number of Requests"}
                    stat={campaignData[2]}
                    info={
                      "A request tries to withdraw money from the contract. Requests must be approved by approvers"
                    }
                  />
                  <StatsCard
                    title={"Number of Approvers"}
                    stat={campaignData[3]}
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
                  {campaignData[1] > 0
                    ? web3.utils.fromWei(campaignData[1], "ether")
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
                <Box as={"form"} mt={10}>
                  <Stack spacing={4}>
                    <FormControl id="min-contri">
                      <FormLabel>
                        Amount in Ether you want to contribute
                      </FormLabel>
                      <InputGroup>
                        {" "}
                        <Input type="number" />{" "}
                        <InputRightAddon children="ETH" />
                      </InputGroup>
                    </FormControl>
                  </Stack>
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
                  >
                    Contribute
                  </Button>
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
                    <NextLink href={`/campaigns/${address}/requests`}>
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
