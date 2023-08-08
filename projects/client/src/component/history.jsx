import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../redux/reducer/produkreducer";
import Historyproduk from "./historyproduk";
import { Pagination } from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const History = () => {
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(getTransaction({ index, selectedDate }));
  }, [index, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIndex(1); // Reset index when date changes to show the first page of results
  };

  const { page } = useSelector((state) => state.produkreducer);
  const transaction = useSelector((state) => state.produkreducer.transaction);

  return (
    <Box mt={"10px"} ml={"20px"}>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Heading>Cashier App - Transaction History</Heading>
      </Box>
      <Table>
        <Thead>
          <Flex gap={"10px"}>
            <Text>Set Date</Text>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
            />
          </Flex>
          <Tr>
            <Th>
              <Flex justifyContent={"space-around"}>Transaksi Terbaru</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction &&
            transaction
              .filter((item) => {
                if (!selectedDate) return true;
                const transactionDate = new Date(item.createdAt); // Use createdAt or transactionDate based on your API response
                return (
                  transactionDate.toDateString() === selectedDate.toDateString()
                );
              })
              .map((item) => <Historyproduk key={item.id} item={item} />)}
        </Tbody>
        <Tfoot>
          <Pagination page={page} index={index} setIndex={setIndex} />
        </Tfoot>
      </Table>
    </Box>
  );
};
export default History;
