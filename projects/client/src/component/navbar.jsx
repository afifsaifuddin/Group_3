import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./searchbar";
export const Navbar = () => {
  return (
<<<<<<< Updated upstream
    <Box bgColor={"red"}>
      <Flex justifyContent={"space-between"} p={3}>
        <Text>Logo Magfirah Cell</Text>
=======
    <Box bgColor={"red.400"}>
      <Flex justifyContent={"space-between"} p={3}>
        <Text fontWeight={"bold"} fontSize={"2xl"} mt={"10px"}>
          Logo Magfirah Cell
        </Text>
>>>>>>> Stashed changes
        <Searchbar />
      </Flex>
    </Box>
  );
};
