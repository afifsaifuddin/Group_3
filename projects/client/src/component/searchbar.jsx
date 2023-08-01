import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

export const Searchbar = () => {
  return (
    <Box>
      <Flex w={"100%"} mt={"10px"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BiSearchAlt color="gray.300" />
          </InputLeftElement>
          <Input type="search" placeholder="Cari..." />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default Searchbar;
