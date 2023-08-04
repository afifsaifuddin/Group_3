import { Box, Button, Center, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../redux/reducer/produkreducer";
import Historyproduk from "./historyproduk";

export const History = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransaction());
  }, []);

  const transaction = useSelector((state) => state.produkreducer.transaction);

  return (
    <Box mt={"10px"} ml={"20px"}>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Heading>Cashier App - Transaction History</Heading>
      </Box>
      <Table>
        <Tbody>{transaction && transaction.map((item) => <Historyproduk key={item.id} item={item} />)}</Tbody>
      </Table>
    </Box>
  );
};
export default History;
