import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { getTransactionAdmin } from "../redux/reducer/produkreducer";

const AdminLaporanChart = () => {
  const chartContainer = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const transaksi = useSelector((state) => state.produkreducer.transaction);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handlesubmit = () => {
    const startDateParam = startDate ? startDate.toISOString() : "";
    endDate.setHours(23, 59, 59, 999);
    const endDateParam = endDate ? endDate.toISOString() : "";
    dispatch(getTransactionAdmin({ startDateParam, endDateParam }));
    setLabels(transaksi.map((item) => item.createdAt));
    setData(transaksi.map((item) => item.totalPrice));
  };

  useEffect(() => {
    const startDateParam = startDate ? startDate.toISOString() : "";
    endDate.setHours(23, 59, 59, 999);
    const endDateParam = endDate ? endDate.toISOString() : "";
    dispatch(getTransactionAdmin({ startDateParam, endDateParam }));
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Transaksi",
              data,
              borderWidth: 2,
            },
          ],
        },
      });

      return () => newChartInstance.destroy();
    }
  }, [chartContainer, transaksi]);

  return (
    <Box>
      <Box border={"1px"} p={"10px"} mb={"10px"} boxSize={"2xl"}>
        <canvas ref={chartContainer} />
        <Flex mt={"10px"} mx={"auto"} justifyContent={"center"}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          <Button onClick={handlesubmit}>Search</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminLaporanChart;
