import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../component/navbar";
import Sidebar from "../component/sidebar";
import Cart from "../component/cart";
export const Home = () => {
  return (
    <Box>
      <Navbar />
      <Sidebar />
      <Cart />
    </Box>
  );
};

export default Home;
