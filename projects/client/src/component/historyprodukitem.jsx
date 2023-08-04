import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Historyprodukitem = ({ produk }) => {
  console.log(1);
  return (
    <Flex mb={"10px"}>
      <Text w={"10vw"}>{produk.Product.name || " "}</Text>
      <Text w={"10vw"}>{produk.quantity || " "}</Text>
      <Text w={"10vw"}>{produk.price || " "}</Text>
      <Text w={"10vw"}>{produk.price * produk.quantity || " "}</Text>
    </Flex>
  );
};

export default Historyprodukitem;
