import { Box, Button, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { decrementQuantity, deleteItem, incrementQuantity } from "../redux/reducer/produkreducer";
import { useDispatch } from "react-redux";
import { BsJustify } from "react-icons/bs";

export const CartItem = ({ produk }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(deleteItem(produk.id));
  };
  const handleIncrement = () => {
    dispatch(incrementQuantity(produk.id));
  };

  console.log(produk);
  const handleDecrement = () => {
    dispatch(decrementQuantity(produk.id));
  };
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
                  ? "http://localhost:8000/" +
                    produk.productImg.replace(/\\/g, "/")
                  : ""
              }
            /> */}
          {produk.name}
        </Td>
        <Td minW={"20px"} maxH={"20px"}>
          <Flex align={"center"}>
            <Button onClick={handleIncrement}>+</Button>
            {produk.quantity}
            <Button onClick={handleDecrement}>-</Button>
          </Flex>
        </Td>
        <Td fontWeight={"bold"}> {produk.harga_produk},-</Td>
        <Td>
          <Button onClick={handleRemoveItem}>
            <MdDeleteOutline />
          </Button>
        </Td>
      </Tr>
    </Box>
  );
};

export default CartItem;
