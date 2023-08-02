import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./searchbar";
import AvatarKasir from "./badge";
export const Navbar = () => {
  return (
    <Box bgColor={"gray.200"} borderBottom={"3px solid #FC2947"}>
      <Flex justifyContent={"space-between"} p={3}>
        <Text
          fontWeight={"bold"}
          fontSize={"2xl"}
          mt={"10px"}
          color={"#FC2947"}
        >
          Logo Magfirah Cell
        </Text>
        <Searchbar />
        <AvatarKasir />
      </Flex>
    </Box>
  );
};
