import {
  Box,
  Button,
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
import { MdDeleteOutline } from "react-icons/md";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
} from "../redux/reducer/produkreducer";
import { useDispatch } from "react-redux";

export const CartItem = ({ produk }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(deleteItem(produk.id));
  };
  const handleIncrement = () => {
    dispatch(incrementQuantity(produk.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(produk.id));
  };
  console.log(produk);
  return (
    <Box>
      <Tr>
        <Td minW={"160px"} fontWeight={"bold"}>
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
