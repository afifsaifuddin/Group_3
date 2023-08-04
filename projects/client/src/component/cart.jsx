import { Box, Button, Stack, Table, Tbody, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import Pembayaran from "./pembayaran";

export const Cart = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cart = useSelector((state) => state.produkreducer.cart);
  const totalharga = useSelector((state) => state.produkreducer.totalharga);
  return (
    <Box bgColor={"#FC2947"} borderRadius={"8px"} width={"20vw"} mx={5}>
      {/* <Stack alignItems={"center"}> */}
      <Text fontWeight={"bold"} fontSize={"2xl"} align={"center"}>
        Keranjang
      </Text>
      <Box>
        <Table variant={""}>
          <Tbody>
            {cart.map((item) => (
              <CartItem key={item.id} produk={item} />
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box mt={"70vh"} pb={3} align="center">
        <Text fontWeight={"bold"} fontSize={"xl"} mb={3}>
          Total Harga: Rp. {totalharga}
        </Text>
        <Button
          bgColor={"white"}
          px={"100px"}
          onClick={() => {
            onOpen();
          }}>
          Bayar
        </Button>
      </Box>
      {/* </Stack> */}
      <Pembayaran isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Box>
  );
};
export default Cart;
