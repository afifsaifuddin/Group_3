import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";

export const Cart = () => {
  const cart = useSelector((state) => state.produkreducer.cart);
  const findDuplicate = () => {};
  return (
    <Box bgColor={"#FC2947"} borderRadius={"8px"} width={"20vw"} mx={5}>
      <Stack alignItems={"center"}>
        <Box>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {" "}
            ini keranjang
          </Text>
          <Stack>
            {cart.map((item) => (
              <CartItem key={item.id} produk={item} />
            ))}
          </Stack>
        </Box>
        <Box mt={"75vh"} pb={3}>
          <Button bgColor={"white"} px={"100px"}>
            Bayar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default Cart;
