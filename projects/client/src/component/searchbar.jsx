import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getProduk } from "../redux/reducer/produkreducer";

export const Searchbar = () => {
  const dispatch = useDispatch();
  const handleSearch = () => {
    const name = document.getElementById("search").value;
    console.log(name);
    dispatch(getProduk({ name }));
  };
  return (
    <Box>
      <InputGroup bg={"white"}>
        <InputLeftElement pointerEvents="none">
          <BiSearchAlt color="gray.300" />
        </InputLeftElement>
        <Input
          id="search"
          onChange={handleSearch}
          focusBorderColor="#FC2947"
          type="search"
          placeholder="Cari..."
        />
      </InputGroup>
    </Box>
  );
};

export default Searchbar;
