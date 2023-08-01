import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";

export const Cart = () => {
  const cart = useSelector((state) => state.produkreducer.cart);

  return (
    <Box bgColor={"red.400"} mx={10} borderRadius={"8px"}>
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
        <Box mt={"70vh"}>
          <Button px={"100px"}>Bayar</Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default Cart;
