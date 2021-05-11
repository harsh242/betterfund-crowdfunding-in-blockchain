import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
  Spacer,
  Table,
  Thead,
  Tbody,
  Tooltip,
  Tr,
  Th,
  Td,
  TableCaption,
  Skeleton,
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, QuestionIcon, InfoIcon } from "@chakra-ui/icons";
import web3 from "../../../../smart-contract/web3";
import Campaign from "../../../../smart-contract/campaign";
import factory from "../../../../smart-contract/factory";

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
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      campaignId,
      requestCount,
      approversCount,
      balance: summary[1],
      name: summary[5],
    },
  };
}

const RequestRow = ({ id, request, approversCount, campaignId, disabled }) => {
  const router = useRouter();
  const readyToFinalize = request.approvalCount > approversCount / 2;
  const onApprove = async () => {
    const campaign = Campaign(campaignId);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
    router.push(`/campaign/${campaignId}/requests`);
  };

  const onFinalize = async () => {
    const campaign = Campaign(campaignId);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
    router.push(`/campaign/${campaignId}/requests`);
  };

  return (
    <Tr
      bg={
        readyToFinalize && !request.complete
          ? useColorModeValue("teal.100", "teal.700")
          : useColorModeValue("gray.100", "gray.700")
      }
      opacity={request.complete ? "0.4" : "1"}
    >
      <Td>{id} </Td>
      <Td>{request.description}</Td>
      <Td isNumeric>{web3.utils.fromWei(request.value, "ether")}</Td>
      <Td>{request.recipient.substr(0, 10) + "..."}</Td>
      <Td>
        {request.approvalCount}/{approversCount}
      </Td>
      <Td>
        {" "}
        {request.complete ? null : (
          <Button
            colorScheme="yellow"
            variant="outline"
            _hover={{
              bg: "yellow.600",
              color: "white",
            }}
            onClick={onApprove}
            isDisabled={!disabled}
          >
            Approve
          </Button>
        )}
      </Td>
      <Td>
        {request.complete ? (
          <Tooltip
            label="This Request has been finalized & withdrawn"
            bg={useColorModeValue("white", "gray.700")}
            placement={"top"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"1.2em"}
          >
            <QuestionIcon />
          </Tooltip>
        ) : (
          <HStack spacing={2}>
            <Button
              colorScheme="green"
              variant="outline"
              _hover={{
                bg: "green.600",
                color: "white",
              }}
              isDisabled={!disabled}
              onClick={onFinalize}
            >
              Finalize
            </Button>
            {readyToFinalize && !request.complete ? (
              <Tooltip
                label="This Request is ready to be Finalized because it has been approved by 50% Approvers"
                bg={useColorModeValue("white", "gray.700")}
                placement={"top"}
                color={useColorModeValue("gray.800", "white")}
                fontSize={"1.2em"}
              >
                <InfoIcon color={useColorModeValue("teal.800", "white")} />
              </Tooltip>
            ) : null}
          </HStack>
        )}
      </Td>
    </Tr>
  );
};

export default function Requests({
  campaignId,
  requestCount,
  approversCount,
  balance,
  name,
}) {
  const [requestsList, setRequestsList] = useState([]);
  const [isFundAvailable, setIsFundAvailable] = useState(false);
  const campaign = Campaign(campaignId);
  async function getRequests() {
    try {
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );

      console.log("requests", requests);
      setRequestsList(requests);

      return requests;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (balance === 0) {
      setIsFundAvailable(true);
    }
    getRequests();
  }, []);
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
          <Box p="2">
            <Text fontSize={"lg"} color={"teal.400"}>
              <ArrowBackIcon />
              <NextLink href={`/campaign/${campaignId}`}>
                Back to Campaign
              </NextLink>
            </Text>
          </Box>
          {setIsFundAvailable ? (
            <Alert status="error" my={4}>
              <AlertIcon />
              <AlertDescription mr={2}>
                The Current Balance of the Campaign is 0, Please Contribute to
                approve and finalize Requests.
              </AlertDescription>
            </Alert>
          ) : null}
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box p="2">
              <Heading
                textAlign={useBreakpointValue({ base: "left" })}
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
                as="h3"
                isTruncated
              >
                Withdrawal Requests for {name} Campaign
              </Heading>
            </Box>
            <Spacer />
            <Box p="2">
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
                <NextLink href={`/campaign/${campaignId}/requests/new`}>
                  Add Withdrawal Request
                </NextLink>
              </Button>
            </Box>
          </Flex>{" "}
        </Container>
        {requestsList.length > 0 ? (
          <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
            <Divider />
            <Box overflowX="auto">
              <Table>
                <TableCaption textAlign="left">
                  Found {requestCount} Requests
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th w="30%">Description</Th>
                    <Th isNumeric>Amount</Th>
                    <Th maxW="12%" isTruncated>
                      Recipient Wallet Address
                    </Th>
                    <Th>Approval Count </Th>
                    <Th>Approve </Th>
                    <Th>Finalize </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {requestsList.map((request, index) => {
                    return (
                      <RequestRow
                        key={index}
                        id={index}
                        request={request}
                        approversCount={approversCount}
                        campaignId={campaignId}
                        disabled={isFundAvailable}
                      />
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Container>
        ) : (
          <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
            <SimpleGrid rows={{ base: 3 }} spacing={2}>
              <Skeleton height="2rem" />
              <Skeleton height="5rem" />
              <Skeleton height="5rem" />
            </SimpleGrid>
          </Container>
        )}
      </main>
    </div>
  );
}
