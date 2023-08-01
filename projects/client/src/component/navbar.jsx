import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./searchbar";
import AvatarKasir from "./badge";
export const Navbar = () => {
  return (
    <Box bgColor={"red"}>
      <Flex
        justifyContent={"space-between"}
        p={3}
      >
        <Text>Logo Magfirah Cell</Text>
        <Searchbar />
        <AvatarKasir />
      </Flex>
    </Box>
  );
};
