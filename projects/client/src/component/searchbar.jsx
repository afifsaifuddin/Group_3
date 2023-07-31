import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

export const Searchbar = () => {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BiSearchAlt color="gray.300" />
        </InputLeftElement>
        <Input type="search" placeholder="Cari..." />
      </InputGroup>
    </Box>
  );
};

export default Searchbar;
