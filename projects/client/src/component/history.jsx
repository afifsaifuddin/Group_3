import { Box, Button, Center, Flex, Heading, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../redux/reducer/produkreducer";
import Historyproduk from "./historyproduk";
import { Pagination } from "./pagination";

export const History = () => {
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("DESC");
  function buttonSort() {
    setOrder("ASC" ? "DESC" : "ASC");
  }
  useEffect(() => {
    dispatch(getTransaction({ index, order }));
  }, [index, order]);

  const { page } = useSelector((state) => state.produkreducer);
  const transaction = useSelector((state) => state.produkreducer.transaction);

  return (
    <Box mt={"10px"} ml={"20px"}>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Heading>Cashier App - Transaction History</Heading>
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Flex justifyContent={"space-around"}>
                Transaksi Terbaru
                <Button onClick={buttonSort}>Sort ASC - DESC</Button>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>{transaction && transaction.map((item) => <Historyproduk key={item.id} item={item} />)}</Tr>
        </Tbody>
        <Tfoot>
          <Pagination page={page} index={index} setIndex={setIndex} />
        </Tfoot>
      </Table>
    </Box>
  );
};
export default History;
