import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransaction,
  setTransaction,
  setPage,
} from "../redux/reducer/produkreducer"; // Make sure to import specific actions
import Historyproduk from "./historyproduk";
import { Pagination } from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const History = () => {
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const formattedStartDate = startDate
      ? startDate.toISOString().split("T")[0]
      : null;
    const formattedEndDate = endDate
      ? endDate.toISOString().split("T")[0]
      : null;

    dispatch(
      getTransaction({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );
  }, [index, startDate, endDate]);

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setIndex(1);
  };

  const { page } = useSelector((state) => state.produkreducer);
  const transaction = useSelector((state) => state.produkreducer.transaction);
  console.log(transaction);
  return (
    <Box mt={"10px"} ml={"20px"}>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Heading>Cashier App - Transaction History</Heading>
      </Box>
      <Table>
        <Thead>
          <Flex gap={"10px"}>
            <Text>Start Date</Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date, "start")}
              placeholderText="Select a date"
            />

            <Text>End Date</Text>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date, "end")}
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
                if (!startDate && !endDate) return true;

                const transactionDate = new Date(item.createdAt);

                if (startDate && endDate) {
                  return (
                    transactionDate >= startDate && transactionDate <= endDate
                  );
                } else if (startDate) {
                  return transactionDate >= startDate;
                } else if (endDate) {
                  return transactionDate <= endDate;
                }

                return true;
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
