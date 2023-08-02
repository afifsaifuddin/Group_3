import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export const CartItem = ({ produk }) => {
  return (
    <Box>
      <Tr>
        <Td minW={"160px"} fontWeight={"bold"}>
          {/* <Image
          loading="lazy"
          objectFit="cover"
          maxW={{ base: "100%", sm: "80px" }}
          src={
            produk
              ? "http://localhost:8000/" + produk.productImg.replace(/\\/g, "/")
              : ""
          }
        /> */}
          {produk.name}
        </Td>
        <Td minW={"20px"} maxH={"20px"}>
          {produk.quantity}
        </Td>
        <Td fontWeight={"bold"}> {produk.harga_produk},-</Td>
      </Tr>
    </Box>
  );
};

export default CartItem;
