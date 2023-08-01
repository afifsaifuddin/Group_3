import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const Cart = () => {
  return (
    <Box>
      <Stack alignItems={"center"}>
        <Box> 
          <Text> ini keranjang</Text>
        </Box>
        <Box mt={"80vh"}>
          <Button px={"100px"}>Bayar</Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default Cart;
