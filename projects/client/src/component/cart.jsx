import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const Cart = () => {
  return (
    <Box bg={"red.400"} width={"20vw"} ml={"20px"}>
      <Stack alignItems={"center"}>
        <Box>
          <Text> ini keranjang</Text>
        </Box>
        <Box mt={"70vh"}>
          <Button px={"100px"}>Bayar</Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default Cart;
