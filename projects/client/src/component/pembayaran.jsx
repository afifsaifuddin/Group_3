import { Box, Button, Input, Modal, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, deleteCart, getProduk } from "../redux/reducer/produkreducer";

export const Pembayaran = ({ isOpen, onClose }) => {
  const [bayar, setBayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const totalharga = useSelector((state) => state.produkreducer.totalharga);
  const dispatch = useDispatch();
  const itemCarts = useSelector((state) => state.produkreducer.cart);
  const handlepembayaran = async () => {
    const total = bayar - totalharga;
    setKembalian(total);
    await dispatch(createTransaction(totalharga, itemCarts));
    await dispatch(getProduk({}));
    await dispatch(deleteCart());
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="10%" backdropBlur="10px" />
        <ModalContent borderRadius={"8px"} px={"100px"} pb={"50px"}>
          <ModalHeader align={"center"}>Pembayaran</ModalHeader>
          <Stack>
            <Text align={"center"} fontWeight={"bold"}>
              Rp. {totalharga}
            </Text>
            <Input
              placeholder="Jumlah Uang"
              type="number"
              onChange={(e) => setBayar(e.target.value)}
              focusBorderColor="#FC2947"
            />
            <Button bgColor={"#FC2947"} onClick={handlepembayaran}>
              Bayar
            </Button>
            <Text align={"center"} fontWeight={"bold"}>
              Kembalian: Rp. {kembalian}
            </Text>
          </Stack>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Pembayaran;
