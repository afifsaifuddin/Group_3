import { Box, Button, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
  console.log(transaction);
  return (
    <Box mt={"10px"} ml={"20px"}>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Heading>Cashier App - Transaction History</Heading>
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Kasir</Th>
            <Th>Harga</Th>
            <Th>Tanggal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction &&
            transaction.map((item) => (
              <Historyproduk />
              // <Tr key={item.id}>
              //   <Td>{item.User.username}</Td>
              //   <Td>{item.totalPrice}</Td>
              //   <Td>{item.createdAt}</Td>
              // </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default History;
