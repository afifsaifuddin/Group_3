import { Box, Button, Center, Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminLaporanChart from "./adminLaporanChart";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionAdmin } from "../redux/reducer/produkreducer";
import DatePicker from "react-datepicker";
import { getTransactionItem } from "../redux/reducer/transactionreducer";
import AdminLaporanPenjualan from "./adminLaporanPenjualan";

const AdminLaporan = () => {
  const transactionGraph = useSelector((state) => state.produkreducer.transactionGraph);
  const transactionItem = useSelector((state) => state.transactionreducer.transactionItem);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    async function fetchTransactions() {
      try {
        dispatch(getTransactionAdmin({ formattedStartDate, formattedEndDate }));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    async function fetchTransactionItems() {
      try {
        dispatch(getTransactionItem({ formattedStartDate, formattedEndDate }));
      } catch (error) {
        console.error("Error fetching transaction items:", error);
      }
    }

    fetchTransactions();
    fetchTransactionItems();
  }, [startDate, endDate]);

  return (
    <Box>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Center height={"40vh"}>
          <AdminLaporanChart transactionGraph={transactionGraph} />
        </Center>
        <Flex justify="center" mt={4}>
          <Box mr={4} p={2} borderRadius={"full"} outline={"1px solid red"}>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </Box>
          <Box ml={4} p={2} borderRadius={"full"} outline={"1px solid red"}>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </Box>
        </Flex>
        <AdminLaporanPenjualan transactionItem={transactionItem} />
      </Box>
    </Box>
  );
};

export default AdminLaporan;
