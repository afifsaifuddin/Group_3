import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../component/navbar";
import Sidebar from "../component/sidebar";

export const Home = () => {
  return (
    <Box>
      <Navbar />

      <Sidebar />
    </Box>
  );
};

export default Home;
