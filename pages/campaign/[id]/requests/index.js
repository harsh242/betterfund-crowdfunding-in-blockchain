import React, { useState, useEffect } from "react";
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
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

  return {
    props: {
      campaignId,
      requestCount,
      approversCount,
    },
  };
}

const RequestRow = ({ id, request, approversCount }) => {
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{request.description}</Td>
      <Td isNumeric>{web3.utils.fromWei(request.value, "ether")}</Td>
      <Td>{request.recipient.substr(0, 10) + "..."}</Td>
      <Td>
        {request.approvalCount}/{approversCount}
      </Td>
      <Td>
        {" "}
        <Button
          colorScheme="yellow"
          variant="outline"
          _hover={{
            bg: "yellow.600",
            color: "white",
          }}
        >
          <NextLink href="/campaign/requests/new">Approve</NextLink>
        </Button>
      </Td>
      <Td>
        {" "}
        <Button
          colorScheme="green"
          variant="outline"
          _hover={{
            bg: "green.600",
            color: "white",
          }}
        >
          <NextLink href="/campaign/requests/new">Finalize</NextLink>
        </Button>
      </Td>
    </Tr>
  );
};

export default function Requests({
  campaignId,
  campaign,
  requestCount,
  approversCount,
}) {
  const [requestsList, setRequestsList] = useState([]);

  async function getRequests() {
    try {
      const campaign = Campaign(campaignId);
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
                <NextLink href={`/campaign/${campaignId}/requests/new`}>
                  Add Withdrawal Request
                </NextLink>
              </Button>
            </Box>
          </Flex>{" "}
        </Container>
        <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          <Divider />
          <Box overflowX="auto">
            <Table variant="striped">
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
                    />
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Container>
      </main>
    </div>
  );
}
