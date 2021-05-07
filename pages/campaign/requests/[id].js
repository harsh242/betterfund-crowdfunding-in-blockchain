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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

export default function Requests() {
  const str = "0x5d7676dB6119Ed1F6C696419058310D16a734dA9";
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
        <Container px={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
          <Divider />
          <Box overflowX="auto">
            <Table variant="striped">
              <TableCaption textAlign="left">Found 3 Requests</TableCaption>
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
                <Tr>
                  <Td>0</Td>
                  <Td>For Oxygen Supply in Delhi</Td>
                  <Td isNumeric>25.4 ETH</Td>
                  <Td>{str.substr(0, 10) + "..."}</Td>
                  <Td>0/2</Td>
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
                      <NextLink href="/campaign/requests/new">
                        Finalize
                      </NextLink>
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Container>
      </main>
    </div>
  );
}
